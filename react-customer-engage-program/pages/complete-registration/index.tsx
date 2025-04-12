import { GetServerSideProps } from "next";
import { GET_CUSTOMER_BY_ENC_ID } from "../../common/api-routes";
import CompleteRegistrationLayout from "../../layouts/complete-registration-layout";
import InvalidRequest from "../../modules/complete-registration/components/invalid-request";
import OrganizationalDetails from "../../modules/complete-registration/components/organization-details";
import TimeExpired from "../../modules/complete-registration/components/time-expired";
import UserAlreadyRegistered from "../../modules/complete-registration/components/user-already-registred";
import { CompleteRegistrationProps } from "../../modules/complete-registration/model";

function CompleteRegistrationPage(props: CompleteRegistrationProps) {
  const {
    encCode,
    id,
    personalInfo,
    invalidRequest,
    timeExpired,
    alreadyRegistered,
    message,
    userName,
    customerName,
  } = props || {};

  console.log({ props });

  if (invalidRequest) {
    return (
      <div className="flex items-center flex-1">
        <InvalidRequest {...{ message }} />
      </div>
    );
  }

  if (timeExpired) {
    return (
      <div className="flex items-center flex-1">
        <TimeExpired {...{ message }} />
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div className="flex items-center flex-1">
        <UserAlreadyRegistered {...{ message }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-theme-background-primary">
      {!invalidRequest && (
        <div className="flex flex-col self-center justify-center flex-1 w-full gap-4 p-3 md:w-3/4 lg:w-2/4">
          <OrganizationalDetails
            encCode={encCode}
            custId={id}
            userName={userName}
            customerName={customerName}
            alreadyRegistered={false}
            {...personalInfo}
          />
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const key = "_enccode";
  const encryptedId = query[key] as string;

  try {
    const searchParams = new URLSearchParams();
    searchParams.set("encryptedId", encryptedId);

    let response = await fetch(
      `${GET_CUSTOMER_BY_ENC_ID}?${searchParams.toString()}`
    );

    console.log(
      `${GET_CUSTOMER_BY_ENC_ID}?${searchParams.toString()}`,
      response.status
    );

    if ([401, 500].includes(response.status)) {
      return {
        props: {
          invalidRequest: true,
          message: "Requested url may be expired or Invalid.",
        },
      };
    }

    if (response.status === 400) {
      return {
        props: {
          timeExpired: true,
          message: "Requested url is expired. Please re-register.",
        },
      };
    }

    if (response.status === 409) {
      return {
        props: {
          alreadyRegistered: true,
          message: "You are already registered.",
        },
      };
    }

    return {
      props: {
        ...(await response.json()),
        encCode: searchParams.get("encryptedId"),
      },
    };
  } catch (err: any) {
    return {
      props: {
        invalidRequest: true,
        errorMessage: "Error Occurred",
      },
    };
  }
};

CompleteRegistrationPage.PageLayout = CompleteRegistrationLayout;
export default CompleteRegistrationPage;
