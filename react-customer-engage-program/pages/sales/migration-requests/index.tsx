import React from "react";
import SalesLayout from "../../../layouts/sales-layout";
import MigrationRequestsContainer from "../../../modules/sales/components/migration-requests/migration-requests-container";

function MigrationRequest() {
  return (
    <div className="max-h-auto font-primary flex flex-col gap-5">
      <div>
        <MigrationRequestsContainer />
      </div>
    </div>
  );
}

MigrationRequest.PageLayout = SalesLayout;
export default MigrationRequest;
