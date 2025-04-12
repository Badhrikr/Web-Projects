import Image from "next/image";
import { useRouter } from "next/router";
import isBrowser from "../../helpers/is-browser";
import Button from "../../ui-components/Button";

function Error404Page() {
  const router = useRouter();

  const goToHomeHandler = () => {
    if (!isBrowser()) return;

    if (window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex-1 h-screen w-full flex-center-center flex-col !gap-4 bg-theme-background-primary">
      <Image src={"/assets/404.svg"} alt="Not found" height={300} width={300} />
      <h3 className="font-primary font-semibold text-xl text-theme-secondary">
        Requested Page Not Found
      </h3>
      <Button
        onClick={goToHomeHandler}
        className="mt-2"
        size="md"
        theme="primary"
      >
        Go to home
      </Button>
    </div>
  );
}

export default Error404Page;
