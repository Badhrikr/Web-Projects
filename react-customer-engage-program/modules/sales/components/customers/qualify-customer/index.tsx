import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import sleep from "../../../../../helpers/sleep";
import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";
import Button from "../../../../../ui-components/Button";
import Loading from "../../../../../ui-components/Loading";
import Textarea from "../../../../../ui-components/Textarea";
import { Status } from "../../../enums";
import * as Services from "../../../services";
import { QualifyCustomerProps } from "./model";

function QualifyCustomer({ customerId }: QualifyCustomerProps) {
  const [remarks, setRemarks] = useState("");
  const [qualifying, setQualifying] = useState(false);

  const router = useRouter();

  const qualifySuccess = async () => {
    await sleep(1000);

    setQualifying(false);
    toast.success("Customer Qualified", { autoClose: 3000 });
    router.back();
  };

  const qualifyError = () => {
    setQualifying(false);
    toast.error("Error Occurred", { autoClose: 3000 });
  };

  const qualifyHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setQualifying(true);

    Services.QualifyDisqualifyCustomer({
      customerId,
      status: Status.ACTIVE,
      comments: remarks,
      success: qualifySuccess,
      error: qualifyError,
    });
  };

  const changeHandler = ({ target }: React.FormEvent<HTMLTextAreaElement>) => {
    setRemarks((target as HTMLTextAreaElement).value);
  };

  return (
    <form onSubmit={qualifyHandler} className="w-full flex flex-col gap-6">
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
        <Button
          size="md"
          theme="primary"
          type="submit"
          disabled={qualifying}
          color="success"
        >
          {qualifying ? (
            <div className="flex items-center gap-2">
              <Loading size="sm" theme="secondary" />
              <span>Please wait</span>
            </div>
          ) : (
            "Qualify this Customer"
          )}
        </Button>
      </div>
    </form>
  );
}

export default QualifyCustomer;
