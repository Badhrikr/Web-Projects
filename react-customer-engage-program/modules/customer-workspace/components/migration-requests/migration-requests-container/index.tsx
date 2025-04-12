import { useEffect, useState } from "react";
import { plus } from "../../../../../helpers/icons";
import useLogin from "../../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../../shared/enums";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetMigrationRequestsForCustomerResponse } from "../../../services/model.response";
import MigrationRequestWidget from "../migration-request-widget";
import { useRouter } from "next/router";

function MigrationRequestsContainer({ customerId }: { customerId: string }) {
  const router = useRouter();
  const { roles } = useLogin();
  const isCustomer = roles?.includes(ApplicationRoles.CUSTOMER) ?? false;

  const [fetching, setFetching] = useState(true);
  const [migrationRequests, setMigrationRequests] = useState<
    GetMigrationRequestsForCustomerResponse[]
  >([]);

  const createNewEngagementHandler = () => {
    if (isCustomer) {
      router.push({
        pathname: "/customer/[customerid]/workspace/migration-requests/create",
        query: { customerid: customerId },
      });
    }
  };

  const fetchSuccess = (
    response: GetMigrationRequestsForCustomerResponse[]
  ) => {
    if (!(response instanceof Array)) return;

    if (isCustomer && response.length === 0) {
      createNewEngagementHandler();
    }

    setMigrationRequests(response);
    setFetching(false);
  };

  const fetchError = (err: any) => {
    console.log(err);
    setFetching(false);
  };

  useEffect(() => {
    setFetching(true);

    Services.GetMigrationRequestsForCustomer({
      customerId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  if (fetching) {
    return (
      <div className="flex-center-center">
        <Loading size="lg" theme="secondary" />
        <span className="text-theme-secondary">Loading</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-4 gap-7">
      <h3 className="text-xl font-semibold text-theme-secondary">
        Migration Requests
      </h3>

      {migrationRequests.length === 0 ? (
        <div className="text-center text-theme-secondary  ">
          No Engagments found for this customer
        </div>
      ) : (
        <div className="flex flex-wrap h-full gap-2 overflow-auto">
          <div className="flex flex-col w-full">
            <div className="grid grid-cols-3 w-full gap-4">
              {migrationRequests.map((migrationRequest) => (
                <div className="col-span-1">
                  <MigrationRequestWidget
                    customerId={customerId}
                    {...migrationRequest}
                  />
                </div>
              ))}
            </div>

            {isCustomer && (
              <div className="absolute right-20 bottom-20">
                <IconButton
                  onClick={createNewEngagementHandler}
                  theme="primary"
                  size="xl"
                >
                  <Icon icon={plus} theme="primary" size="xl" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MigrationRequestsContainer;
