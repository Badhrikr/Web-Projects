import Image from "next/image";
import { useRouter } from "next/router";
import { _building, _phone, user } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import Ribbon from "../../../../../ui-components/Ribbon";
import { Status } from "../../../enums";
import { CustomerProps } from "./model";

function Customer({
  isNew,
  status,
  userContactNo,
  salesPerson,
  customerName,
  Id,
  userName,
  userEmail,
}: CustomerProps) {
  const router = useRouter();

  const clickHandler = () => {
    const route =
      status === Status.ACTIVE
        ? `/sales/customers/${Id}/workspace/migration-requests`
        : `/sales/customers/${Id}`;
    router.push(route);
  };

  return (
    <div
      onClick={clickHandler}
      className={`${status === Status.INACTIVE ? "opacity-50" : ""} relative cursor-pointer elevate flex flex-col gap-4 p-5 rounded-md shadow-md bg-theme-background-elevate hover:bg-theme-button-elevate`}
    >
      {isNew && <Ribbon message="New" />}

      <div className="flex gap-4 items-center overflow-hidden mb-1">
        <Image src={"/assets/client.svg"} alt="img" height={50} width={50} />
        <div>
          <h4 className="text-theme-secondary font-semibold  text-ellipsis">
            {userName}
          </h4>
          <h4 className="text-theme-secondary whitespace-nowrap text-ellipsis">
            {userEmail}
          </h4>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t-[1.7px] border-theme-gray-border pt-4">
        <div className="flex items-center gap-2">
          <Icon
            icon={_building}
            size="sm"
            theme="secondary"
            iconType="outline"
            className="[&>svg]:!stroke-orange-500"
          />
          <span className="text-sm text-theme-secondary capitalize">
            {customerName ?? "-"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Icon
            icon={_phone}
            size="sm"
            theme="secondary"
            iconType="outline"
            className="[&>svg]:!stroke-emerald-500"
          />
          <span className="text-sm text-theme-secondary">
            {userContactNo ?? "-"}
          </span>
        </div>
      </div>
      <div className="flex justify-end items-center gap-1">
        <Icon icon={user} theme="secondary" size="sm" />
        {salesPerson ? (
          <h4 className="text-theme-secondary text-sm">{salesPerson}</h4>
        ) : (
          <h4 className="text-theme-secondary-500 text-sm">
            {"Not yet assigned"}
          </h4>
        )}
      </div>
    </div>
  );
}

export default Customer;
