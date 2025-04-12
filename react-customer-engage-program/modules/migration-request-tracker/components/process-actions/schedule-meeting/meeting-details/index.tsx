import React, { useEffect, useState } from "react";
import Input from "../../../../../../ui-components/Input";
import MembersAdd from "../members-add";
import { GetMembersResponse } from "../../../../services/model.response";
import moment from "moment";
import { MeetingDetailsData, MeetingDetailsProps } from "./model";
import * as Services from "../../../../services";
import IconButton from "../../../../../../ui-components/IconButton";
import Icon from "../../../../../../ui-components/Icon";
import { cancel } from "../../../../../../helpers/icons";
import Button from "../../../../../../ui-components/Button";
import Loading from "../../../../../../ui-components/Loading";

function MeetingDetails({
  migrationRequestId,
  loading,
  onSubmit,
  onCancel,
}: MeetingDetailsProps) {
  const [members, setMembers] = useState<GetMembersResponse[]>([]);
  const [addedMembers, setAddedMembers] =
    useState<GetMembersResponse[]>(members);

  const [meetingDetails, setMeetingDetails] = useState<MeetingDetailsData>({
    subject: "",
    description: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    startTime: moment(new Date()).add(1, "hours").format("HH:mm"),
    endTime: moment(new Date()).add(2, "hours").format("HH:mm"),
  });

  const addMemberHandler = (addedMember: GetMembersResponse) => {
    setAddedMembers([...addedMembers, addedMember]);
  };

  const removeMemberHandler = (memberToRemove: GetMembersResponse) => {
    setAddedMembers((prev) =>
      prev.filter((prevMember) => prevMember.userId !== memberToRemove.userId)
    );
  };

  const lastPersonRemoveHandler = () => {
    setAddedMembers(
      (addedMembers) => addedMembers.slice(0, addedMembers.length - 1) ?? []
    );
  };

  const fetchSuccess = (response: GetMembersResponse[]) => {
    if (!(response instanceof Array)) return;
    setMembers(response);
    setAddedMembers(response);
  };

  const fetchError = () => {};

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(meetingDetails, addedMembers);
  };

  useEffect(() => {
    Services.GetMembers({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-8">
      <Input
        type="text"
        theme="secondary"
        size="md"
        label="Subject"
        inputStyle="bottom-lined"
        required
        onChangeEvent={(e) =>
          setMeetingDetails({
            ...meetingDetails,
            subject: (e?.target as HTMLInputElement).value,
          })
        }
      />
      <Input
        type="text"
        theme="secondary"
        size="md"
        label="Description"
        inputStyle="bottom-lined"
        required
        onChangeEvent={(e) =>
          setMeetingDetails({
            ...meetingDetails,
            description: (e?.target as HTMLInputElement).value,
          })
        }
      />

      <div className="flex flex-wrap gap-2 items-center border-b border-gray-400 pb-4">
        {addedMembers?.map((member) => (
          <div
            title={member.userEmail}
            className="flex overflow-hidden flex-shrink-0 text-ellipsis gap-2 items-center bg-theme-button-elevate text-sm px-2 py-1 rounded-md"
          >
            <span className="text-theme-secondary">
              {member.firstName} {member.lastName}
            </span>
            <IconButton
              onClick={() => removeMemberHandler(member)}
              theme="secondary"
              size="sm"
              className="!shadow-none"
              buttonThemeStyle="ghost"
            >
              <Icon icon={cancel} theme="secondary" size="sm" />
            </IconButton>
          </div>
        ))}

        {addedMembers.length < members.length && (
          <MembersAdd
            members={members}
            addedMembers={addedMembers}
            onMemberAdd={addMemberHandler}
            onLastPersonRemove={lastPersonRemoveHandler}
          />
        )}
      </div>

      <div className="flex gap-4">
        <Input
          type="date"
          theme="secondary"
          size="sm"
          label="Start Date"
          value={meetingDetails.startDate}
          inputStyle="bottom-lined"
          required
          onChangeEvent={(e) =>
            setMeetingDetails({
              ...meetingDetails,
              startDate: (e?.target as HTMLInputElement).value,
            })
          }
        />

        <Input
          type="time"
          theme="secondary"
          size="sm"
          label="Start Time"
          inputStyle="bottom-lined"
          value={meetingDetails.startTime}
          required
          onChangeEvent={(e) =>
            setMeetingDetails({
              ...meetingDetails,
              startTime: (e?.target as HTMLInputElement).value,
            })
          }
        />

        <Input
          type="date"
          theme="secondary"
          size="sm"
          label="End Date"
          value={meetingDetails.endDate}
          inputStyle="bottom-lined"
          required
          min={meetingDetails.startDate}
          onChangeEvent={(e) =>
            setMeetingDetails({
              ...meetingDetails,
              endDate: (e?.target as HTMLInputElement).value,
            })
          }
        />

        <Input
          type="time"
          theme="secondary"
          size="sm"
          label="End Time"
          inputStyle="bottom-lined"
          value={meetingDetails.endTime}
          required
          min={meetingDetails.startTime}
          onChangeEvent={(e) =>
            setMeetingDetails({
              ...meetingDetails,
              endTime: (e?.target as HTMLInputElement).value,
            })
          }
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button
          onClick={onCancel}
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
        >
          Cancel
        </Button>
        <Button size="md" type="submit" theme="primary" disabled={loading}>
          {loading ? (
            <div className="flex-center-center">
              <Loading size="sm" theme="secondary" />
              <span>Scheduling</span>
            </div>
          ) : (
            "Schedule Meeting"
          )}
        </Button>
      </div>
    </form>
  );
}

export default MeetingDetails;
