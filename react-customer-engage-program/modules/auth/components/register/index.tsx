import { useKeycloak } from "@react-keycloak/web";
import { FormEvent, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useFormValidation from "../../../../hooks/use-form-vallidation";
import { PersonalInfo } from "../../../../shared/model";
import Button from "../../../../ui-components/Button";
import Input from "../../../../ui-components/Input";
import Loading from "../../../../ui-components/Loading";
import Modal from "../../../../ui-components/Modal";
import * as Services from "../../services";
import { RegisterCustomerStep1Response } from "../../services/model.response";
import MailSent from "../mail-sent";
import { ErrorProps, RegisterProps } from "./model";

function Register({ showRegisterToggle }: RegisterProps) {
  const [registering, setRegistering] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState<ErrorProps>({
    error: false,
    message: "",
  });

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const { keycloak, initialized } = useKeycloak();

  const { form } = useFormValidation({
    firstName: { required: true },
    lastName: { required: true },
    emailAddress: { required: true },
    organisationName: { required: true },
    contactNumber: { required: true },
  });

  const loginHandler = () => {
    if (initialized) {
      keycloak.login({
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URL,
      });
    }
  };

  const inputChangeHandler = ({ target: { id, value } }: any) => {
    form.set({ id, value });
  };

  const registerSuccess = ({ response }: RegisterCustomerStep1Response) => {
    setRegistering(false);
    setMailSent(true);
    // REMOVE
    console.log(
      `%c http://172.24.2.175:3000/complete-registration?_enccode=${response.enccode}`,
      "background:green;color:#FFF"
    );
  };

  const registerError = (error: any) => {
    setRegistering(false);
    setError({
      error: true,
      message: error.message ?? "Error Occurred",
    });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    setError({
      error: false,
      message: "",
    });

    hiddenInputRef?.current?.focus();

    if (!form.checkRequiredFields()) return;

    setRegistering(true);

    let formData = {} as PersonalInfo;
    for (const field in form.group) {
      formData = { ...formData, [field]: form.get(field).value };
    }

    Services.RegisterCustomerStep1({
      personalInfo: formData,
      success: registerSuccess,
      error: registerError,
    });
  };

  if (mailSent) {
    return (
      <Modal isOpen={mailSent} close={showRegisterToggle}>
        <MailSent email={form.group.emailAddress.value ?? ""} />
      </Modal>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-center font-secondary text-theme-secondary font-semibold text-lg">
        Register as a Client
      </h1>

      <br />

      <form
        onSubmit={submitHandler}
        className="px-6 py-4 flex flex-col gap-5 font-primary"
      >
        <Input
          id="firstName"
          label="First Name"
          size="md"
          theme="secondary"
          iconType="outline"
          error={form.get("firstName").hasError}
          errorMessage={form.get("firstName").errorMessage}
          onChangeEvent={inputChangeHandler}
        />

        <Input
          id="lastName"
          label="Last Name"
          size="md"
          theme="secondary"
          iconType="outline"
          error={form.get("lastName").hasError}
          errorMessage={form.get("lastName").errorMessage}
          onChangeEvent={inputChangeHandler}
        />

        <Input
          id="emailAddress"
          label="Email Address"
          size="md"
          theme="secondary"
          iconType="outline"
          type="email"
          error={form.get("emailAddress").hasError}
          errorMessage={form.get("emailAddress").errorMessage}
          onChangeEvent={inputChangeHandler}
        />

        <Input
          id="organisationName"
          label="Organization Name"
          size="md"
          theme="secondary"
          iconType="outline"
          error={form.get("organisationName").hasError}
          errorMessage={form.get("organisationName").errorMessage}
          onChangeEvent={inputChangeHandler}
        />

        <Input
          id="contactNumber"
          label="Contact Number"
          size="md"
          theme="secondary"
          iconType="outline"
          error={form.get("contactNumber").hasError}
          errorMessage={form.get("contactNumber").errorMessage}
          onChangeEvent={inputChangeHandler}
        />

        <CSSTransition
          in={error.error}
          timeout={150}
          classNames="fly"
          unmountOnExit
        >
          <div className="bg-red-100 p-1 rounded-md text-center">
            <h4 className="text-red-900 font-medium">{error.message}</h4>
          </div>
        </CSSTransition>

        <Button
          theme="primary"
          size="lg"
          className="w-full"
          type="submit"
          disabled={registering}
        >
          <div className="flex-center-center !gap-2">
            {registering && <Loading size="sm" theme="secondary" />}
            <span className="text-base">
              {" "}
              {registering ? "Registering.." : "Register"}{" "}
            </span>
          </div>
        </Button>

        <div className="flex items-center gap-4">
          <span className="flex-1 h-[2px] bg-gray-400"></span>
          <span className="text-theme-secondary-500">OR</span>
          <span className="flex-1 h-[2px] bg-gray-400"></span>
        </div>

        <div className="text-theme-secondary flex flex-col justify-center items-center gap-2">
          Already registered as a client ?
          <span>
            <Button
              theme="secondary"
              buttonThemeStyle="ghost"
              size="md"
              className="w-full"
              type="button"
              onClick={loginHandler}
            >
              Login
            </Button>
          </span>
        </div>
      </form>

      <input style={{ opacity: 0 }} ref={hiddenInputRef} />
    </div>
  );
}

export default Register;
