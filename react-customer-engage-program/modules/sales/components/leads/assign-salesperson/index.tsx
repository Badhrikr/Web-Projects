import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useMemo, useState } from "react";
import { search } from "../../../../../helpers/icons";
import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import Modal from "../../../../../ui-components/Modal";
import * as SharedServices from "../../../../../shared/services";
import SalesPersonProfileCard from "../../sales-person-profile-card";
import AssignPersonConfirmation from "../assign-person-confirmation";
import { AssignSalesPersonProps } from "./model";

function AssignSalesPerson({ leadId }: AssignSalesPersonProps) {
  const [fetching, setFetching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [assignedPerson, setAssignedPerson] =
    useState<GetSalesPersonsResponse>();
  const [salesPersons, setSalesPersons] = useState<
    Array<GetSalesPersonsResponse>
  >([]);
  const { keycloak, initialized } = useKeycloak();

  const filteredSalesPersons = useMemo(() => {
    return salesPersons.filter(
      ({ firstName, lastName, email }) =>
        email !== keycloak.tokenParsed?.email &&
        (new RegExp(searchText, "gi").test(firstName) ||
          new RegExp(searchText, "gi").test(lastName) ||
          new RegExp(searchText, "gi").test(email))
    );
  }, [salesPersons, searchText]);

  const salesPersonFetchSuccess = (
    response: Array<GetSalesPersonsResponse>
  ) => {
    setFetching(false);
    setSalesPersons(response);
  };

  const salesPersonFetchError = () => {
    setFetching(false);
  };

  const assignToMeHandler = () => {
    const [firstName, lastName] = keycloak.tokenParsed?.name.split(" ");
    const email = keycloak.tokenParsed?.email;

    setAssignedPerson({ firstName, lastName, email });
    setShowAssignPopup(true);
  };

  const assignToOthersHandler = (salesPerson: GetSalesPersonsResponse) => {
    setAssignedPerson(salesPerson);
    setShowAssignPopup(true);
  };

  const searchHandler = ({ target }: React.FormEvent<HTMLInputElement>) => {
    setSearchText((target as HTMLInputElement).value);
  };

  const assignPopupToggle = () => {
    setShowAssignPopup((prev) => !prev);
  };

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setFetching(true);

      SharedServices.GetSalesPersons({
        success: salesPersonFetchSuccess,
        error: salesPersonFetchError,
      });
    }
  }, [initialized, keycloak]);

  if (fetching) {
    return (
      <div className="flex-center-center gap-1">
        <Loading size="md" theme="secondary" />
        <span className="text-theme-secondary">Loading</span>
      </div>
    );
  }

  return (
    <div className="p-1 flex flex-col gap-6">
      <div>
        <Input
          size="sm"
          theme="primary"
          placeholder="Search"
          icon={search}
          onChangeEvent={searchHandler}
        />
      </div>

      <div className="flex justify-end">
        <Button size="md" theme="primary" onClick={assignToMeHandler}>
          Assign to me
        </Button>
      </div>

      <div className="flex flex-col gap-4 max-h-[500px] overflow-auto py-2">
        {filteredSalesPersons.map((salesPerson, key) => (
          <SalesPersonProfileCard
            key={key}
            onPersonSelect={assignToOthersHandler}
            {...salesPerson}
          />
        ))}
      </div>

      <Modal
        isOpen={showAssignPopup}
        close={assignPopupToggle}
        closeOnOverlay
        closeOnEsc
      >
        <div className="pt-10">
          <AssignPersonConfirmation
            {...assignedPerson}
            leadId={leadId}
            onCancel={assignPopupToggle}
            onAssign={assignPopupToggle}
          />
        </div>
      </Modal>
    </div>
  );
}

export default AssignSalesPerson;
