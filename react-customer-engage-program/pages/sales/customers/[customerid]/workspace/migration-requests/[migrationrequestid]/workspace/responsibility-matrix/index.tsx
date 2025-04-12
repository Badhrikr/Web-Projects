import React from "react";
import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../../layouts/migration-request-workspace";
import ResponsibilityMatrixContainer from "../../../../../../../../../modules/migration-request-workspace/components/responsibility-matrix";

function ResponsibilityMatrixPage({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  return (
    <div className="py-5">
      <ResponsibilityMatrixContainer migrationRequestId={migrationRequestId} />
    </div>
  );
}

ResponsibilityMatrixPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return {
    migrationRequestId: query.migrationrequestid,
  };
};

ResponsibilityMatrixPage.PageLayout = MigrationRequestWorkspaceLayout;
export default ResponsibilityMatrixPage;
