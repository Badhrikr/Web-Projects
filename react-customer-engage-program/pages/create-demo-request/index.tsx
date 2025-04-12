import Image from "next/image";
import { useRouter } from "next/router";
import { arrow_left, phone, tick_circle } from "../../helpers/icons";
import HomeLayout from "../../layouts/home-layout";
import DemoRequest from "../../modules/request/components/demo-request";
import Icon from "../../ui-components/Icon";
import IconButton from "../../ui-components/IconButton";

function CreateDemoRequestPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center pt-10">
      <div className="pl-4">
        <IconButton
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={() => router.push("/")}
        >
          <Icon icon={arrow_left} size="md" theme="secondary" />
        </IconButton>
      </div>

      <div className="w-full flex">
        <div className="flex-1">
          <DemoRequest />
        </div>

        <div className="flex-1 hidden lg:flex items-start justify-center self-center">
          <div className="h-3/4 sticky top-0 flex flex-col gap-6">
            <Image
              src={"/assets/demo-request-info.svg"}
              alt="loading"
              height={530}
              width={530}
            />

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <Icon
                  icon={tick_circle}
                  size="lg"
                  theme="secondary"
                  className="[&>svg]:!stroke-[#007F7E]"
                />
                <p className="text-theme-secondary font-semibold tracking-wide">
                  Please make sure to provide accurate contact information.
                </p>
              </div>

              <div className="px-1 flex gap-2 items-center">
                <Icon
                  icon={phone}
                  size="md"
                  theme="secondary"
                  className="[&>svg]:!stroke-[#007F7E]"
                />
                <p className="text-theme-secondary font-semibold tracking-wide">
                  We will contact you within 1 or 2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateDemoRequestPage.PageLayout = HomeLayout;
export default CreateDemoRequestPage;
