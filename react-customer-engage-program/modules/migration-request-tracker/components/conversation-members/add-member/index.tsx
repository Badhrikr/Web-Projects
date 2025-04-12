import { useState } from "react";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { CreateMembersRequest } from "../../../services/model.request";
import { AddMemberProps } from "./model";

function AddMember({
  migrationRequestId,
  customerId,
  onSubmit,
}: AddMemberProps) {
  const [creating, setCreating] = useState(false);
  const [userData, setUserData] = useState<CreateMembersRequest>({
    firstname: "",
    lastname: "",
    useremail: "",
    customerid: "",
    userrole: "",
    engagementid: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const createSuccess = () => {
    setTimeout(() => {
      setCreating(false);
      onSubmit?.(userData);
    }, 2000);
  };

  const createError = () => {
    setCreating(false);
  };

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    Services.CreateMembers({
      ...userData,
      customerid: customerId,
      engagementid: migrationRequestId,
      success: createSuccess,
      error: createError,
    });
  };

  return (
    <form onSubmit={createHandler} className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <Input
          id="firstname"
          label="First Name"
          size="md"
          inputStyle="bottom-lined"
          theme="secondary"
          required
          onChangeEvent={inputHandler}
        />

        <Input
          id="lastname"
          label="Last Name"
          size="md"
          inputStyle="bottom-lined"
          theme="secondary"
          required
          onChangeEvent={inputHandler}
        />

        <Input
          id="useremail"
          label="Email Address"
          size="md"
          inputStyle="bottom-lined"
          theme="secondary"
          required
          onChangeEvent={inputHandler}
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          size="md"
          theme="secondary"
          className="flex-1"
          color="elevate"
          disabled={creating}
        >
          {creating ? (
            <div className="flex-center-center">
              <Loading size="sm" theme="secondary" />
              <span>Creating User</span>
            </div>
          ) : (
            <span className="text-sm">Send Invite</span>
          )}
        </Button>
      </div>
    </form>
  );
}

export default AddMember;
