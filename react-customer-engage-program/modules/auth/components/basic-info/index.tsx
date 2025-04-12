import { right_arrow } from "../../../../helpers/icons";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Input from "../../../../ui-components/Input";

function BasicInfo() {
  return (
    <div className="px-6 py-8 flex flex-col gap-y-8">
      <h2 className="font-secondary font-semibold text-theme-secondary text-lg">
        Please spend few seconds to provide these <br /> basic information to
        continue
      </h2>

      <form className="flex flex-col gap-5">
        <Input
          label="First Name"
          size="md"
          theme="secondary"
          iconType="outline"
          required
        />
        <Input
          label="Last Name"
          size="md"
          theme="secondary"
          iconType="outline"
          required
        />
        <Input
          label="Email Address"
          size="md"
          theme="secondary"
          iconType="outline"
          required
        />

        <Button size="md" theme="primary" className="w-full" type="submit">
          <div className="flex-center-center">
            <span>Continue</span>
            <Icon icon={right_arrow} size="md" theme="primary" />
          </div>
        </Button>
      </form>
    </div>
  );
}

export default BasicInfo;
