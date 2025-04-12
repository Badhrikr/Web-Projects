import React from "react";
import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../../layouts/migration-request-workspace";

function DeliverablesPage({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  return <div>DeliverablesPage</div>;
}

DeliverablesPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return {
    migrationRequestId: query.migrationrequestid,
  };
};

DeliverablesPage.PageLayout = MigrationRequestWorkspaceLayout;
export default DeliverablesPage;
