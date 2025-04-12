import { useRouter } from "next/router";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { monitor } from "../../../../helpers/icons";
import sleep from "../../../../helpers/sleep";
import storeUserInfo from "../../../../helpers/store-user-info";
import useFormValidation from "../../../../hooks/use-form-vallidation";
import { TechnologyType } from "../../../../shared/enums";
import * as SharedServices from "../../../../shared/services";
import { GetTechnologiesByTechnologyTypeResponse } from "../../../../shared/services/model.response";
import Button from "../../../../ui-components/Button";
import Dropdown from "../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../ui-components/DropdownOption/model";
import Icon from "../../../../ui-components/Icon";
import Input from "../../../../ui-components/Input";
import Loading from "../../../../ui-components/Loading";
import Textarea from "../../../../ui-components/Textarea";
import * as Services from "../../services";

function DemoRequest() {
  const router = useRouter();

  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [technologies, setTechnologies] = useState<
    Array<GetTechnologiesByTechnologyTypeResponse>
  >([]);

  const hiddenInputRef = useRef(null);

  const sourceTechnologies: Array<DropdownOptions> = useMemo(() => {
    return technologies
      .filter(
        ({ technologyType }) =>
          technologyType === TechnologyType.SOURCE_TECHNOLOGY
      )
      .map(({ id, technologyName }) => ({ label: technologyName, value: id }));
  }, [technologies]);

  const targetTechnologies: Array<DropdownOptions> = useMemo(() => {
    return technologies
      .filter(
        ({ technologyType }) =>
          technologyType === TechnologyType.TARGET_TECHNOLOGY
      )
      .map(({ id, technologyName }) => ({ label: technologyName, value: id }));
  }, [technologies]);

  const { form } = useFormValidation({
    sourceTechnology: { required: true },
    targetTechnology: { required: true },
    firstName: { required: true },
    lastName: { required: true },
    emailAddress: { required: true },
    organisationName: { required: true },
    contactNumber: { required: true },
    requestDetails: { required: false },
  });

  const inputChangeHandler = ({ target: { id, value } }: any) => {
    form.set({ id, value });
  };

  const createdSuccess = () => {
    storeUserInfo({
      firstName: form.get("firstName").value,
      lastName: form.get("lastName").value,
      emailAddress: form.get("emailAddress").value,
    });

    setCreating(false);
    toast(
      <span>
        <span className="font-primary font-semibold">Demo request</span> created
      </span>,
      { type: "success" }
    );
    router.push("/");
  };

  const creatingError = () => {
    setCreating(false);
    toast("Error Occurred", { type: "error" });
  };

  const technologiesFetchSuccess = async (
    response: Array<GetTechnologiesByTechnologyTypeResponse>
  ) => {
    setTechnologies(response instanceof Array ? response : []);
    setFetching(false);
  };

  const technologiesFetchError = () => {
    setFetching(false);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!form.checkRequiredFields()) return;

    setCreating(true);
    Services.CreateDemoRequest({
      personalInfoVo: {
        firstName: String(form.get("firstName").value),
        lastName: String(form.get("lastName").value),
        contactNumber: String(form.get("contactNumber").value),
        emailAddress: String(form.get("emailAddress").value),
        organisationName: String(form.get("organisationName").value),
      },
      requestDetails: String(form.get("requestDetails").value),
      sourceTechnology: String(form.get("sourceTechnology").value),
      targetTechnology: String(form.get("targetTechnology").value),

      success: createdSuccess,
      error: creatingError,
    });
  };

  useEffect(() => {
    setFetching(true);

    SharedServices.GetTechnologiesByTechnologyType({
      technologyType: [
        TechnologyType.SOURCE_TECHNOLOGY,
        TechnologyType.TARGET_TECHNOLOGY,
      ],
      success: technologiesFetchSuccess,
      error: technologiesFetchError,
    });
  }, []);

  return (
    <div className="px-6 flex flex-col gap-y-8 h-full">
      <div>
        <h2 className="font-secondary font-semibold text-theme-secondary text-lg">
          Create a Demo Request
        </h2>
        <h2 className="font-secondary font-medium text-theme-secondary-600 text-base">
          We will connect with you soon.
        </h2>
      </div>

      {fetching && (
        <div className="h-full flex-center-center !gap-2">
          <Loading size="md" theme="secondary" />
          <span className="text-theme-secondary">Loading</span>
        </div>
      )}

      {!fetching && (
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Dropdown
              id="sourceTechnology"
              label="Source Technology"
              options={sourceTechnologies}
              size="md"
              theme="primary"
              hasError={form.get("sourceTechnology").hasError}
              errorMessage={form.get("sourceTechnology").errorMessage}
              changeEvent={(value: string) => {
                form.set({ id: "sourceTechnology", value });
              }}
            />

            <Dropdown
              id="targetTechnology"
              label="Target Technology"
              options={targetTechnologies}
              size="md"
              theme="primary"
              hasError={form.get("targetTechnology").hasError}
              errorMessage={form.get("targetTechnology").errorMessage}
              changeEvent={(value: string) => {
                form.set({ id: "targetTechnology", value });
              }}
            />
          </div>

          <div className="flex gap-3">
            <Input
              id="firstName"
              label="First Name"
              size="md"
              theme="secondary"
              iconType="outline"
              error={form.get("firstName").hasError}
              errorMessage={form.get("firstName").errorMessage}
              onBlurEvent={inputChangeHandler}
            />

            <Input
              id="lastName"
              label="Last Name"
              size="md"
              theme="secondary"
              iconType="outline"
              error={form.get("lastName").hasError}
              errorMessage={form.get("lastName").errorMessage}
              onBlurEvent={inputChangeHandler}
            />
          </div>

          <div className="flex gap-3">
            <Input
              id="emailAddress"
              label="Email Address"
              size="md"
              theme="secondary"
              iconType="outline"
              type="email"
              error={form.get("emailAddress").hasError}
              errorMessage={form.get("emailAddress").errorMessage}
              onBlurEvent={inputChangeHandler}
            />

            <Input
              id="contactNumber"
              label="Contact Number"
              size="md"
              theme="secondary"
              iconType="outline"
              error={form.get("contactNumber").hasError}
              errorMessage={form.get("contactNumber").errorMessage}
              onBlurEvent={inputChangeHandler}
            />
          </div>

          <Input
            id="organisationName"
            label="Organization Name"
            size="md"
            theme="secondary"
            iconType="outline"
            error={form.get("organisationName").hasError}
            errorMessage={form.get("organisationName").errorMessage}
            onBlurEvent={inputChangeHandler}
          />

          <div>
            <Textarea
              id="requestDetails"
              label="Request Details (Optional)"
              theme="secondary"
              size="md"
              rows={6}
              onBlurEvent={inputChangeHandler}
            />
          </div>

          <Button size="lg" theme="primary" className="w-full" type="submit">
            <div className="flex-center-center !gap-2">
              {creating && <Loading size="sm" theme="secondary" />}
              {!creating && <Icon icon={monitor} size="md" theme="primary" />}
              <span className="text-base">
                {creating ? "Creating.." : "Create Demo Request"}
              </span>
            </div>
          </Button>

          <input style={{ opacity: 0 }} ref={hiddenInputRef} />
        </form>
      )}
    </div>
  );
}

export default DemoRequest;
