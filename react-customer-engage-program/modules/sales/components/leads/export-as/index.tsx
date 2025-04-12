import Image from "next/image";
import { useState } from "react";
import { tick } from "../../../../../helpers/icons";
import { ExportType } from "../../../../../shared/enums";
import Icon from "../../../../../ui-components/Icon";
import { ExportAsProps } from "./model";

function ExportAs({ onChange }: ExportAsProps) {
  const [exportType, setExportType] = useState<ExportType>(ExportType.PDF);

  const typeChangeHandler = (type: ExportType) => {
    setExportType(type);
    onChange?.(type);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-secondary font-semibold text-theme-secondary mb-4">Export as</h3>
      <div
        onClick={() => typeChangeHandler(ExportType.PDF)}
        className={`cursor-pointer flex items-center justify-between gap-4 px-4 py-5 rounded-md border-2 ${
          exportType === ExportType.PDF
            ? "border-theme-secondary"
            : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/file-types/pdf.png"}
            alt="pdf-icon"
            height={35}
            width={35}
          />
          <div>
            <p className="text-theme-secondary font-semibold">Export as PDF</p>
            <p className="text-theme-secondary-550 text-sm">Export as PDF</p>
          </div>
        </div>

        {exportType === ExportType.PDF && (
          <Icon icon={tick} theme="secondary" size="md" />
        )}
      </div>

      <div
        onClick={() => typeChangeHandler(ExportType.EXCEL)}
        className={`cursor-pointer flex items-center justify-between gap-4 px-4 py-5 rounded-md border-2 ${
          exportType === ExportType.EXCEL
            ? "border-theme-secondary"
            : "border-transparent"
        }`}
      >
        <div className="flex items-center gap-4">
          <Image
            src={"/assets/file-types/excel.png"}
            alt="pdf-icon"
            height={35}
            width={35}
          />
          <div>
            <p className="text-theme-secondary font-semibold">
              Export as Excel
            </p>
            <p className="text-theme-secondary-550 text-sm">Export as Excel</p>
          </div>
        </div>

        {exportType === ExportType.EXCEL && (
          <Icon icon={tick} theme="secondary" size="md" />
        )}
      </div>
    </div>
  );
}

export default ExportAs;
