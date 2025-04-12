import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  getExtensionFromFileName,
  getFileTypeIconFromFileName,
} from "../../../../../helpers/get-filetype-icon";
import { folder, search } from "../../../../../helpers/icons";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import Icon from "../../../../../ui-components/Icon";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { SearchRepositoryResponse } from "../../../services/model.response";
import { RepositorySearchProps } from "./model";

function RepositorySearch({ onItemClick }: RepositorySearchProps) {
  const [fetching, setFetching] = useState(false);
  const [repositoryUploads, setRepositoryUploads] = useState<
    SearchRepositoryResponse[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ref] = useOutsideClick(() => {
    setShowSuggestions(false);
  });

  let timeoutId: any = null;

  const groupedRepositoryUploads: Record<
    "Folders" | "Files",
    SearchRepositoryResponse[]
  > = useMemo(() => {
    const groupedObject: Record<
      "Folders" | "Files",
      SearchRepositoryResponse[]
    > = {} as any;

    repositoryUploads.map((repositoryUpload) => {
      if (repositoryUpload.isFolder) {
        groupedObject["Folders"] = [
          ...(groupedObject["Folders"] ?? []),
          repositoryUpload,
        ];
      } else {
        groupedObject["Files"] = [
          ...(groupedObject["Files"] ?? []),
          repositoryUpload,
        ];
      }
    });

    return groupedObject;
  }, [repositoryUploads]);

  const itemClickHandler = (upload: SearchRepositoryResponse) => {
    onItemClick?.(upload.folderPath ?? "");
    setShowSuggestions(false);
  };

  const fetchSuccess = (response: SearchRepositoryResponse[]) => {
    if (!(response instanceof Array)) return;
    setFetching(false);
    setRepositoryUploads(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  const getSearchResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 0) {
      setRepositoryUploads([]);
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      setFetching(true);
      Services.SearchRepository({
        searchText: value,
        success: fetchSuccess,
        error: fetchError,
      });
    }, 500);
  };

  return (
    <div ref={ref} className="relative">
      <Input
        size="sm"
        theme="secondary"
        label=""
        placeholder="Search"
        icon={search}
        onFocusEvent={() => setShowSuggestions(true)}
        onChangeEvent={getSearchResults}
      />

      {showSuggestions && repositoryUploads.length > 0 && (
        <div className="flex flex-col gap-6 max-h-[300px] overflow-auto absolute z-20 w-full bg-theme-background-popup shadow-md rounded-md py-7 px-4">
          {fetching ? (
            <div className="flex-center-center">
              <Loading size="sm" theme="secondary" />
              <p className="text-theme-secondary">Loading</p>
            </div>
          ) : (
            Object.keys(groupedRepositoryUploads).map((key) => (
              <div className="flex flex-col gap-4">
                <p className="text-theme-secondary font-medium">{key}</p>

                <div className="flex flex-wrap gap-4">
                  {groupedRepositoryUploads[
                    key as keyof typeof groupedRepositoryUploads
                  ].map((upload) => (
                    <div
                      onClick={() => itemClickHandler(upload)}
                      className="py-1 px-3 rounded-md hover:bg-theme-button-elevate cursor-pointer"
                    >
                      {upload.isFolder ? (
                        <div className="max-w-full flex gap-2 items-center">
                          <Icon
                            icon={folder}
                            size="lg"
                            theme="secondary"
                            iconType="solid"
                            className="[&>svg]:!fill-[#FFDB68]"
                          />
                          <div>
                            <p className="text-theme-secondary text-sm">
                              {upload.folderName}
                            </p>
                            <p className="text-theme-secondary text-xs">
                              {moment(new Date(upload.createdTime)).format(
                                "DD MMM YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          {getFileTypeIconFromFileName(
                            getExtensionFromFileName(upload.fileName ?? ""),
                            "lg"
                          )}
                          <div>
                            <p className="text-theme-secondary text-sm">
                              {upload.fileName}
                            </p>
                            <p className="text-theme-secondary text-xs">
                              {moment(new Date(upload.createdTime)).format(
                                "DD MMM YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RepositorySearch;
