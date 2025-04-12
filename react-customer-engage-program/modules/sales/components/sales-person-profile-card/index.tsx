import ConversationLogo from "../../../migration-request-tracker/components/conversation-container/conversation-logo";
import { SalesPersonProfileCardProps } from "./model";

function SalesPersonProfileCard({
  firstName,
  lastName,
  email,
  onPersonSelect,
}: SalesPersonProfileCardProps) {
  const selectHandler = () => {
    onPersonSelect?.({ firstName, lastName, email });
  };

  return (
    <div
      onClick={selectHandler}
      className="flex items-center gap-2 cursor-pointer hover:bg-theme-button-elevate"
    >
      <div>
        <ConversationLogo userName={firstName + " " + lastName} />
      </div>

      <div className="flex flex-col px-2 py-1">
        <span className="font-medium capitalize text-theme-secondary">
          {firstName} {lastName}
        </span>
        <span className="font-medium text-theme-secondary-550">{email}</span>
      </div>
    </div>
  );
}

export default SalesPersonProfileCard;
