import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "../../../../../shared/components/loading-screen";
import * as SharedServices from "../../../../../shared/services";
import { GetCustomerByIdResponse } from "../../../../../shared/services/model.response";
import { Status } from "../../../enums";
import { CustomersResponse } from "../../../services/model.response";
import CustomerAssignSalesPerson from "../customer-assign-sales-person";
import CustomerQualifyDisqualifyContainer from "../customer-qualify-disqualify-container";
import ViewDefaultCustomerDetails from "../view-default-customer-details";
import CustomerDetailsHeader from "../customer-details-header";

function CustomerTrackerDetailsContainer() {
  const router = useRouter();
  const { customerid } = router.query;

  const [fetching, setFetching] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomersResponse>();

  // TOCHANGE
  const showAssignedSalesPerson =
    (customerDetails?.status === Status.PROCESSING &&
      customerDetails?.salesPerson === null) ??
    false;
  const showQualifyDisqualifyCustomer =
    !showAssignedSalesPerson && customerDetails?.status === Status.NEW;

  const customerDetailsFetchSuccess = (response: GetCustomerByIdResponse) => {
    setCustomerDetails(response);
    setFetching(false);
  };

  const customerDetailsFetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    if (!customerid) return;

    setFetching(true);

    SharedServices.GetCustomerById({
      id: customerid as string,
      success: customerDetailsFetchSuccess,
      error: customerDetailsFetchError,
    });
  }, [router.query]);

  if (fetching || !customerDetails) {
    return (
      <div className="fixed inset-0 z-30 block">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <CustomerDetailsHeader {...customerDetails} />

      <div className="flex flex-wrap justify-between gap-6">
        <div
          className={`flex-1 px-4 py-8 shadow-lg bg-theme-background-elevate rounded-xl relative overflow-hidden`}
        >
          <ViewDefaultCustomerDetails {...customerDetails} />

          {/* <div className="bg-[#00A36C] w-[30px] absolute h-[30px] top-7 rotate-[5deg] origin-top -left-3 rounded-full shadow-md" /> */}
        </div>

        <div className="sticky top-0 flex-1 h-full px-4 py-8 overflow-hidden shadow-lg rounded-xl bg-theme-background-elevate">
          {showAssignedSalesPerson && (
            <CustomerAssignSalesPerson customerId={customerid as string} />
          )}

          {showQualifyDisqualifyCustomer && (
            <CustomerQualifyDisqualifyContainer
              customerId={customerid as string}
            />
          )}

          {/* <div className="bg-[#18a0fb] w-[30px] absolute h-[30px] top-7 rotate-[5deg] origin-top -left-3 rounded-full shadow-md" /> */}
        </div>
      </div>
    </div>
  );
}

export default CustomerTrackerDetailsContainer;
