import { ViewDefaultCustomerDetailsProps } from "./model";

function ViewDefaultCustomerDetails({
  personalInfo,
  address,
  userName,
  customerName,
  domainName
}: ViewDefaultCustomerDetailsProps) {
  return (
    <div className="flex flex-col gap-6 px-4">
      <h2 className="text-lg font-semibold text-theme-secondary">
        Customer Details
      </h2>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <div>
            <h4 className="font-semibold text-theme-secondary-550">Name</h4>
            <h5 className="text-theme-secondary">{userName ?? "-"}</h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">Email</h4>
            <h5 className="text-theme-secondary">
              {personalInfo?.emailAddress ?? "-"}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Organisation Name
            </h4>
            <h5 className="text-theme-secondary">
              {/* {personalInfo?.organisationName ?? "-"} */}
              {customerName}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Contact Number
            </h4>
            <h5 className="text-theme-secondary">
              {personalInfo?.contactNumber ?? "-"}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Business Domain
            </h4>
            <h5 className="text-theme-secondary">{domainName}</h5>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Address Line 1
            </h4>
            <h5 className="text-theme-secondary">
              {address?.addressLine1 ?? "-"}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Address Line 2
            </h4>
            <h5 className="text-theme-secondary">
              {address?.addressLine2 ?? "-"}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">State</h4>
            <h5 className="text-theme-secondary"> {address?.state ?? "-"} </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">City</h4>
            <h5 className="text-theme-secondary"> {address?.city ?? "-"} </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">Country</h4>
            <h5 className="text-theme-secondary">
              {address?.country ?? "-"} {"-"} {address?.zipCode ?? "-"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDefaultCustomerDetails;
