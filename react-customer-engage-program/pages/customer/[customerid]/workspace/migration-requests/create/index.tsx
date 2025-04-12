import { Context } from "vm";
import CustomerWorkspaceLayout from "../../../../../../layouts/customer-workspace-layout";
import CreateMigrationRequestContainer from "../../../../../../modules/customer-workspace/components/create-migration-request";

function CreateMigrationRequestPage({ customerId }: { customerId: string }) {
  return (
    <div className="min-h-full flex flex-col gap-2 items-center justify-center overflow-y-scroll py-5">
      <h2 className="w-full text-center text-theme-secondary text-2xl font-semibold">
        New Engagement
      </h2>
      <CreateMigrationRequestContainer customerId={customerId} />
    </div>
  );
}

CreateMigrationRequestPage.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    customerId: query.customerid,
  };
};

CreateMigrationRequestPage.PageLayout = CustomerWorkspaceLayout;
export default CreateMigrationRequestPage;
