import Button from "../../../../ui-components/Button";
import Input from "../../../../ui-components/Input";

function SetCredentials() {
  return (
    <form className="py-6 flex flex-col gap-5">
      <Input
        label="Email"
        theme="primary"
        size="md"
        value="gowthamcool4ever@gmail.com"
        disabled
      />

      <Input label="Password" size="md" theme="primary" type="password" />

      <Input
        label="Confirm Password"
        size="md"
        theme="primary"
        type="password"
      />

      <Button size="md" theme="primary" className="w-full">
        Complete Registration
      </Button>
    </form>
  );
}

export default SetCredentials;
