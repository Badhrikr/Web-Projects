import { FileType } from "../modules/migration-request-workspace/enums";
import Icon from "../ui-components/Icon";
import { Size } from "../ui-components/model";
import {
  excel,
  pdf,
  ppt,
  text_file,
  unknown_file,
  word,
  zip_file,
} from "./icons";

export function getExtensionFromFileName(filename: string) {
  return filename?.substring(filename?.lastIndexOf(".") + 1) ?? "";
}

export function getFileTypeIconFromFileName(
  extension: string,
  size: Size = "xl"
) {
  switch (extension) {
    case FileType.PDF:
      return (
        <Icon
          icon={pdf}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#9C1010]"
        />
      );
    case FileType.DOC:
    case FileType.DOCX:
      return (
        <Icon
          icon={word}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#2061CE]"
        />
      );
    case FileType.TXT:
      return (
        <Icon
          icon={text_file}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#E5A755]"
        />
      );
    case FileType.ZIP:
      return (
        <Icon
          icon={zip_file}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#E5A755]"
        />
      );
    case FileType.PPT:
    case FileType.PPTX:
      return (
        <Icon
          icon={ppt}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#B63619]"
        />
      );
    case FileType.CSV:
    case FileType.XLS:
    case FileType.XLSX:
      return (
        <Icon
          icon={excel}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#016D36]"
        />
      );
    default:
      return (
        <Icon
          icon={unknown_file}
          theme="secondary"
          size={size}
          iconType="solid"
          className="[&>svg]:!fill-[#BFA9AC]"
        />
      );
  }
}
