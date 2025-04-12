import Image from "next/image";
import Router from "next/router";
import {
  arrow_left,
  user_circle,
  verified_circle,
} from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import { CustomerDetailsProps } from "./model";

function CustomerDetailsHeader(customerDetails: CustomerDetailsProps) {
  const {
    personalInfo,
    organisationLogo,
    status,
    salesPerson,
    userName,
    customerName,
  } = customerDetails;

  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center gap-6">
        <div
          className="cursor-pointer h-fit w-fit"
          onClick={() => Router.back()}
        >
          <Icon icon={arrow_left} size="md" theme="secondary" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xl">
              <h2 className="font-semibold capitalize text-theme-secondary">
                {customerName}
              </h2>
              <span className="text-theme-secondary">-</span>
              <h2 className="font-medium capitalize text-theme-secondary">
                {userName}
              </h2>
            </div>

            <div>
              <span className="inline-block lowercase first-letter:capitalize rounded-full text-sm px-4 py-1 font-semibold text-[#00A36C] bg-[rgb(0,163,108,0.2)]">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          {/* <div className="flex items-center gap-2">
            <Icon
              icon={verified_circle}
              size="lg"
              theme="secondary"
              iconType="solid"
              className="[&>svg]:!fill-[#5A8DF7]"
            />
            <span className="capitalize text-md text-theme-secondary">
              {salesPerson ?? "-"}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailsHeader;
