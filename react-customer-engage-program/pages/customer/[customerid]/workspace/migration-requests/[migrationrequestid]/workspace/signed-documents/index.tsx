import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../layouts/migration-request-workspace";
import SignedFilesContainer from "../../../../../../../../modules/migration-request-workspace/components/signed-documents";

function MigrationRequestSignedDocumentsPage({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  return (
    <div className="py-5">
      <SignedFilesContainer migrationRequestId={migrationRequestId} />
    </div>
  );
}

MigrationRequestSignedDocumentsPage.getInitialProps = async (
  context: Context
) => {
  const { query } = context;
  return {
    migrationRequestId: query.migrationrequestid,
  };
};

MigrationRequestSignedDocumentsPage.PageLayout =
  MigrationRequestWorkspaceLayout;
export default MigrationRequestSignedDocumentsPage;
