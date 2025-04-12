import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useMemo, useState } from "react";
import { AssignSalesPersonProps } from "./model";
import * as SharedServices from "../../../../../shared/services";
import Loading from "../../../../../ui-components/Loading";
import Input from "../../../../../ui-components/Input";
import { search, share, user } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Modal from "../../../../../ui-components/Modal";
import SalesPersonProfileCard from "../../sales-person-profile-card";
import CustomerAssignPersonConfirmation from "../customer-assign-person-confirmation";
import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";
import Icon from "../../../../../ui-components/Icon";

function CustomerAssignSalesPerson({ customerId }: AssignSalesPersonProps) {
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
      <div className="gap-1 flex-center-center">
        <Loading size="md" theme="secondary" />
        <span className="text-theme-secondary">Loading</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-theme-secondary">
          Assign Sales Person
        </h2>

        <Button
          theme="secondary"
          size="md"
          buttonThemeStyle="ghost"
          onClick={assignToMeHandler}
          startIcon={
            <Icon
              icon={user}
              theme="secondary"
              size="md"
              className="[&>svg]:!stroke-[#18a0fb]"
            />
          }
        >
          Assign to me
        </Button>
      </div>

      <div>
        <Input
          size="sm"
          theme="primary"
          placeholder="Search"
          icon={search}
          onChangeEvent={searchHandler}
        />
      </div>

      <div className="flex flex-col gap-2 max-h-[500px] overflow-auto py-2">
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
          <CustomerAssignPersonConfirmation
            {...assignedPerson}
            customerId={customerId}
            onCancel={assignPopupToggle}
            onAssign={assignPopupToggle}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CustomerAssignSalesPerson;
