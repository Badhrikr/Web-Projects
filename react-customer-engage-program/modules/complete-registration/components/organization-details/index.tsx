import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { home, tick } from "../../../../helpers/icons";
import useFormValidation from "../../../../hooks/use-form-vallidation";
import * as SharedServices from "../../../../shared/services";
import { GetAllBusinessDomainsResponse } from "../../../../shared/services/model.response";
import Button from "../../../../ui-components/Button";
import Dropdown from "../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../ui-components/DropdownOption/model";
import Icon from "../../../../ui-components/Icon";
import Input from "../../../../ui-components/Input";
import Loading from "../../../../ui-components/Loading";
import * as Services from "../../services";
import { OrganizationDetailsProps } from "./model";

function OrganizationalDetails({
  encCode,
  custId,
  alreadyRegistered,
  userName,
  customerName,
}: OrganizationDetailsProps) {
  const router = useRouter();

  const [domains, setDomains] = useState<Array<GetAllBusinessDomainsResponse>>(
    []
  );
  const [domainsFetching, setDomainsFetching] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(alreadyRegistered);

  const domainsOptions: Array<DropdownOptions> = useMemo(() => {
    return domains.map(({ domainName, domainId }) => ({
      label: domainName,
      value: domainId,
    }));
  }, [domains]);

  const { form } = useFormValidation({
    bussinessDomain: { required: true },
    addressLine1: { required: true },
    addressLine2: { required: true },
    state: { required: true },
    city: { required: true },
    country: { required: true },
    zipCode: { required: true },
  });

  const inputBlurHandler = ({ target: { id, value } }: any) => {
    form.set({ id, value });
  };

  const registerSuccess = () => {
    toast("Registration successful", {
      type: "success",
      hideProgressBar: true,
    });

    setRegistering(false);
    setRegistered(true);
  };

  const registerError = (error: any) => {
    setRegistering(false);
    toast(error.message ?? "Error Occurred", {
      type: "error",
      hideProgressBar: true,
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.checkRequiredFields()) return;

    setRegistering(true);

    Services.RegisterCustomerStep2({
      custid: custId,
      bussinessDomain: String(form.get("bussinessDomain").value),
      address: {
        addressLine1: String(form.get("addressLine1").value),
        addressLine2: String(form.get("addressLine1").value),
        city: String(form.get("city").value),
        state: String(form.get("state").value),
        country: String(form.get("country").value),
        zipCode: String(form.get("zipCode").value),
      },
      encCode,
      success: registerSuccess,
      error: registerError,
    });
  };

  const domainsFetchSuccess = (
    response: Array<GetAllBusinessDomainsResponse>
  ) => {
    setDomains(response instanceof Array ? response : []);
    setDomainsFetching(false);
  };

  const domainsFetchError = () => {
    setDomainsFetching(false);
  };

  useEffect(() => {
    setDomainsFetching(true);

    SharedServices.GetAllBusinessDomains({
      success: domainsFetchSuccess,
      error: domainsFetchError,
    });
  }, []);

  if (registered) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/assets/success.svg"
            alt="success"
            height={75}
            width={75}
          />
          <h3 className="text-lg font-semibold text-theme-secondary font-primary">
            Registration successful
          </h3>
        </div>

        <Button
          onClick={() => router.push("/")}
          size="sm"
          theme="primary"
          className="mt-4"
        >
          <Icon icon={home} size="sm" theme="primary" />
          <span>Go to home</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div>
        <h1 className="text-lg font-semibold capitalize font-secondary text-theme-secondary-800">
          Welcome {userName}
        </h1>
        <h3 className="text-base font-medium font-secondary text-theme-secondary-600">
          Please fill the below details to complete your registration process
        </h3>
      </div>

      <br />

      {domainsFetching && (
        <div className="h-[300px] flex-center-center !gap-2">
          <Loading size="md" theme="secondary" />
          <span className="text-theme-secondary">Please wait</span>
        </div>
      )}

      {!domainsFetching && (
        <form
          onSubmit={submitHandler}
          autoComplete="false"
          className="flex flex-col gap-5 py-6"
        >
          <Input
            label="Organization Name"
            size="md"
            theme="primary"
            value={customerName}
            disabled
          />

          <Dropdown
            id="bussinessDomain"
            label="Organization Domain"
            theme="primary"
            size="md"
            options={domainsOptions}
            hasError={form.get("bussinessDomain").hasError}
            errorMessage={form.get("bussinessDomain").errorMessage}
            changeEvent={(value: string) => {
              form.set({ id: "bussinessDomain", value });
            }}
          />

          <Input
            id="addressLine1"
            label="Address Line 1"
            size="md"
            theme="primary"
            error={form.get("addressLine1").hasError}
            errorMessage={form.get("addressLine1").errorMessage}
            onBlurEvent={inputBlurHandler}
          />

          <Input
            id="addressLine2"
            label="Address Line 2"
            size="md"
            theme="primary"
            error={form.get("addressLine2").hasError}
            errorMessage={form.get("addressLine2").errorMessage}
            onBlurEvent={inputBlurHandler}
          />

          <div className="flex gap-3">
            <Input
              id="city"
              label="City"
              size="md"
              theme="primary"
              error={form.get("city").hasError}
              errorMessage={form.get("city").errorMessage}
              onBlurEvent={inputBlurHandler}
            />

            <Input
              id="state"
              label="State"
              size="md"
              theme="primary"
              onBlurEvent={inputBlurHandler}
              error={form.get("state").hasError}
              errorMessage={form.get("state").errorMessage}
            />
          </div>

          <div className="flex gap-3">
            <Input
              id="zipCode"
              label="Zipcode"
              size="md"
              theme="primary"
              onBlurEvent={inputBlurHandler}
              error={form.get("zipCode").hasError}
              errorMessage={form.get("zipCode").errorMessage}
            />

            <Input
              id="country"
              label="Country"
              size="md"
              theme="primary"
              onBlurEvent={inputBlurHandler}
              error={form.get("country").hasError}
              errorMessage={form.get("country").errorMessage}
            />
          </div>

          <Button
            theme="primary"
            size="lg"
            type="submit"
            disabled={registering}
            className="w-full"
          >
            <div className="flex-center-center !gap-2">
              {registering ? (
                <Loading size="sm" theme="secondary" />
              ) : (
                <Icon icon={tick} size="md" theme="primary" />
              )}
              <span className="text-base">
                {registering ? "Registering.." : "Complete Registration"}
              </span>
            </div>
          </Button>
        </form>
      )}
    </div>
  );
}

export default OrganizationalDetails;
