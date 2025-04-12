import { useState } from "react";
import CreateFolderWidget from "../create-folder-widget";
import { CreateFolderProps } from "./model";
import * as Services from "../../../services";

function CreateFolder({ pathName, onCreate, onCancel }: CreateFolderProps) {
  const [creating, setCreating] = useState(false);

  const createSuccess = () => {    
    setCreating(false);
    onCreate?.();
  };

  const createError = () => {
    setCreating(false);
  };

  const createHandler = (folderName: string) => {
    setCreating(true);

    Services.CreateRepositoryFolder({
      newFolderName: folderName,
      pathName,
      success: createSuccess,
      error: createError,
    });
  };

  return (
    <CreateFolderWidget
      loading={creating}
      onCreate={createHandler}
      onCancel={onCancel}
    />
  );
}

export default CreateFolder;
