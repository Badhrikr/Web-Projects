import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useMemo, useState } from "react";
import * as SharedServices from "../../../../shared/services";
import Input from "../../../../ui-components/Input";
import { search, tick } from "../../../../helpers/icons";
import SalesPersonProfileCard from "../sales-person-profile-card";
import Icon from "../../../../ui-components/Icon";
import { AssignPreSalesPersonProps } from "./model";
import Loading from "../../../../ui-components/Loading";
import Button from "../../../../ui-components/Button";
import { GetSalesPersonsResponse } from "../../../../shared/services/model.response";

function AssignPreSalesPerson({
  onSubmit,
  onCancel,
  loading,
}: AssignPreSalesPersonProps) {
  const [salesPersons, setSalesPersons] = useState<GetSalesPersonsResponse[]>(
    []
  );
  const [fetching, setFetching] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedSalesPerson, setSelectedSalesPerson] =
    useState<GetSalesPersonsResponse>();

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

  const searchHandler = ({ target }: React.FormEvent<HTMLInputElement>) => {
    setSearchText((target as HTMLInputElement).value);
  };

  const submitHandler = () => {
    if (selectedSalesPerson) {
      onSubmit?.(selectedSalesPerson);
    }
  };

  const selectHandler = (salesPerson: GetSalesPersonsResponse) => {
    setSelectedSalesPerson(salesPerson);
  };

  const salesPersonFetchSuccess = (response: GetSalesPersonsResponse[]) => {
    setFetching(false);
    setSalesPersons(response);
  };

  const salesPersonFetchError = () => {
    setFetching(false);
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

  return (
    <div className="flex flex-col gap-4 h-full">
      <br />
      <h3 className="font-secondary font-semibold text-xl text-theme-secondary">
        Assign Presales Person
      </h3>

      <Input
        size="sm"
        theme="primary"
        placeholder="Search"
        icon={search}
        onChangeEvent={searchHandler}
      />

      <div className="flex flex-col gap-4 min-h-[300px] max-h-[300px] overflow-auto py-2">
        {fetching && (
          <div className="flex-center-center">
            <Loading theme="secondary" size="xl" />
            <span className="text-theme-secondary h-full">Loading</span>
          </div>
        )}

        {!fetching &&
          filteredSalesPersons.map((salesPerson, key) => (
            <div
              className={`px-4 py-2 cursor-pointer rounded-lg flex gap-2 bg-theme-background-popup justify-between items-center border-2 ${
                salesPerson.email === selectedSalesPerson?.email
                  ? "border-theme-secondary sticky top-0"
                  : "border-transparent"
              }`}
              onClick={() => selectHandler(salesPerson)}
            >
              <SalesPersonProfileCard key={key} {...salesPerson} />
              {salesPerson.email === selectedSalesPerson?.email && (
                <Icon icon={tick} theme="secondary" size="md" />
              )}
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-end gap-2 items-center">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="md"
          theme="primary"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loading size="sm" theme="secondary" />
              <span>Please wait</span>
            </div>
          ) : (
            "Yes, Proceed"
          )}
        </Button>
      </div>
    </div>
  );
}

export default AssignPreSalesPerson;
