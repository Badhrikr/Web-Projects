import { ExportType } from "../../../../../shared/enums";

export interface ExportAsProps {
    onChange?(type: ExportType): void;
}
