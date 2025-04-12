import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import getActionAvatar from "../../../../../helpers/get-action-avatar";
import {
  building_2,
  phone,
  user_circle,
  verified_circle,
} from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import Ribbon from "../../../../../ui-components/Ribbon";
import { LeadProps } from "./model";

function Lead({
  id,
  isNew,
  status,
  followUpDate,
  organisationLogo,
  personalInfo,
  leadType,
  salesPerson,
}: LeadProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${router.pathname}/${id}`)}
      className="flex flex-col gap-3 relative shadow-sm py-5 px-5 rounded-lg cursor-pointer bg-theme-background-elevate elevate hover:shadow-lg"
    >
      {isNew && <Ribbon message="New" />}

      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <span className="h-[8px] w-[8px] rounded-full bg-[#458eff]"> </span>
          <span className="text-sm text-theme-secondary-800 lowercase first-letter:capitalize inline-block">
            {" "}
            {status}{" "}
          </span>
        </div>

        <span className="text-sm text-theme-secondary">
          {followUpDate ? moment(followUpDate).format("DD MMM") : ""}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid place-content-center relative">
          <div className="relative h-14 w-14">
            {organisationLogo ? (
              <Image src={organisationLogo ?? ""} alt="logo" fill priority />
            ) : (
              <Icon
                icon={user_circle}
                size="_2xl"
                theme="secondary"
                iconType="solid"
              />
            )}

            <div className=" absolute bottom-0 -right-4 bg-theme-background-popup p-2 rounded-full shadow-md">
              {getActionAvatar(leadType)}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-theme-secondary capitalize">
            {personalInfo?.firstName ?? "-"}
          </h3>
          <h3 className="text-theme-secondary-600 lowercase">
            {personalInfo?.emailAddress ?? "-"}
          </h3>
        </div>
      </div>

      <span className="w-full h-[.5px] bg-gray-400" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Icon
            icon={building_2}
            size="sm"
            theme="secondary"
            iconType="solid"
            className="[&>svg]:!fill-orange-500"
          />
          <span className="text-sm text-theme-secondary capitalize">
            {personalInfo?.organisationName ?? "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Icon
            icon={phone}
            size="sm"
            theme="secondary"
            iconType="solid"
            className="[&>svg]:!fill-emerald-500"
          />
          <span className="text-sm text-theme-secondary">
            {personalInfo?.contactNumber ?? "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Icon
            icon={verified_circle}
            size="sm"
            theme="secondary"
            iconType="solid"
            className="[&>svg]:!fill-[#5A8DF7]"
          />
          <span className="text-sm text-theme-secondary capitalize">
            {salesPerson ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Lead;
