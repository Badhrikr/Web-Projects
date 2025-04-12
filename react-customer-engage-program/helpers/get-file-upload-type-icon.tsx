import {
  FileUploadType,
  NormalFileUploadType,
  SignedFileUploadType,
} from "../modules/migration-request-workspace/enums";
import Icon from "../ui-components/Icon";
import {
  artifacts,
  bulb,
  cart,
  code,
  protected_route,
  settings,
  timeline,
  unknown_file,
} from "./icons";

export function getFileUploadTypeIcon(uploadType: FileUploadType) {
  switch (uploadType) {
    case NormalFileUploadType.PROPOSAL:
      return (
        <Icon
          icon={bulb}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#E9B412]"
        />
      );
    case NormalFileUploadType.SOURCE_CODE:
    case NormalFileUploadType.POC_SOURCECODE:
      return (
        <Icon
          icon={code}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#629BF1]"
        />
      );
    case NormalFileUploadType.TIMELINES:
      return (
        <Icon
          icon={timeline}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#EA5938]"
        />
      );
    case NormalFileUploadType.FUNCTIONAL_WALKTHROUGH:
      return (
        <Icon
          icon={settings}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#14A6B4]"
        />
      );
    case NormalFileUploadType.ARTIFACTS:
      return (
        <Icon
          icon={artifacts}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#C6A144]"
        />
      );
    case SignedFileUploadType.POC_NDA:
      return (
        <Icon
          icon={protected_route}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#B59D20]"
        />
      );
    case SignedFileUploadType.PROJECT_NDA:
      return (
        <Icon
          icon={protected_route}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#3CCA2F]"
        />
      );
    case NormalFileUploadType.PURCHASE_ORDER:
      return (
        <Icon
          icon={cart}
          theme="secondary"
          iconType="solid"
          size="lg"
          className="[&>svg]:!fill-[#EA5938]"
        />
      );
    default:
      return (
        <Icon
          icon={unknown_file}
          theme="secondary"
          size="lg"
          iconType="solid"
          className="[&>svg]:!fill-[#BFA9AC]"
        />
      );
  }
}
