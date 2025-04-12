import React, { useEffect, useState, useMemo } from "react";
import { filter_funnel } from "../../../../../helpers/icons";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetAllMigrationRequestsResponse } from "../../../services/model.response";
import MigrationRequestsTable from "../migration-requests-table";

function MigrationRequestsContainer() {
  const [filterText, setFilterText] = useState("");
  const [fetching, setFetching] = useState(true);
  const [migrationRequests, setMigrationRequests] = useState<
    GetAllMigrationRequestsResponse[]
  >([]);

  // TODO Filter
  const filteredMigrationRequests = useMemo(
    () => migrationRequests,
    [migrationRequests, filterText]
  );

  const filterTextChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText((e.target as HTMLInputElement).value);
    setFetching(false);
  };

  const fetchSuccess = (response: GetAllMigrationRequestsResponse[]) => {
    setMigrationRequests(response);
    setFetching(false);
  };

  const fetchError = () => {};

  useEffect(() => {
    setFetching(true);

    Services.GetAllMigrationRequests({
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-7">
      <div className="mt-1">
        <Input
          size="sm"
          theme="primary"
          icon={filter_funnel}
          placeholder="Filter by keyword"
          value={filterText}
          onChangeEvent={filterTextChangeHandler}
        />
      </div>

      <div>
        {fetching ? (
          <div className="flex-center-center">
            <Loading size="lg" theme="secondary" />
            <span className="text-theme-secondary">Loading</span>
          </div>
        ) : (
          <MigrationRequestsTable
            migrationRequests={filteredMigrationRequests}
          />
        )}
      </div>
    </div>
  );
}

export default MigrationRequestsContainer;
