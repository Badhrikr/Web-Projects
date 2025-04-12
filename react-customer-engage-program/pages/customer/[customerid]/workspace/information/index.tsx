import React from "react";
import { Context } from "vm";
import CustomerWorkspaceLayout from "../../../../../layouts/customer-workspace-layout";
import CustomerInformationContainer from "../../../../../modules/customer-workspace/components/customer-information";

function CustomerInformationPage({ customerId }: { customerId: string }) {
  return (
    <div className="py-4">
      <CustomerInformationContainer customerId={customerId} />
    </div>
  );
}

CustomerInformationPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  console.log(query);

  return {
    customerId: query.customerid,
  };
};

CustomerInformationPage.PageLayout = CustomerWorkspaceLayout;
export default CustomerInformationPage;
