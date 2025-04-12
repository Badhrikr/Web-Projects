import { useEffect, useState } from "react";
import { user_circle } from "../../../../helpers/icons";
import * as SharedServices from "../../../../shared/services";
import { GetCustomerByIdResponse } from "../../../../shared/services/model.response";
import Icon from "../../../../ui-components/Icon";
import Loading from "../../../../ui-components/Loading";
import { CustomersResponse } from "../../../sales/services/model.response";
import DemographicDetails from "./demographics-details";
import OrganizationInformation from "./organization-information";
import PersonalInformation from "./personal-information";

function CustomerInformationContainer({ customerId }: { customerId: string }) {
  const [fetching, setFetching] = useState(true);

  const [customerInformation, setCustomerInformation] =
    useState<CustomersResponse>();

  const fetchSuccess = (response: GetCustomerByIdResponse) => {
    setFetching(false);
    setCustomerInformation(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    setFetching(true);

    SharedServices.GetCustomerById({
      id: customerId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  if (fetching || !customerInformation) {
    return (
      <div className="flex-center-center">
        <Loading size="lg" theme="secondary" />
        <span className="text-theme-secondary"> Loading </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-4">
      <h3 className="font-semibold text-theme-secondary text-xl">
        Customer Information
      </h3>

      <div className="flex flex-col gap-3">
        <Icon
          icon={user_circle}
          size="_2xl"
          theme="secondary"
          iconType="solid"
        />
        <h2 className="text-theme-secondary text-lg">
          <span className="font-medium">
            {customerInformation?.customerName}
          </span>{" "}
          - {customerInformation?.userName}
        </h2>
      </div>
      
      <PersonalInformation {...customerInformation} />

      <OrganizationInformation {...customerInformation} />

      <DemographicDetails {...customerInformation} />
    </div>
  );
}

export default CustomerInformationContainer;
