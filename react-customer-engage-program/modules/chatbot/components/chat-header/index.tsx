import Image from "next/image";
import React from "react";

function ChatHeader() {
  return (
    <div className="flex gap-3 items-center w-full p-2">
      <Image src={"/kumaran-logo.png"} alt="Kumaran" height={20} width={20} />
      <div className="flex flex-col text-theme-secondary">
        <span className="font-medium">Query Bot</span>
        <div className="text-sm flex gap-1 items-center">
          <span className="h-[8px] w-[8px] rounded-full bg-green-500"></span>
          <span className="text-theme-secondary-550">online</span>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
