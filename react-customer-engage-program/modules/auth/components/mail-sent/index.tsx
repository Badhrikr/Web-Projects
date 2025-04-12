import Image from "next/image";
import { MailSentProps } from "./model";

function MailSent(props: MailSentProps) {
  const { email } = props;

  return (
    <div className="font-secondary py-10 flex flex-col gap-10 justify-center items-center">
      <Image
        src="/assets/mail-sent.svg"
        alt="Mail-Sent"
        height={120}
        width={120}
      />
      <div className="flex flex-col items-center justify-center gap-2 text-theme-secondary">
        <span className="font-semibold text-theme-secondary">
          We have sent you the activation link to your email
        </span>
        <span className="font-medium text-theme-secondary"> {email} </span>
      </div>
    </div>
  );
}

export default MailSent;
