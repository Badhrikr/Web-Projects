import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import sleep from "../../../../../helpers/sleep";
import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import Modal from "../../../../../ui-components/Modal";
import Textarea from "../../../../../ui-components/Textarea";
import * as Services from "../../../services";
import AssignPreSalesPerson from "../../assign-presales-person";
import { QualifyLeadProps } from "./model";

function QualifyLead({ leadId }: QualifyLeadProps) {
  const router = useRouter();

  const [followupDetails, setFollowupDetails] = useState({
    followUpDate: new Date().toISOString().slice(0, 10),
    comments: "",
  });
  const [qualifying, setQualifying] = useState(false);
  const [showPreSalesPersonPopup, setShowPreSalesPersonPopup] = useState(false);

  const qualifySuccess = async () => {
    await sleep(1000);

    setQualifying(false);
    toast.success("Lead Qualified", { autoClose: 3000 });
    router.back();
  };

  const qualifyError = () => {
    setQualifying(false);
    toast.error("Error Occurred", { autoClose: 3000 });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreSalesPersonPopup(true);
  };

  const qualifyHandler = (preSalesPerson: GetSalesPersonsResponse) => {
    setQualifying(true);
    Services.QualifyDisqualifyLead({
      leadId,
      isQualified: true,
      comments: followupDetails.comments,
      followUpDate: followupDetails.followUpDate,
      preSalesPerson: preSalesPerson.email,
      success: qualifySuccess,
      error: qualifyError,
    });
  };

  const changeHandler = ({ target }: React.FormEvent<HTMLTextAreaElement>) => {
    const id = (target as HTMLTextAreaElement).id;
    const value = (target as HTMLTextAreaElement).value;
    setFollowupDetails((prevFollowupDetails) => {
      return { ...prevFollowupDetails, [id]: value };
    });
  };

  const assignPopupToggle = () => {
    setShowPreSalesPersonPopup(!showPreSalesPersonPopup);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-6">
        <Input
          id="followUpDate"
          label="Followup Date"
          required
          size="md"
          theme="secondary"
          type="date"
          value={new Date().toISOString().slice(0, 10)}
          onChangeEvent={changeHandler}
        />

        <Textarea
          id="comments"
          label="Remarks"
          required
          size="md"
          theme="secondary"
          rows={5}
          onChangeEvent={changeHandler}
        />

        <div className="flex justify-end">
          <Button size="md" theme="primary" type="submit" disabled={qualifying}>
            <span>Qualify</span>
          </Button>
        </div>
      </form>

      <Modal
        isOpen={showPreSalesPersonPopup}
        close={assignPopupToggle}
        closeOnEsc
      >
        <div className="py-5 px-5 flex flex-col gap-4">
          <AssignPreSalesPerson
            onSubmit={qualifyHandler}
            onCancel={assignPopupToggle}
            loading={qualifying}
          />
        </div>
      </Modal>
    </>
  );
}

export default QualifyLead;
