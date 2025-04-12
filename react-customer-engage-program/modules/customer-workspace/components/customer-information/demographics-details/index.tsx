import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { pencil } from "../../../../../helpers/icons";
import { ApplicationRoles } from "../../../../../shared/enums";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Modal from "../../../../../ui-components/Modal";
import EditDemographicsInformation from "../edit-demographics-information";
import { DemographicDetailsProps } from "./model";

function DemographicDetails(props: DemographicDetailsProps) {
  const { keycloak } = useKeycloak();

  const [information, setInformation] = useState(props.address);
  const [showEdit, setShowEdit] = useState(false);

  const role = keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
    "roles"
  ][0] as ApplicationRoles;

  const editToggle = () => {
    setShowEdit(!showEdit);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-theme-secondary-550 font-medium">
          Demographics Details
        </h2>
        {role === ApplicationRoles.CUSTOMER && (
          <Button
            onClick={editToggle}
            size="md"
            theme="secondary"
            buttonThemeStyle="ghost"
          >
            <div className="flex-center-center">
              <Icon
                icon={pencil}
                size="md"
                theme="secondary"
                className="[&>svg]:!stroke-[#5a8df7]"
              />
              <span className="text-[#5a8df7]">Edit Details</span>
            </div>
          </Button>
        )}
      </div>

      <div className="relative overflow-hidden flex items-center gap-28 px-4 py-8 rounded-lg bg-theme-background-elevate shadow-lg">
        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">
            Address Line 1
          </span>
          <span className="text-theme-secondary-700">
            {information?.addressLine1 ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">
            Address Line 2
          </span>
          <span className="text-theme-secondary-700">
            {information?.addressLine2 ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">State</span>
          <span className="text-theme-secondary-700">
            {information?.state ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">City</span>
          <span className="text-theme-secondary-700">
            {information?.city ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">Zipcode</span>
          <span className="text-theme-secondary-700">
            {information?.zipCode ?? "-"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-theme-secondary-600 font-medium">Country</span>
          <span className="text-theme-secondary-700">
            {information?.country ?? "-"}
          </span>
        </div>

        <div className="absolute z-10 -left-7 top-1 h-[20px] w-[40px] bg-[#458EFF] rounded-full"></div>
      </div>

      <Modal isOpen={showEdit} close={editToggle}>
        <h1 className="font-medium pt-10 pb-4 px-4 text-lg">
          <EditDemographicsInformation onCancel={editToggle} {...props} />
        </h1>
      </Modal>
    </div>
  );
}

export default DemographicDetails;
