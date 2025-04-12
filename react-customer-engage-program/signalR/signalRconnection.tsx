import * as signalR from "@microsoft/signalr";
import { keycloakInstance } from "../helpers/keycloak";
import * as SharedServices from "../shared/services";
import { SignalR } from "./enums";
import {
  ReceiveMessageforSpecificRole,
  ReceiveMessageforSpecificUser,
} from "./model";
import { log } from "console";

const URL = process.env.NEXT_PUBLIC_HUB_ADDRESS ?? "";

export class Connector {
  public connection: signalR.HubConnection;

  public events: (
    ReceiveMessageforSpecificRole: (
      props: ReceiveMessageforSpecificRole
    ) => void,
    ReceiveMessageforSpecificUser: (
      props: ReceiveMessageforSpecificUser
    ) => void
  ) => void;

  public removeEvents: (
    RemoveEventforSpecificRole: (props: ReceiveMessageforSpecificRole) => void,
    RemoveEventforSpecificUser: (props: ReceiveMessageforSpecificUser) => void
  ) => void;

  static instance: Connector;
  static connectionId: string | null = null;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();

    this.events = (
      ReceiveMessageforSpecificRole,
      ReceiveMessageforSpecificUser
    ) => {
      this.connection.start().then(this.fulfilled, this.rejected);

      this.connection.on(
        SignalR.MESSAGE_FOR_SPECIFIC_ROLE,
        ReceiveMessageforSpecificRole
      );

      this.connection.on(
        SignalR.MESSAGE_FOR_SPECIFIC_USER,
        ReceiveMessageforSpecificUser
      );
    };

    this.removeEvents = (
      RemoveEventforSpecificRole,
      RemoveEventforSpecificUser
    ) => {
      this.connection.off(
        SignalR.MESSAGE_FOR_SPECIFIC_ROLE,
        RemoveEventforSpecificRole
      );
      this.connection.off(
        SignalR.MESSAGE_FOR_SPECIFIC_USER,
        RemoveEventforSpecificUser
      );
    };
  }

  public fulfilled = () => {
    if (!keycloakInstance.authenticated) return;

    const { storesignalrConnectiondetails } = Connector.getInstance();
    const role =
      keycloakInstance.tokenParsed?.resource_access?.["DCEP-Application"][
        "roles"
      ][0] ?? "";
    const { email } = keycloakInstance.tokenParsed;
    storesignalrConnectiondetails(role, email);

    // SAVING USER DETAIL
    SharedServices.GetSignedUserDetail({
      success(response) {
        keycloakInstance.loggedUserDetails = response;
      },
    });
  };

  public rejected = () => {
    console.error("Error occured during connection");
  };

  public storesignalrConnectiondetails = (role: string, user: string) => {
    if (this.connection.state === "Connected") {
      this.connection
        .invoke(SignalR.ADD_CONNECTION_DETAILS, role, user, "DCEP")
        .then((connectionid) => {
          console.log(connectionid);
          Connector.connectionId = connectionid;
        });
    }
  };

  public removeUserConnection = (user: string) => {
    if (this.connection) {
      this.connection
        .send(SignalR.TO_REMOVE_CONNECTION_DETAILS, Connector.connectionId)
        .then(() => console.log("removed"));
    }
  };

  public static getInstance(): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }
    return Connector.instance;
  }
}

export default Connector.getInstance;
