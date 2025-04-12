import React, { useState } from "react";
import Button from "../../../../../ui-components/Button";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import { CreateFolderWidgetProps } from "./model";

function CreateFolderWidget({
  loading,
  onCreate,
  onCancel,
}: CreateFolderWidgetProps) {
  const [folderName, setFolderName] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(folderName);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-2">
      <h3 className="text-theme-secondary text-base">
        Enter New Folder Name
      </h3>
      <Input
        type="text"
        autoFocus
        theme="secondary"
        size="md"
        required
        onChangeEvent={(e) => {
          setFolderName((e?.target as HTMLInputElement).value);
        }}
      />
      <div className="flex justify-end mt-4">
        <Button
          onClick={onCancel}
          theme="secondary"
          size="md"
          buttonThemeStyle="ghost"
        >
          Close
        </Button>

        <Button theme="primary" size="md" type="submit">
          {loading ? (
            <div className="flex-center-center">
              <Loading size="lg" theme="secondary" />
              <p>Creating</p>
            </div>
          ) : (
            <p>Create</p>
          )}
        </Button>
      </div>
    </form>
  );
}

export default CreateFolderWidget;
