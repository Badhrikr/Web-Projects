import Image from "next/image";
import { useState, useMemo } from "react";
import { CSSTransition } from "react-transition-group";
import { cancel, tick } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import Radiobutton from "../../../../../ui-components/Radiobutton";
import { RadiobuttonOptions } from "../../../../../ui-components/Radiobutton/model";
import DisqualifyLead from "../disqualify-lead";
import QualifyLead from "../qualify-lead";
import { QualifyDisqualifyLeadProps } from "./model";
import Ripples from "react-ripples";

function QualifyDisqualifyContainer({ leadId }: QualifyDisqualifyLeadProps) {
  const [showQualified, setShowQualified] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center relative h-16">
        <CSSTransition
          in={showQualified}
          classNames="popup"
          timeout={150}
          unmountOnExit
        >
          <Image
            className="absolute"
            src={`/assets/qualified.svg`}
            alt="qualified"
            height={70}
            width={70}
          />
        </CSSTransition>

        <CSSTransition
          in={!showQualified}
          classNames="popup"
          timeout={150}
          unmountOnExit
        >
          <Image
            className="absolute"
            src={`/assets/disqualified.svg`}
            alt="qualified"
            height={70}
            width={70}
          />
        </CSSTransition>
      </div>

      <div className="flex justify-center gap-4">
        <Ripples color="#dedede4d">
          <div
            onClick={() => setShowQualified(true)}
            className={`cursor-pointer px-4 py-1 rounded-md flex-center-center ${
              showQualified ? "bg-[#22a3A3]" : ""
            }`}
          >
            <Icon
              icon={tick}
              theme={showQualified ? "primary" : "secondary"}
              size="md"
            />
            <span
              className={
                showQualified ? "text-theme-primary" : "text-theme-secondary"
              }
            >
              Qualified
            </span>
          </div>
        </Ripples>

        <Ripples color="#dedede4d">
          <div
            onClick={() => setShowQualified(false)}
            className={`cursor-pointer px-4 py-1 rounded-md flex-center-center ${
              !showQualified ? "bg-[#BC4B4B]" : ""
            }`}
          >
            <Icon
              icon={cancel}
              theme={!showQualified ? "primary" : "secondary"}
              size="md"
            />
            <span
              className={
                !showQualified ? "text-theme-primary" : "text-theme-secondary"
              }
            >
              Disqualified
            </span>
          </div>
        </Ripples>
      </div>

      {showQualified ? (
        <QualifyLead leadId={leadId} />
      ) : (
        <DisqualifyLead leadId={leadId} />
      )}
    </div>
  );
}

export default QualifyDisqualifyContainer;
