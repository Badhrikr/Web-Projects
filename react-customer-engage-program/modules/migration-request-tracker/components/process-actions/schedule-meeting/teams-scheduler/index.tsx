import Image from "next/image";
import CheckLoggedIn from "../check-logged-in";
import MeetingDetails from "../meeting-details";
import { TeamsSchedulerProps } from "./model";
import { MeetingDetailsData } from "../meeting-details/model";
import * as Services from "../../../../services";
import moment from "moment";
import { GetMembersResponse } from "../../../../services/model.response";
import { useState } from "react";
import { toast } from "react-toastify";

function TeamsScheduler({
  migrationRequestId,
  onSubmit,
  onCancel,
}: TeamsSchedulerProps) {
  const [scheduling, setScheduling] = useState(false);

  const scheduleMeeting = async (
    meetingDetails: MeetingDetailsData,
    addedMembers: GetMembersResponse[]
  ) => {
    const data = {
      subject: meetingDetails.subject,
      body: {
        contentType: "HTML",
        content: meetingDetails.description,
      },
      start: {
        dateTime: new Date(
          `${meetingDetails.startDate}T${meetingDetails.startTime}`
        ),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(
          `${meetingDetails.endDate}T${meetingDetails.endTime}`
        ),
        timeZone: "UTC",
      },
      attendees: addedMembers.map((addedMember) => ({
        emailAddress: {
          address: addedMember.userEmail,
          name: `${addedMember.firstName} ${addedMember.lastName}`,
        },
        type: "required",
      })),
    };

    const Providers = (await import("@microsoft/mgt-element")).Providers;
    return Providers.client.api("/me/events").post(data);
  };

  const storeDetailsSuccess = () => {
    setScheduling(false);
  };

  const storeDetailsError = () => {
    setScheduling(false);
    toast.error("Error Occurred");
  };

  const scheduleMeetingHandler = (
    meetingDetails: MeetingDetailsData,
    addedMembers: GetMembersResponse[]
  ) => {
    setScheduling(true);

    scheduleMeeting(meetingDetails, addedMembers)
      .then((response) => {
        console.log(response);
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
          sendEmail: false,
          success: storeDetailsSuccess,
          error: storeDetailsError,
        });
      })
      .catch((err) => {
        toast.error("Error Occurred");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-2 items-center">
        <Image
          src={"/assets/microsoft-teams-icon.png"}
          alt="teams"
          height={25}
          width={25}
        />
        <h1 className="text-theme-secondary text-xl font-medium">
          Meeting Scheduler
        </h1>
      </div>

      <div>
        <MeetingDetails
          onCancel={onCancel}
          onSubmit={scheduleMeetingHandler}
          migrationRequestId={migrationRequestId}
          loading={scheduling}
        />
      </div>
    </div>
  );
}

export default CheckLoggedIn(TeamsScheduler);
