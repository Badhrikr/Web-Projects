import { useState } from "react";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import { EditDemographicsInformationProps } from "./model";

function EditDemographicsInformation({
  address,
  onSubmit,
  onCancel,
}: EditDemographicsInformationProps) {
  const [information, setInformation] = useState(address ?? {});

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
        Edit Demographics Information
      </h3>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        <Input
          label="Address Line 1"
          id="addressLine1"
          value={information?.addressLine1}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="Address Line 2"
          id="addressLine2"
          value={information?.addressLine2}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="State"
          type="email"
          id="state"
          value={information?.state}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="City"
          id="city"
          value={information?.city}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="Zipcode"
          id="zipCode"
          value={information?.zipCode}
          size="md"
          theme="secondary"
          required
          onChangeEvent={changeHandler}
        />

        <Input
          label="Country"
          id="country"
          value={information?.country}
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

export default EditDemographicsInformation;
