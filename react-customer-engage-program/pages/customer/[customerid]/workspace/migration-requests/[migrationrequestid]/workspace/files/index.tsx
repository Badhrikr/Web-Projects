import { Context } from "vm";
import MigrationRequestWorkspaceLayout from "../../../../../../../../layouts/migration-request-workspace";
import FilesContainer from "../../../../../../../../modules/migration-request-workspace/components/files";

function MigrationRequestFilesPage({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  return (
    <div className="py-5">
      <FilesContainer migrationRequestId={migrationRequestId} />
    </div>
  );
}

MigrationRequestFilesPage.getInitialProps = async (context: Context) => {
  const { query } = context;
  return {
    migrationRequestId: query.migrationrequestid,
  };
};

MigrationRequestFilesPage.PageLayout = MigrationRequestWorkspaceLayout;
export default MigrationRequestFilesPage;
