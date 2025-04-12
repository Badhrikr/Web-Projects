import { ViewDefaultLeadDetailsProps } from "./model";

function ViewDefaultLeadDetails({
  personalInfo,
  address,
  requestDetails,
  bussinessDomainDesc,
  sourceTechnologyDesc,
  targetTechnologyDesc,
}: ViewDefaultLeadDetailsProps) {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 flex flex-col gap-4">
          {sourceTechnologyDesc && (
            <div>
              <h4 className="font-semibold text-theme-secondary-550">
                Source Technology
              </h4>
              <h5 className="text-theme-secondary">{sourceTechnologyDesc}</h5>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              First Name
            </h4>
            <h5 className="text-theme-secondary">{personalInfo?.firstName}</h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Last Name
            </h4>
            <h5 className="text-theme-secondary"> {personalInfo?.lastName} </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">Email</h4>
            <h5 className="text-theme-secondary">
              {personalInfo?.emailAddress}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Organisation Name
            </h4>
            <h5 className="text-theme-secondary">
              {personalInfo?.organisationName}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Contact Number
            </h4>
            <h5 className="text-theme-secondary">
              {personalInfo?.contactNumber}
            </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">
              Business Domain
            </h4>
            <h5 className="text-theme-secondary">
              {bussinessDomainDesc ?? "-"}
            </h5>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {targetTechnologyDesc && (
            <div>
              <h4 className="font-semibold text-theme-secondary-550">
                Target Technology
              </h4>
              <h5 className="text-theme-secondary">{targetTechnologyDesc}</h5>
            </div>
          )}

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
            <h4 className="font-semibold text-theme-secondary-550">State</h4>
            <h5 className="text-theme-secondary"> {address?.city ?? "-"} </h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">Country</h4>
            <h5 className="text-theme-secondary">{address?.country ?? "-"}</h5>
          </div>

          <div>
            <h4 className="font-semibold text-theme-secondary-550">Zipcode</h4>
            <h5 className="text-theme-secondary">{address?.zipCode ?? "-"}</h5>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-theme-secondary-550">
          Request Details
        </h4>
        <h5 className="text-theme-secondary"> {requestDetails} </h5>
      </div>
    </div>
  );
}

export default ViewDefaultLeadDetails;
