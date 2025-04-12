import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import sleep from "../../../../../helpers/sleep";
import Button from "../../../../../ui-components/Button";
import ImageUploader from "../../../../../ui-components/ImageUploader";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { ViewAllDetailsProps } from "./model";
import * as SharedServices from "../../../../../shared/services";
import { GetAllBusinessDomainsResponse } from "../../../../../shared/services/model.response";
import { DropdownOptions } from "../../../../../ui-components/DropdownOption/model";
import Dropdown from "../../../../../ui-components/Dropdown";

function ViewAllLeadDetails(props: ViewAllDetailsProps) {
  const {
    id,
    personalInfo,
    requestDetails,
    organisationLogo,
    address,
    bussinessDomain,
  } = props;

  const [domains, setDomains] = useState<Array<GetAllBusinessDomainsResponse>>(
    []
  );
  const [updating, setUpdating] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    ...personalInfo,
    ...address,
    organisationLogo,
    bussinessDomain,
    comments: requestDetails,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const domainsOptions: Array<DropdownOptions> = useMemo(() => {
    return domains.map(({ domainName, domainId }) => ({
      label: domainName,
      value: domainId,
    }));
  }, [domains]);

  const editToggle = () => {
    setEdit((prev) => !prev);
  };

  const inputChangeHandler = ({ target }: React.ChangeEvent) => {
    if (!target) return;

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [(target as HTMLInputElement)?.id]: (target as HTMLInputElement).value,
      };
    });
  };

  const domainChangeHandler = (value: string, id: string) => {
    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [id]: value,
      };
    });
  };

  const imageChangeHandler = (file: File) => {
    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        organisationLogo: file,
      };
    });
  };

  const updateDetailsSuccess = async () => {
    await sleep(1000);
    toast.success("Updated Successfully");
    setUpdating(false);
    editToggle();
  };

  const updateDetailsError = () => {
    toast.error("Error Occurred");
    setUpdating(false);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    for (const field in details) {
      formData.append(field, (details as any)[field]);
    }
    formData.append("address", JSON.stringify({ ...details }));
    setUpdating(true);

    Services.UpdateLeadDetails({
      formData,
      leadId: id,
      success: updateDetailsSuccess,
      error: updateDetailsError,
    });
  };

  const domainsFetchSuccess = (
    response: Array<GetAllBusinessDomainsResponse>
  ) => {
    setDomains(response instanceof Array ? response : []);
  };

  const domainsFetchError = () => {};

  useEffect(() => {
    SharedServices.GetAllBusinessDomains({
      success: domainsFetchSuccess,
      error: domainsFetchError,
    });
  }, []);

  return (
    <div className="text-theme-secondary min-w-[400px] flex flex-col gap-8 bg-theme-background-popup shadow-[-10px_0_23px_-20px_rgba(0,0,0,0.94)] rounded-lg px-3 py-7">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide font-secondary text-theme-secondary">
          LEAD DETAILS
        </span>

        <span
          onClick={editToggle}
          className="text-sm cursor-pointer tracking-wide text-[#458eff] font-semibold"
        >
          {edit ? "Cancel" : "Edit Details"}
        </span>
      </div>

      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="flex flex-col gap-4 overflow-auto"
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            First Name
          </span>
          <input
            id="firstName
            onChange={inputChangeHandler}"
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            defaultValue={personalInfo?.firstName}
            disabled
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Last Name
          </span>
          <input
            id="lastName"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            defaultValue={personalInfo?.lastName}
            disabled
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Email
          </span>
          <input
            id="emailAddress"
            onChange={inputChangeHandler}
            type="email"
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            defaultValue={personalInfo?.emailAddress}
            disabled
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Organization Name
          </span>
          <input
            id="organisationName"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            defaultValue={personalInfo?.organisationName}
            disabled
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Contact Number
          </span>
          <input
            id="contactNumber"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            defaultValue={personalInfo?.contactNumber}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Request Details
          </span>
          <textarea
            id="comments"
            onChange={inputChangeHandler}
            className="bg-transparent disabled:border-transparent pb-1 outline-none border-b border-gray-400 max-h-[200px] overflow-auto"
            defaultValue={requestDetails}
            rows={5}
            disabled
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Business Domain
          </span>
          <Dropdown
            id="bussinessDomain"
            label=""
            theme="primary"
            size="md"
            value={details.bussinessDomain}
            options={[{ label: "None", value: null }, ...domainsOptions]}
            changeEvent={domainChangeHandler}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Address Line 1
          </span>
          <input
            id="addressLine1"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent"
            required
            defaultValue={address?.addressLine1}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Address Line 2
          </span>
          <input
            id="addressLine2"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            required
            defaultValue={address?.addressLine2}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            State
          </span>
          <input
            id="state"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            required
            defaultValue={address?.state}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            City
          </span>
          <input
            id="city"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            required
            defaultValue={address?.city}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Country
          </span>
          <input
            id="country"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            required
            defaultValue={address?.country}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Zipcode
          </span>
          <input
            id="zipCode"
            onChange={inputChangeHandler}
            className="pb-1 bg-transparent border-b border-gray-400 outline-none disabled:border-transparent "
            required
            defaultValue={address?.zipCode}
            disabled={edit === false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-theme-secondary-600">
            Organization Logo
          </span>
          <span>
            {edit ? (
              <ImageUploader
                onChange={imageChangeHandler}
                imageLink={organisationLogo}
              />
            ) : (
              <span>-</span>
            )}
          </span>
        </div>
      </form>

      <CSSTransition in={edit} timeout={150} classNames="popup" unmountOnExit>
        <div className="block [&>div]:w-full">
          <Button
            size="md"
            theme="primary"
            className="w-full"
            type="submit"
            onClick={() => formRef?.current?.requestSubmit()}
            disabled={updating}
          >
            {updating ? (
              <div className="flex items-center gap-2">
                <Loading size="sm" theme="secondary" />
                <span>Updating</span>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </CSSTransition>
    </div>
  );
}

export default ViewAllLeadDetails;
