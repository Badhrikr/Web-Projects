import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  action,
  expand,
  file,
  group,
  horizontal_more,
  minus,
  timeline,
} from "../../../../helpers/icons";
import useOutsideClick from "../../../../hooks/use-outside-click";
import Icon from "../../../../ui-components/Icon";
import { NavigationTabs } from "../../enums";
import { NavigationBarProps } from "./model";

function NavigationBar({
  onTabChange,
  hideActions = false,
  hasReadonlyAccess = false,
}: NavigationBarProps) {
  const [activeTab, setActiveTabs] = useState<NavigationTabs>(
    NavigationTabs.ACTION
  );
  const [showMore, setShowMore] = useState(false);

  const [ref] = useOutsideClick(() => setShowMore(false));

  const tabChangeHandler = (newActiveTab: NavigationTabs) => {
    setActiveTabs(newActiveTab);
  };

  const showMoreToggle = () => {
    setShowMore((prev) => !prev);
  };

  useEffect(() => {
    if (hasReadonlyAccess === false) return;

    setActiveTabs(NavigationTabs.TIMELINE);
  }, [hasReadonlyAccess]);

  useEffect(() => {
    onTabChange?.(activeTab);
  }, [activeTab]);

  return (
    <div className="w-full flex gap-4 items-center justify-end bg-theme-background-elevate py-2 px-2">
      {hideActions === false && (
        <div
          onClick={() => tabChangeHandler(NavigationTabs.ACTION)}
          className="flex flex-col items-center gap-2 cursor-pointer relative"
        >
          <Icon icon={action} size="md" theme="secondary" iconType="solid" />
          <span className="text-theme-secondary text-xs">Action</span>
          {activeTab === NavigationTabs.ACTION && (
            <span className="w-full h-[3px] bg-[#5A8DF7] absolute -bottom-1"></span>
          )}
        </div>
      )}

      <div
        onClick={() => tabChangeHandler(NavigationTabs.TIMELINE)}
        className="flex flex-col items-center gap-2 cursor-pointer relative"
      >
        <Icon icon={timeline} size="md" theme="secondary" iconType="solid" />
        <span className="text-theme-secondary text-xs">Timeline</span>
        {activeTab === NavigationTabs.TIMELINE && (
          <span className="w-full h-[3px] bg-[#5A8DF7] absolute -bottom-1"></span>
        )}
      </div>

      <div
        onClick={() => tabChangeHandler(NavigationTabs.MEMBERS)}
        className="flex flex-col items-center gap-2 cursor-pointer relative"
      >
        <Icon icon={group} size="md" theme="secondary" iconType="solid" />
        <span className="text-theme-secondary text-xs">Members</span>
        {activeTab === NavigationTabs.MEMBERS && (
          <span className="w-full h-[3px] bg-[#5A8DF7] absolute -bottom-1"></span>
        )}
      </div>

      <div
        onClick={() => tabChangeHandler(NavigationTabs.FILES)}
        className="flex flex-col items-center gap-2 cursor-pointer relative"
      >
        <Icon icon={file} size="md" theme="secondary" iconType="solid" />
        <span className="text-theme-secondary text-xs">Files</span>
        {activeTab === NavigationTabs.FILES && (
          <span className="w-full h-[3px] bg-[#5A8DF7] absolute -bottom-1"></span>
        )}
      </div>

      <div
        ref={ref}
        onClick={showMoreToggle}
        className="flex flex-col items-center gap-2 cursor-pointer relative"
      >
        <Icon
          icon={horizontal_more}
          size="md"
          theme="secondary"
          iconType="solid"
        />
        <span className="text-theme-secondary text-xs">More</span>

        <CSSTransition
          in={showMore}
          classNames="fly"
          timeout={300}
          unmountOnExit
        >
          <div className="px-2 py-4 flex flex-col gap-4 rounded-md bg-theme-background-elevate absolute top-14 z-10 right-0">
            <div
              onClick={() =>
                tabChangeHandler(NavigationTabs.LEAVE_CONVERSATION)
              }
              className="flex items-center gap-2 cursor-pointer relative"
            >
              <Icon
                icon={minus}
                size="md"
                theme="secondary"
                iconType="outline"
              />
              <span className="text-theme-secondary text-xs whitespace-nowrap">
                Leave this Conversation
              </span>
            </div>

            <div
              onClick={() => tabChangeHandler(NavigationTabs.FULL_SCREEN)}
              className="flex items-center gap-2 cursor-pointer relative"
            >
              <Icon
                icon={expand}
                size="md"
                theme="secondary"
                iconType="outline"
              />
              <span className="text-theme-secondary text-xs whitespace-nowrap">
                Enter/Exit Full Screen
              </span>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default NavigationBar;
