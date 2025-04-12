import { useEffect, useMemo, useState } from "react";
import { search } from "../../../../../helpers/icons";
import useImplicitSearch from "../../../../../hooks/use-implicit-search";
import useLogin from "../../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../../shared/enums";
import * as SharedServices from "../../../../../shared/services";
import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";
import Input from "../../../../../ui-components/Input";
import * as Services from "../../../services";
import { GetCustomerUsersResponse } from "../../../services/model.response";
import MemberComponent from "../member-component";
import { ExistingMemberAddProps } from "./model";

function ExistingMemberAdd({
  migrationRequestId,
  customerId,
  addedMembers,
  onMemberAdd,
}: ExistingMemberAddProps) {
  const { roles, authenticated } = useLogin();

  const isCustomer = roles.includes(ApplicationRoles.CUSTOMER);
  const isSalesPerson = roles.includes(ApplicationRoles.SALES_PERSON);

  const [fetching, setFetching] = useState(true);
  const [members, setMembers] = useState<
    {
      firstname: string;
      lastname: string;
      useremail: string;
      userId?: string;
    }[]
  >([]);

  const filteredMembers = useMemo(() => {
    const addedUserEmails = addedMembers.map(
      (addedMember) => addedMember.userEmail
    );

    return members.filter(
      (_member) => !addedUserEmails.includes(_member.useremail)
    );
  }, [members, addedMembers]);

  const [filteredResults, onChange] = useImplicitSearch(filteredMembers);

  const salesPersonFetchSuccess = (response: GetSalesPersonsResponse[]) => {
    setFetching(false);
    setMembers(
      response.map((salesPerson) => ({
        firstname: salesPerson.firstName,
        lastname: salesPerson.lastName,
        useremail: salesPerson.email,
      }))
    );
  };

  const salesPersonFetchError = () => {
    setFetching(false);
  };

  const getSalesPerson = () => {
    setFetching(true);

    SharedServices.GetSalesPersons({
      success: salesPersonFetchSuccess,
      error: salesPersonFetchError,
    });
  };

  const customerUsersFetchSuccess = (response: GetCustomerUsersResponse[]) => {
    if (!(response instanceof Array)) return;

    setFetching(false);
    setMembers(
      response.map((customerUser) => ({
        firstname: customerUser.firstName,
        lastname: customerUser.lastName,
        useremail: customerUser.userEmail,
        userId: customerUser.userId,
      }))
    );
  };

  const customerUsersFetchError = () => {
    setFetching(false);
  };

  const getCustomerUsers = () => {
    setFetching(true);

    Services.GetCustomerUsers({
      migrationRequestId,
      customerId,
      success: customerUsersFetchSuccess,
      error: customerUsersFetchError,
    });
  };

  useEffect(() => {
    if (!authenticated) return;

    if (isCustomer) {
      getCustomerUsers();
    }
    if (isSalesPerson) {
      getSalesPerson();
    }
  }, [authenticated]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Input
          size="sm"
          theme="secondary"
          label=""
          placeholder="Search"
          icon={search}
          onChangeEvent={onChange}
        />
      </div>

      <div className="flex flex-col gap-4 px-1">
        {filteredResults.map((member) => (
          <MemberComponent
            migrationRequestId={migrationRequestId}
            {...member}
            onMemberAdd={onMemberAdd}
          />
        ))}
      </div>
    </div>
  );
}

export default ExistingMemberAdd;
