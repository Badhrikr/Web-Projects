import { useState } from "react";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import { EditPersonalInformationProps } from "./model";

function EditPersonalInformation({
  onSubmit,
  onCancel,
  ...props
}: EditPersonalInformationProps) {
  const [information, setInformation] = useState(props);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInformation({
      ...information,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(information);
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="font-medium text-xl text-theme-secondary">
        Edit Personal Information
      </h3>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        <Input
          label="Last Name"
          id="lastName"
          value={information.userName}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="Email Address"
          type="email"
          id="emailAddress"
          value={information.userEmail}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="Contact Number"
          id="contactNumber"
          value={information.userContactNo}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <div className="flex justify-end ">
          <Button
            onClick={onCancel}
            size="md"
            theme="secondary"
            buttonThemeStyle="ghost"
          >
            Cancel
          </Button>

          <Button type="submit" size="md" theme="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditPersonalInformation;
