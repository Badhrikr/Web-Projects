import React from "react";
import { Context } from "vm";
import CustomerWorkspaceLayout from "../../../../../../layouts/customer-workspace-layout";
import MigrationRequestsContainer from "../../../../../../modules/customer-workspace/components/migration-requests/migration-requests-container";

function MigrationRequests({ customerId }: { customerId: string }) {
  return (
    <div className="h-full py-5">
      <MigrationRequestsContainer customerId={customerId} />
    </div>
  );
}

MigrationRequests.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    customerId: query.customerid,
  };
};

MigrationRequests.PageLayout = CustomerWorkspaceLayout;
export default MigrationRequests;
