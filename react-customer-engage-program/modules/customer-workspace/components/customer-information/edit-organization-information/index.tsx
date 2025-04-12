import { useState, useEffect, useMemo } from "react";
import { GetAllBusinessDomainsResponse } from "../../../../../shared/services/model.response";
import Button from "../../../../../ui-components/Button";
import Dropdown from "../../../../../ui-components/Dropdown";
import Input from "../../../../../ui-components/Input";
import { EditOrganizationInformationProps } from "./model";
import * as SharedServices from "../../../../../shared/services";
import { DropdownOptions } from "../../../../../ui-components/DropdownOption/model";

function EditOrganizationInformation({
  onSubmit,
  onCancel,
  ...props
}: EditOrganizationInformationProps) {
  const [information, setInformation] = useState(props);

  const [businessDomains, setBusinessDomains] = useState<
    GetAllBusinessDomainsResponse[]
  >([]);
  const [fetching, setFetching] = useState(true);

  const businessDomainOptions: DropdownOptions[] = useMemo(
    () =>
      businessDomains.map(({ domainName, domainId }) => ({
        label: domainName,
        value: domainId,
      })),
    [businessDomains]
  );

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

  const fetchSuccess = (response: GetAllBusinessDomainsResponse[]) => {
    setFetching(false);
    setBusinessDomains(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    SharedServices.GetAllBusinessDomains({
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-xl font-medium text-theme-secondary">
        Edit Organization Information
      </h3>
      <form onSubmit={submitHandler} className="flex flex-col gap-7">
        <Dropdown
          options={businessDomainOptions}
          value={information?.bussinessDomain}
          label="Business Domain"
          size="md"
          theme="primary"
        />

        <Input
          label="Organization Name"
          id="firstName"
          value={information?.customerName}
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

export default EditOrganizationInformation;
