import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { phone } from "../../../../helpers/icons";
import storeUserInfo from "../../../../helpers/store-user-info";
import useFormValidation from "../../../../hooks/use-form-vallidation";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Input from "../../../../ui-components/Input";
import Loading from "../../../../ui-components/Loading";
import Textarea from "../../../../ui-components/Textarea";
import * as Services from "../../services";

function CallbackRequest() {
  const [creating, setCreating] = useState(false);

  const { form } = useFormValidation({
    firstName: { required: true },
    lastName: { required: true },
    emailAddress: { required: true },
    organisationName: { required: true },
    contactNumber: { required: true },
    requestDetails: { required: false },
  });

  const router = useRouter();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

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
        <span className="font-primary font-semibold">Callback request</span>{" "}
        created
      </span>,
      { type: "success" }
    );

    router.push("/");
  };

  const creatingError = () => {
    setCreating(false);
    toast("Error Occurred", { type: "error" });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    hiddenInputRef?.current?.focus();

    if (!form.checkRequiredFields()) return;

    setCreating(true);

    Services.CreateCallbackRequest({
      personalInfoVo: {
        firstName: String(form.get("firstName").value),
        lastName: String(form.get("lastName").value),
        contactNumber: String(form.get("contactNumber").value),
        emailAddress: String(form.get("emailAddress").value),
        organisationName: String(form.get("organisationName").value),
      },
      requestDetails: String(form.get("requestDetails").value),

      success: createdSuccess,
      error: creatingError,
    });
  };

  return (
    <div className="px-6 flex flex-col gap-y-8">
      <div>
        <h2 className="font-secondary font-semibold text-theme-secondary text-lg">
          Create a Callback Request
        </h2>
        <h2 className="font-secondary font-medium text-theme-secondary-600 text-base">
          We will connect with you soon.
        </h2>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-5">
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
            {!creating && <Icon icon={phone} size="md" theme="primary" />}
            <span className="text-base">
              {creating ? "Creating.." : "Create Callback Request"}
            </span>
          </div>
        </Button>

        <input style={{ opacity: 0 }} ref={hiddenInputRef} />
      </form>
    </div>
  );
}

export default CallbackRequest;
