import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import sleep from "../../../../../helpers/sleep";
import Button from "../../../../../ui-components/Button";
import Dropdown from "../../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../../ui-components/DropdownOption/model";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import Textarea from "../../../../../ui-components/Textarea";
import { Status } from "../../../enums";
import * as Services from "../../../services";
import { AddFollowupProps } from "./model";

function AddFollowup({ leadId }: AddFollowupProps) {
  const router = useRouter();

  const [addingFollowup, setAddingFollowup] = useState(false);
  const [followupDetails, setFollowupDetails] = useState({
    status: Status.ACTIVE,
    leadId: leadId,
    followUpDate: new Date().toISOString().slice(0, 10),
    comments: "",
  });

  const statusOptions: Array<DropdownOptions> = useMemo(() => {
    return Object.keys(Status)
      .filter((status) => Status[status as keyof typeof Status] !== Status.NEW)
      .map((status) => {
        return {
          label: (
            <div className="flex gap-1 items-center">
              <span
                className={`h-[9px] w-[9px] rounded-full ${
                  /(inactive)/gi.test(status) ? "bg-red-800" : "bg-[#458eff]"
                }`}
              ></span>
              <span className="lowercase first-letter:capitalize ">
                {status}
              </span>
            </div>
          ),
          value: Status[status as keyof typeof Status],
        };
      });
  }, []);

  const valueChangeHandler = ({
    target,
  }: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = (target as HTMLInputElement | HTMLTextAreaElement).id;
    const value = (target as HTMLInputElement | HTMLTextAreaElement).value;

    setFollowupDetails((prevDetails) => {
      return {
        ...prevDetails,
        [id]: value,
      };
    });
  };

  const followupAddSuccess = async () => {
    await sleep(1000);
    setAddingFollowup(false);
    toast.success("Followup added");
    router.back();
  };

  const followupAddError = () => {
    setAddingFollowup(false);
    toast.error("Error Occurred");
  };

  const submitHandler = () => {
    setAddingFollowup(true);

    Services.AddFollowUp({
      status: followupDetails.status,
      leadId: leadId,
      followUpDate: followupDetails.followUpDate,
      comments: followupDetails.comments,
      success: followupAddSuccess,
      error: followupAddError,
    });
  };

  return (
    <div className="flex flex-col gap-8 px-4">
      <h3 className="text-theme-secondary-700 font-semibold text-base font-secondary">
        Add Followup
      </h3>

      <div className="flex flex-col gap-7 font-primary">
        <Dropdown
          id="status"
          options={statusOptions}
          value="Active"
          size="md"
          theme="secondary"
          label="Status"
          changeEvent={(value, id) =>
            setFollowupDetails({ ...followupDetails, [id]: value })
          }
        />
        <Input
          id="followUpDate"
          type="date"
          theme="primary"
          size="md"
          value={new Date().toISOString().slice(0, 10)}
          label="Next Followup date"
          onChangeEvent={valueChangeHandler}
        />
        <Textarea
          id="comments"
          label="Remarks (Optional)"
          size="md"
          theme="secondary"
          rows={5}
          onChangeEvent={valueChangeHandler}
        />
      </div>
      <div className="flex justify-end">
        <Button
          theme="primary"
          size="md"
          disabled={addingFollowup}
          onClick={submitHandler}
        >
          {addingFollowup ? (
            <div className="flex items-center gap-2">
              <Loading size="sm" theme="secondary" />
              <span>Please wait</span>
            </div>
          ) : (
            "Submit Followup"
          )}
        </Button>
      </div>
    </div>
  );
}

export default AddFollowup;
