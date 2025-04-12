import moment from "moment";
import Image from "next/image";
import Router from "next/router";
import { useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import getActionAvatar from "../../../../../helpers/get-action-avatar";
import { arrow_left, user_circle } from "../../../../../helpers/icons";
import isBrowser from "../../../../../helpers/is-browser";
import { getLeadTrackerData } from "../../../../../helpers/lead-tracker";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import { ExportType } from "../../../../../shared/enums";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Loading from "../../../../../ui-components/Loading";
import Modal from "../../../../../ui-components/Modal";
import { LeadTrackerAction, Status } from "../../../enums";
import * as Services from "../../../services";
import { GetLeadTrackerByIdResponse } from "../../../services/model.response";
import ExportAs from "../export-as";
import ViewAllLeadDetails from "../view-all-lead-details";
import ViewDefaultLeadDetails from "../view-default-lead-details";
import { LeadDetailsHeaderProps } from "./model";

const SVG_PROPS = {
  HEIGHT: 80,
  WIDTH: 80,
  TOTAL_WIDTH: 188,
};

function LeadDetailsHeader(leadDetails: LeadDetailsHeaderProps) {
  const {
    id,
    personalInfo,
    organisationLogo,
    leadType,
    status,
    address,
    requestDetails,
    bussinessDomain,
  } = leadDetails;

  const [showViewAllDetails, setShowViewAllDetails] = useState(false);

  const [exportType, setExportType] = useState<ExportType>(ExportType.PDF);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [exporting, setExporting] = useState(false);

  const profileComplete = useMemo(
    () => ({
      get hexCode(): string {
        if (this.userProfileCompletePercentage <= 50) {
          return "#eed202";
        } else {
          return "#00FF00aa";
        }
      },

      get userProfileCompletePercentage(): number {
        let percentage = 0;
        const TOTAL_FIELDS_LENGTH = 13;
        const checkFields = {
          ...address,
          ...personalInfo,
          organisationLogo,
          bussinessDomain,
        };

        try {
          Object.keys(checkFields).map((key) => {
            if (checkFields[key as keyof typeof checkFields]?.length > 0) {
              percentage += 100 / TOTAL_FIELDS_LENGTH;
            }
          });
        } catch (err) {}

        return Math.round(percentage);
      },

      get strokeDashOffset(): number {
        return (
          SVG_PROPS.TOTAL_WIDTH -
          (this.userProfileCompletePercentage * SVG_PROPS.TOTAL_WIDTH) / 100
        );
      },
    }),
    [leadDetails]
  );

  const [viewAllDetailsContainerRef] = useOutsideClick(() => {
    setShowViewAllDetails(false);
  });

  const viewAllDetailsToggle = () => {
    setShowViewAllDetails((prev) => !prev);
  };

  const exportPopupCancelHandler = () => {
    setShowExportPopup(false);
  };

  const exportTypeChangeHandler = (type: ExportType) => {
    setExportType(type);
  };

  const showExportHandler = () => {
    setShowExportPopup(true);
    setExportType(ExportType.PDF);
  };

  const exportAsPdfHandler = async () => {
    if (!isBrowser()) return;

    const parentDiv = document.createElement("div");
    parentDiv.classList.add(
      ...["flex", "flex-col", "[&>div]:flex-1", "gap-20", "p-10"]
    );

    const leadTracker = (
      document.getElementById("lead-tracker") as HTMLElement
    ).cloneNode(true);

    const leadAllDetails = document.createElement("div");
    leadAllDetails.innerHTML = renderToString(
      <ViewDefaultLeadDetails {...leadDetails} />
    );
    parentDiv.appendChild(leadAllDetails);
    parentDiv.appendChild(leadTracker);

    parentDiv.id = "printarea";
    document.body.appendChild(parentDiv);

    const { firstName, lastName, organisationName } = personalInfo;
    const filename = `${organisationName} ${firstName} ${lastName}`;

    const oldTitle = document.title;
    document.title = filename.replace(/ /, "_");
    window.print();

    document.title = oldTitle;
    document.body.removeChild(parentDiv);

    setExporting(false);
    setShowExportPopup(false);
  };

  const getLeadTrackerDetailsCsvString = (
    data: Array<GetLeadTrackerByIdResponse>
  ): string => {
    const leadTrackerColumnHeading =
      "Action" +
      "," +
      "Sales Person" +
      "," +
      "Remarks" +
      "," +
      "Followup Date" +
      "," +
      "Created Date";

    let leadTrackerData = leadTrackerColumnHeading + "\n";

    for (const row of data) {
      const action = getLeadTrackerData(row.action)?.actionLabel ?? "";

      const salesPerson =
        row.action === LeadTrackerAction.ASSIGNED_TO
          ? row.assignedTo
          : row.createdBy;
      const remarks = row?.comments ?? "-";
      const followupDate = row?.followUpDate
        ? moment(row.followUpDate).format("DD-MMM-YYYY")
        : "-";
      const createdDate = row?.createdDate
        ? moment(row.createdDate).format("DD-MMM-YYYY")
        : "-";

      leadTrackerData +=
        `"${action}"` +
        "," +
        `"${salesPerson}"` +
        "," +
        `"${remarks}"` +
        "," +
        `"${followupDate}"` +
        "," +
        `"${createdDate}"`;

      leadTrackerData += "\n";
    }

    return leadTrackerData;
  };

  const getLeadDetailsCsvString = (): string => {
    const leadDetaisHeadings =
      "First Name" +
      "," +
      "Last Name" +
      "," +
      "Email" +
      "," +
      "Contact Number" +
      "," +
      "Organization Name" +
      "," +
      "Request Details" +
      "," +
      "Address Line 1" +
      "," +
      "Address Line 2" +
      "," +
      "State" +
      "," +
      "City" +
      "," +
      "Zipcode" +
      "," +
      "Country";

    let leadDetailsData = leadDetaisHeadings + "\n";
    const {
      firstName,
      lastName,
      organisationName,
      contactNumber,
      emailAddress,
    } = personalInfo;
    const { addressLine1, addressLine2, city, state, country, zipCode } =
      address ?? {};

    leadDetailsData +=
      `"${firstName ?? "-"}"` +
      "," +
      `"${lastName ?? "-"}"` +
      "," +
      `"${emailAddress ?? "-"}"` +
      "," +
      `"${contactNumber ?? "-"}"` +
      "," +
      `"${organisationName ?? "-"}"` +
      "," +
      `"${requestDetails ?? "-"}"` +
      "," +
      `"${addressLine1 ?? "-"}"` +
      "," +
      `"${addressLine2 ?? "-"}"` +
      "," +
      `"${state ?? "-"}"` +
      "," +
      `"${city ?? "-"}"` +
      "," +
      `"${zipCode ?? "-"}"` +
      "," +
      `"${country ?? "-"}"`;
    return leadDetailsData;
  };

  const generateExcel = (response: Array<GetLeadTrackerByIdResponse>) => {
    if (!(response instanceof Array)) return;

    let csvData = "";

    const leadTrackerData = getLeadTrackerDetailsCsvString(response);
    const leadDetailsData = getLeadDetailsCsvString();

    csvData += leadDetailsData + "\n\n\n" + leadTrackerData;

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const { firstName, lastName, organisationName } = personalInfo;
    const filename = `${organisationName} ${firstName} ${lastName}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename.replaceAll(/ /g, "_");
    link.click();

    toast.success("Export success");
    setExporting(false);
    setShowExportPopup(false);
  };

  const errorHandler = () => {
    toast.error("Sorry, Error Occurred", { autoClose: 2000 });
  };

  const exportAsExcelHandler = () => {
    Services.GetLeadTrackerById({
      leadId: id,
      success: generateExcel,
      error: errorHandler,
    });
  };

  const exportHandler = () => {
    setExporting(true);

    if (exportType === ExportType.PDF) {
      exportAsPdfHandler();
    } else {
      exportAsExcelHandler();
    }
  };

  return (
    <div className="block py-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-fit w-fit cursor-pointer"
            onClick={() => Router.back()}
          >
            <Icon icon={arrow_left} size="md" theme="secondary" />
          </div>

          <div className="flex items-center gap-6">
            <div className="w-fit relative flex items-center justify-center">
              {![Status.INACTIVE, Status.CLOSED].includes(status) && (
                <div className="absolute -bottom-2 -left-4">
                  <svg
                    className={
                      profileComplete.userProfileCompletePercentage === 100
                        ? ""
                        : "animate-battery_low_blink"
                    }
                    height={SVG_PROPS.HEIGHT}
                    width={SVG_PROPS.WIDTH}
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      strokeDasharray={SVG_PROPS.TOTAL_WIDTH}
                      stroke={profileComplete.hexCode}
                      strokeWidth="3px"
                      className="origin-center -rotate-90"
                      fill="none"
                      strokeDashoffset={profileComplete.strokeDashOffset}
                    />
                  </svg>
                </div>
              )}

              <div className="relative h-14 w-14">
                {organisationLogo ? (
                  <Image
                    src={organisationLogo ?? ""}
                    alt="logo"
                    fill
                    priority
                  />
                ) : (
                  <Icon
                    icon={user_circle}
                    size="_2xl"
                    theme="secondary"
                    iconType="solid"
                  />
                )}

                <div className="grid place-content-center absolute -bottom-0 -right-2 bg-theme-background-popup p-2 rounded-full shadow-lg flex-center-center">
                  {getActionAvatar(leadType)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <h2 className="capitalize font-semibold text-theme-secondary text-lg">
                  {personalInfo?.organisationName}
                </h2>
                <span className="text-theme-secondary">-</span>
                <h2 className="capitalize font-medium text-theme-secondary text-lg">
                  {personalInfo?.firstName} {personalInfo?.lastName}{" "}
                </h2>
              </div>

              <div>
                <span className="inline-block lowercase first-letter:capitalize rounded-full text-base px-4 py-1 font-semibold text-[#0f52ba] bg-[rgba(12,82,186,0.15)]">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 h-fit">
          <Button
            size="sm"
            theme="secondary"
            buttonThemeStyle="outlined"
            className="!shadow-none"
          >
            <span className="text-sm">Viewed Contents</span>
          </Button>

          {![Status.INACTIVE, Status.CLOSED].includes(status) && (
            <Button
              onClick={viewAllDetailsToggle}
              size="sm"
              theme="secondary"
              buttonThemeStyle="outlined"
              className="!shadow-none toggle-button"
            >
              <span className="text-sm">View All Details</span>
            </Button>
          )}

          <Button
            size="sm"
            theme="secondary"
            buttonThemeStyle="outlined"
            className="!shadow-none"
            onClick={showExportHandler}
          >
            <span className="text-sm">Export</span>
          </Button>
        </div>
      </div>

      <CSSTransition
        in={showViewAllDetails}
        classNames="slide-right-left"
        timeout={150}
        unmountOnExit
      >
        <div
          ref={viewAllDetailsContainerRef}
          className="flex fixed z-20 right-0 bottom-0 top-[7.30rem]"
          // top-[3.75rem]
        >
          <ViewAllLeadDetails {...leadDetails} />
        </div>
      </CSSTransition>

      <Modal isOpen={showExportPopup} close={exportPopupCancelHandler}>
        <div className="flex flex-col gap-2 px-4 py-8">
          <div className="py-4">
            <ExportAs onChange={exportTypeChangeHandler} />
          </div>
          <div className="flex justify-end">
            <Button
              theme="primary"
              size="md"
              disabled={exporting}
              onClick={exportHandler}
            >
              {exporting ? (
                <div className="flex-center-center !gap-2">
                  <Loading theme="secondary" size="sm" />
                  <span>Exporting</span>
                </div>
              ) : (
                <span>Go Ahead</span>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LeadDetailsHeader;
