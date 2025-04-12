import Image from "next/image";
import React, { useState } from "react";
import MeetingDetails from "../meeting-details";
import { DefaultSchedulerProps } from "./model";
import Toggle from "../../../../../../ui-components/Toggle";
import * as Services from "../../../../services";
import { MeetingDetailsData } from "../meeting-details/model";
import { GetMembersResponse } from "../../../../services/model.response";
import moment from "moment";
import { toast } from "react-toastify";

function DefaultScheduler({
  migrationRequestId,
  onCancel,
  onSubmit,
}: DefaultSchedulerProps) {
  const [sendEmail, setSendEmail] = useState(true);
  const [scheduling, setScheduling] = useState(false);

  const storeDetailsSuccess = () => {
    setScheduling(false);
    onSubmit?.();
  };

  const storeDetailsError = () => {
    toast.error("Error Scheduling Meeting");
    setScheduling(false);
  };

  const submitHandler = (
    meetingDetails: MeetingDetailsData,
    addedMembers: GetMembersResponse[]
  ) => {
    setScheduling(true);

    Services.CreateMeeting({
      agenda: meetingDetails.subject,
      description: meetingDetails.description,
      startDate: moment(
        new Date(`${meetingDetails.startDate}T${meetingDetails.startTime}`)
      ).format("YYYY-MM-DD HH:MM"),
      endDate: moment(
        new Date(`${meetingDetails.endDate}T${meetingDetails.endTime}`)
      ).format("YYYY-MM-DD HH:MM"),
      members: addedMembers.map((addedMember) => ({
        useremail: addedMember.userEmail,
        userid: addedMember.userId,
        username: `${addedMember.firstName} ${addedMember.lastName}`,
      })),
      migrationRequestId: migrationRequestId,
      sendEmail,
      success: storeDetailsSuccess,
      error: storeDetailsError,
    });
  };

  const sendEmailToggle = () => {
    setSendEmail((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <Image src={"/favicon.ico"} alt="teams" height={25} width={25} />
        <h1 className="text-theme-secondary text-xl font-medium">
          Meeting Scheduler
        </h1>
      </div>

      <div className="flex justify-end">
        <Toggle
          size="xs"
          theme="primary"
          checked={sendEmail}
          onChange={sendEmailToggle}
        >
          <span className="text-theme-secondary text-sm">Send Email</span>
        </Toggle>
      </div>

      <div>
        <MeetingDetails
          onCancel={onCancel}
          onSubmit={submitHandler}
          migrationRequestId={migrationRequestId}
          loading={scheduling}
        />
      </div>
    </div>
  );
}

export default DefaultScheduler;
