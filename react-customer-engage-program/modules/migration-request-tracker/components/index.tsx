import { useEffect, useRef, useState } from "react";
import { NavigationTabs } from "../enums";
import ConversationContainer from "./conversation-container";
import ConversationMembers from "./conversation-members";
import NavigationBar from "./navigation-bar";
import ProcessActions from "./process-actions";
import ProcessTimeline from "./process-timeline";
import UploadedFiles from "./uploaded-files";
import useLogin from "../../../hooks/use-login";
import * as Services from "../services";
import Loading from "../../../ui-components/Loading";
import { toast } from "react-toastify";

function MigrationRequestTrackerContainer({
  migrationRequestId,
  customerId,
}: {
  migrationRequestId: string;
  customerId: string;
}) {
  const [activeTab, setActiveTab] = useState<NavigationTabs>(
    NavigationTabs.ACTION
  );

  const { authenticated, email } = useLogin();

  const [fetching, setFetching] = useState(true);
  const [hasReadonlyAccess, setHasReadonlyAccess] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const tabChangeHandler = (tab: NavigationTabs) => {
    if (tab === NavigationTabs.FULL_SCREEN) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        ref.current?.requestFullscreen();
      }
      return;
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!authenticated) return;

    Services.GetMembers({
      migrationRequestId,
      success(response) {
        setFetching(false);
        setHasReadonlyAccess(
          !response.some((user) => user.userEmail === email)
        );
      },
      error() {
        toast.error("Error Occurred");
      },
    });
  }, [authenticated]);

  if (fetching) {
    return (
      <div className="flex-center-center h-full">
        <Loading size="sm" theme="secondary" />
        <span className="text-theme-secondary">Loading</span>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex gap-3 h-full bg-theme-background-primary">
      <div className="flex flex-col gap-2 flex-1 pb-3">
        <NavigationBar
          hideActions={hasReadonlyAccess}
          onTabChange={tabChangeHandler}
          hasReadonlyAccess={hasReadonlyAccess}
        />
        <ConversationContainer
          readOnlyAccess={hasReadonlyAccess}
          migrationRequestId={migrationRequestId}
        />
      </div>

      <div className="min-w-[23%] bg-theme-background-elevate rounded-md px-3 py-2">
        <div className="overflow-y-auto">
          {activeTab === NavigationTabs.ACTION &&
            hasReadonlyAccess === false && (
              <ProcessActions migrationRequestId={migrationRequestId} />
            )}
        </div>
        <div className="block">
          {activeTab === NavigationTabs.TIMELINE && (
            <ProcessTimeline migrationRequestId={migrationRequestId} />
          )}
        </div>
        <div className="overflow-y-auto">
          {activeTab === NavigationTabs.FILES && (
            <UploadedFiles migrationRequestId={migrationRequestId} />
          )}
        </div>
        <div className="overflow-y-auto">
          {activeTab === NavigationTabs.MEMBERS && (
            <ConversationMembers
              customerId={customerId}
              migrationRequestId={migrationRequestId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MigrationRequestTrackerContainer;
