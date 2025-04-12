import HomeLayout from "../../layouts/home-layout";
import Register from "../../modules/auth/components/register";

function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/4">
        <Register />
      </div>
    </div>
  );
}

RegisterPage.PageLayout = HomeLayout;

export default RegisterPage;
