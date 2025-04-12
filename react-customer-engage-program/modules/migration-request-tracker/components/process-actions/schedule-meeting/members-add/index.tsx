import { useMemo, useRef, useState } from "react";
import useOutsideClick from "../../../../../../hooks/use-outside-click";
import Input from "../../../../../../ui-components/Input";
import { GetMembersResponse } from "../../../../services/model.response";
import { MembersAddProps } from "./model";

function MembersAdd({
  members,
  addedMembers,
  onMemberAdd,
  onLastPersonRemove,
}: MembersAddProps) {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [ref] = useOutsideClick(() => {
    setShowSuggestions(false);
  });

  const suggestions = useMemo(() => {
    const addedMembersIds = addedMembers.map(
      (addedMember) => addedMember.userId
    );
    return members.filter((member) => {
      return (
        !addedMembersIds.includes(member.userId) &&
        (searchText.length === 0 ||
          `${member.firstName} ${member.lastName}`
            .toLowerCase()
            .includes(searchText.toLowerCase()))
      );
    });
  }, [members, addedMembers, searchText]);

  const showSuggestionsToggle = () => {
    setShowSuggestions((prev) => !prev);
  };

  const memberSelectHandler = (member: GetMembersResponse) => {
    onMemberAdd?.(member);
    setShowSuggestions(false);
    setSearchText("");
  };

  const keyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (searchText.length === 0) {
        onLastPersonRemove?.();
      }
    }
  };

  return (
    <div className="relative min-w-[30%] flex-1" ref={ref}>
      <Input
        size="sm"
        theme="secondary"
        inputStyle="ghost"
        placeholder="Add Member"
        value={searchText}
        onChangeEvent={(e) => {
          setSearchText((e?.target as HTMLInputElement).value);
        }}
        onKeydownEvent={keyUpHandler}
        onFocusEvent={showSuggestionsToggle}
      />

      {(searchText.length > 0 || showSuggestions) && (
        <div className="absolute w-[300px] bottom-10 left-0 right-0 py-2 max-h-[250px] overflow-x-auto z-20 whitespace-nowrap text-ellipsis overflow-y-auto rounded-md bg-theme-background-popup">
          <div className="h-full w-full p-4 flex flex-col gap-4 bg-theme-button-elevate rounded-md">
            {suggestions.length > 0 &&
              suggestions.map((member) => (
                <button
                  className="text-left cursor-pointer"
                  onClick={() => {
                    memberSelectHandler(member);
                  }}
                >
                  <h4 className="text-sm text-theme-secondary font-medium">
                    {member.firstName} {member.lastName}
                  </h4>
                  <h4 className="text-sm text-theme-secondary-550">
                    {member.userEmail}
                  </h4>
                </button>
              ))}

            {suggestions.length === 0 && (
              <h4 className="text-theme-secondary text-sm">No users found</h4>
            )}
          </div>
        </div>
      )}

      <div></div>
    </div>
  );
}

export default MembersAdd;
