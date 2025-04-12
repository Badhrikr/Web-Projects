import { useEffect, useMemo, useState } from "react";
import { filter_funnel } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Checkbox from "../../../../../ui-components/Checkbox";
import Input from "../../../../../ui-components/Input";
import * as Services from "../../../services";
import { GetAllResponsibilitiesResponse } from "../../../services/model.response";
import { AddResponsibilityMatrixProps } from "./model";

function AddResponsibilityMatrix({
  addedResponsibilities,
  onCancel,
  onSubmitToClient,
  onSubmitToUs,
}: AddResponsibilityMatrixProps) {
  const [newlyAddedResponsibilities, setNewlyAddedResponsibilities] = useState<
    GetAllResponsibilitiesResponse[]
  >([]);
  const [allResponsibilities, setAllResponsibilities] = useState<
    GetAllResponsibilitiesResponse[]
  >([]);

  const [filterText, setFilterText] = useState("");

  const filteredResponsibilities = useMemo(() => {
    const addedResponsibilityIds = addedResponsibilities.map(
      ({ responsibilityId }) => responsibilityId
    );
    return allResponsibilities
      .filter(
        (responsibility) =>
          !addedResponsibilityIds.includes(responsibility.responsibilityId)
      )
      .filter((responsibility) =>
        Object.keys(responsibility).some((key) =>
          responsibility[key as keyof typeof responsibility]
            .toLowerCase()
            .includes(filterText ?? "")
        )
      );
  }, [filterText, addedResponsibilities, allResponsibilities]);

  const filteredAddedResponsibilities = useMemo(() => {
    return addedResponsibilities.filter((responsibility) =>
      Object.keys(responsibility).some((key) =>
        responsibility[key as keyof typeof responsibility]
          .toLowerCase()
          .includes(filterText ?? "")
      )
    );
  }, [filterText, addedResponsibilities, allResponsibilities]);

  const addResponsibilityHandler = (
    responsibility: GetAllResponsibilitiesResponse
  ) => {
    setNewlyAddedResponsibilities((prevResponsibilities) => [
      ...prevResponsibilities,
      responsibility,
    ]);
  };

  const removeResponsibilityHandler = (
    responsibility: GetAllResponsibilitiesResponse
  ) => {
    setNewlyAddedResponsibilities((prevResponsibilities) =>
      prevResponsibilities.filter(
        (prevResponsibility) =>
          prevResponsibility.responsibilityId !==
          responsibility.responsibilityId
      )
    );
  };

  const filterTextChangeHandler = ({ target: { value } }: any) => {
    setFilterText(value.trim());
  };

  const fetchSuccess = (response: GetAllResponsibilitiesResponse[]) => {
    setAllResponsibilities(response);
  };

  const fetchError = () => {};

  useEffect(() => {
    Services.GetAllResponsibilities({
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold text-theme-secondary">
        Add Responsibilities
      </h3>

      <Input
        size="sm"
        theme="primary"
        icon={filter_funnel}
        placeholder="Filter by keyword"
        value={filterText}
        onChangeEvent={filterTextChangeHandler}
      />

      <div className="flex flex-col gap-6 min-h-[250px] max-h-[250px] overflow-auto">
        {filteredResponsibilities.map((responsibility) => (
          <div className="flex gap-4">
            <Checkbox
              size="sm"
              theme="primary"
              label=""
              onChange={(e) =>
                (e.target as HTMLInputElement).checked
                  ? addResponsibilityHandler(responsibility)
                  : removeResponsibilityHandler(responsibility)
              }
            />
            <div className="flex flex-col">
              <span className="text-theme-secondary font-medium">
                {responsibility?.title}
              </span>
              <span className="text-theme-secondary-600">
                {responsibility?.description}
              </span>
            </div>
          </div>
        ))}

        {filterText.length > 0 && filteredResponsibilities.length === 0 && (
          <h4 className="text-theme-secondary text-center">No results found</h4>
        )}

        {/* <div className="mt-4 flex flex-col gap-4 border-t border-gray-400 pt-4">
          <h4 className="text-theme-secondary-500 tracking-wide text-sm">
            Added Responsibilities
          </h4>

          {filteredAddedResponsibilities.map((responsibility) => (
            <div className="flex gap-4 opacity-[0.50] pointer-events-none">
              <Checkbox size="sm" theme="primary" label="" defaultChecked />
              <div className="flex flex-col">
                <span className="text-theme-secondary font-medium">
                  {responsibility?.title}{" "}
                  <span className="text-[#5a8df7]">
                    {" "}
                    {"("}
                    {responsibility.owner}
                    {")"}
                  </span>
                </span>
                <span className="text-theme-secondary-600">
                  {responsibility?.description}
                </span>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      <br />
      <div className="flex justify-end gap-2">
        <Button
          onClick={onCancel}
          theme="secondary"
          size="md"
          buttonThemeStyle="ghost"
        >
          Cancel
        </Button>

        <Button
          onClick={() =>
            newlyAddedResponsibilities.length > 0 &&
            onSubmitToUs?.(newlyAddedResponsibilities)
          }
          theme="secondary"
          size="md"
          buttonThemeStyle="outlined"
        >
          Add to us
        </Button>

        <Button
          onClick={() =>
            newlyAddedResponsibilities.length > 0 &&
            onSubmitToClient?.(newlyAddedResponsibilities)
          }
          theme="primary"
          size="md"
        >
          Add to Client
        </Button>
      </div>
    </div>
  );
}

export default AddResponsibilityMatrix;
