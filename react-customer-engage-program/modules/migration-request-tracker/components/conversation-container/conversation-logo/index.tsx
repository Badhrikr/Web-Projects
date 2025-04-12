import Image from "next/image";
import { ConversationLogoProps } from "./model";

function ConversationLogo({
  userName,
  showDefault = false,
  className,
}: ConversationLogoProps) {
  const getLogo = () => {
    const _userName: String[] = userName.split(" ");
    return _userName[0].charAt(0) + _userName[_userName.length - 1].charAt(0);
  };

  return showDefault ? (
    <div className={"relative h-[20px] w-[20px] " + className}>
      <Image src={"/kumaran-logo.png"} fill alt="logo" />
    </div>
  ) : (
    <div
      className={`relative font-secondary uppercase font-semibold text-xs h-[30px] w-[30px] text-[#216b21] bg-[#D8EEEC] rounded-full flex-center-center ${className}`}
    >
      {getLogo()}
    </div>
  );
}

export default ConversationLogo;
