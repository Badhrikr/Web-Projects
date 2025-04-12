import { useEffect, useState } from "react";
import { chevron_left, members_add, plus } from "../../../../helpers/icons";
import useLogin from "../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../shared/enums";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";
import Loading from "../../../../ui-components/Loading";
import * as Services from "../../services";
import { GetMembersResponse } from "../../services/model.response";
import AddMember from "./add-member";
import ExistingMemberAdd from "./existing-member-add";

function ConversationMembers({
  migrationRequestId,
  customerId,
}: {
  migrationRequestId: string;
  customerId: string;
}) {
  const { roles } = useLogin();

  const [members, setMembers] = useState<GetMembersResponse[]>([]);

  const [fetching, setFetching] = useState(true);
  const [showAddNewMember, setShowAddNewMember] = useState(false);
  const [showAddExistingMember, setShowAddExistingMember] = useState(false);

  const isCustomer = roles.includes(ApplicationRoles.CUSTOMER);
  const isSalesPerson = roles.includes(ApplicationRoles.SALES_PERSON);

  const newMemberHandler = () => {
    setShowAddNewMember(true);
    setShowAddExistingMember(false);
  };

  const addExistingMemberHandler = () => {
    setShowAddNewMember(false);
    setShowAddExistingMember(true);
  };

  const showMembersHandler = () => {
    setShowAddNewMember(false);
    setShowAddExistingMember(false);
  };

  const fetchSuccess = (response: GetMembersResponse[]) => {
    setFetching(false);
    setMembers(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  const fetchMembers = () => {
    showMembersHandler();

    Services.GetMembers({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {!showAddNewMember && !showAddExistingMember && (
        <>
          <div className="flex items-center justify-between">
            <h4 className="text-theme-secondary font-medium">Members</h4>
            <IconButton
              theme="secondary"
              size="md"
              buttonThemeStyle="ghost"
              onClick={addExistingMemberHandler}
            >
              <Icon
                icon={members_add}
                theme="secondary"
                size="md"
                iconType="outline"
              />
            </IconButton>
          </div>

          <div className="flex flex-col gap-6">
            {members.map((member) => (
              <div className="flex flex-col gap-1">
                <h4 className="text-theme-secondary text-sm font-medium">
                  {member?.firstName ?? ""} {member.lastName ?? ""}
                </h4>
                <h3 className="text-theme-secondary-500 text-sm">
                  {member?.userEmail}
                </h3>
              </div>
            ))}
          </div>
        </>
      )}

      {showAddNewMember && !showAddExistingMember && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Button
              theme="secondary"
              size="sm"
              buttonThemeStyle="ghost"
              className="!p-0"
              onClick={addExistingMemberHandler}
            >
              <Icon
                icon={chevron_left}
                theme="secondary"
                size="sm"
                iconType="outline"
              />
            </Button>
          </div>

          <h4 className="text-theme-secondary font-medium">Add New Member</h4>
          <AddMember
            migrationRequestId={migrationRequestId}
            customerId={customerId}
            onSubmit={fetchMembers}
          />
        </div>
      )}

      {!showAddNewMember && showAddExistingMember && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Button
              theme="secondary"
              size="sm"
              buttonThemeStyle="ghost"
              className="!p-0"
              onClick={showMembersHandler}
            >
              <Icon
                icon={chevron_left}
                theme="secondary"
                size="sm"
                iconType="outline"
              />
            </Button>

            {isCustomer && (
              <Button
                size="sm"
                theme="secondary"
                buttonThemeStyle="ghost"
                className="!p-0"
                onClick={newMemberHandler}
                startIcon={<Icon icon={plus} size="sm" theme="secondary" />}
              >
                <span className="text-sm">New member</span>
              </Button>
            )}
          </div>

          <h4 className="text-theme-secondary font-medium">Add user</h4>
          <div className="flex flex-col gap-4">
            <ExistingMemberAdd
              addedMembers={members}
              customerId={customerId}
              migrationRequestId={migrationRequestId}
              onMemberAdd={fetchMembers}
            />
          </div>
        </div>
      )}

      {fetching && (
        <div className="flex-center-center">
          <Loading size="md" theme="secondary" />
          <span className="text-theme-secondary text-sm">Loading</span>
        </div>
      )}
    </div>
  );
}

export default ConversationMembers;
