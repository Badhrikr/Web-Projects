import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import sleep from "../../../../../helpers/sleep";
import Button from "../../../../../ui-components/Button";
import Loading from "../../../../../ui-components/Loading";
import Textarea from "../../../../../ui-components/Textarea";
import * as Services from "../../../services";
import { DisqualifyLeadProps } from "./model";

function DisqualifyLead({ leadId }: DisqualifyLeadProps) {
  const router = useRouter();

  const [remarks, setRemarks] = useState("");
  const [disqualifying, setDisqualifying] = useState(false);

  const disqualifySuccess = async () => {
    await sleep(1000);

    setDisqualifying(false);
    toast.success(
      <div>
        <p className="text-red-900 font-medium">Lead Disqualified !! </p>
      </div>,
      { autoClose: 3000 }
    );
    router.back();
  };

  const disqualifyError = () => {
    setDisqualifying(false);
    toast.error("Error Occurred", { autoClose: 3000 });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisqualifying(true);

    Services.QualifyDisqualifyLead({
      leadId: leadId,
      isQualified: false,
      comments: remarks,
      success: disqualifySuccess,
      error: disqualifyError,
    });
  };

  const changeHandler = ({ target }: React.FormEvent<HTMLTextAreaElement>) => {
    setRemarks((target as HTMLTextAreaElement).value);
  };

  return (
    <form onSubmit={submitHandler} className="w-full flex flex-col gap-6">
      <Textarea
        label="Remarks"
        required
        size="md"
        theme="secondary"
        rows={5}
        onChangeEvent={changeHandler}
      />

      <div className="flex justify-end">
        <Button
          size="md"
          theme="primary"
          type="submit"
          className="!bg-red-900"
          disabled={disqualifying}
        >
          {disqualifying ? (
            <div className="flex items-center gap-2">
              <Loading size="sm" theme="secondary" />
              <span>Please wait</span>
            </div>
          ) : (
            "Disqualify"
          )}
        </Button>
      </div>
    </form>
  );
}

export default DisqualifyLead;
