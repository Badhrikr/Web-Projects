import React from "react";
import { Context } from "vm";
import CustomerWorkspaceLayout from "../../../../../layouts/customer-workspace-layout";
import MigrationRequestsContainer from "../../../../../modules/customer-workspace/components/migration-requests/migration-requests-container";

function MigrationRequest({ customerId }: { customerId: string }) {
  return (
    <div className="h-full py-5">
      <MigrationRequestsContainer customerId={customerId} />
    </div>
  );
}

MigrationRequest.getInitialProps = async (context: Context) => {
  const { query } = context;

  return {
    customerId: query.customerid,
  };
};

MigrationRequest.PageLayout = CustomerWorkspaceLayout;
export default MigrationRequest;
