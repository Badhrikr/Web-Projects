import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../../../../ui-components/Button";

function UserRegisteredSuccess({ message }: { message?: string }) {
  const router = useRouter();

  return (
    <div className="h-full w-full flex-center-center flex-col !gap-4">
      <Image src="/assets/warning.svg" alt="warning" height={75} width={75} />
      <h2 className="font-semibold text-lg text-theme-secondary font-primary text-center">
        {message ?? (
          <>
            Thanks for registering. We will buzz you soon in mail. <br />{" "}
            Appreciating your patience.
          </>
        )}
      </h2>
      <Button onClick={() => router.push("/")} size="sm" theme="primary">
        Go to home
      </Button>
    </div>
  );
}

export default UserRegisteredSuccess;
