import { useEffect, useMemo, useState } from "react";
import { filter_funnel, plus } from "../../../../helpers/icons";
import useLogin from "../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../shared/enums";
import Checkbox from "../../../../ui-components/Checkbox";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";
import Input from "../../../../ui-components/Input";
import Modal from "../../../../ui-components/Modal";
import * as Services from "../../services";
import { GetAddedResponsibilitiesResponse } from "../../services/model.response";
import AddResponsibilityMatrix from "./add-responsibility-matrix";
import ResponsibilitiesTable from "./responsibilities-table";

function ResponsibilityMatrixContainer({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  const { email, roles } = useLogin();

  const [addedResponsibilities, setAddedResponsibilities] = useState<
    GetAddedResponsibilitiesResponse[]
  >([]);
  const [showAddResponsibility, setShowAddResponsibility] = useState(false);
  const [filterText, setFilterText] = useState("");

  const [showMineOthers, setShowMineOthers] = useState({
    showMine: true,
    showOthers: true,
  });

  // TODO
  const filteredResponsibilities = useMemo(() => {
    return addedResponsibilities
      .filter(
        (responsibility) =>
          (showMineOthers.showMine &&
            (responsibility.ownerEmail === email ||
              roles.includes(ApplicationRoles.SALES_PERSON))) ||
          (showMineOthers.showOthers && responsibility.ownerEmail !== email)
      )
      .filter((responsibility) =>
        Object.keys(responsibility).some((key) =>
          responsibility[key as keyof typeof responsibility]
            .toLowerCase()
            .includes(filterText.toLowerCase() ?? "")
        )
      );
  }, [addedResponsibilities, showMineOthers, filterText]);

  const showAddResponsibilityToggle = () => {
    setShowAddResponsibility((prev) => !prev);
  };

  const filterTextChangeHandler = ({ target: { value } }: any) => {
    setFilterText(value.trim());
  };

  const fetchSuccess = (response: GetAddedResponsibilitiesResponse[]) => {
    setAddedResponsibilities(response);
  };

  const fetchError = () => {};

  useEffect(() => {
    Services.GetAddedResponsibilities({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="px-4 flex flex-col gap-4">
      <h3 className="font-semibold text-theme-secondary text-xl">
        Responsibility Matrix
      </h3>
      <div className="flex flex-col gap-5">
        <Input
          size="sm"
          theme="primary"
          icon={filter_funnel}
          placeholder="Filter by keyword"
          value={filterText}
          onChangeEvent={filterTextChangeHandler}
        />

        <div className="flex justify-end">
          <div className="flex gap-6">
            <Checkbox
              label="Show Mine"
              size="sm"
              theme="secondary"
              defaultChecked={showMineOthers.showMine}
              onChange={(e) => {
                setShowMineOthers({
                  ...showMineOthers,
                  showMine: (e.target as HTMLInputElement).checked,
                });
              }}
            />
            <Checkbox
              label="Show Other's"
              size="sm"
              theme="secondary"
              defaultChecked={showMineOthers.showOthers}
              onChange={(e) => {
                setShowMineOthers({
                  ...showMineOthers,
                  showOthers: (e.target as HTMLInputElement).checked,
                });
              }}
            />
          </div>
        </div>
              
        <ResponsibilitiesTable responsibilities={filteredResponsibilities} />
      </div>

      <div className="fixed bottom-12 right-12">
        <IconButton
          onClick={showAddResponsibilityToggle}
          theme="primary"
          size="xl"
        >
          <Icon icon={plus} theme="primary" size="xl" />
        </IconButton>
      </div>

      <Modal isOpen={showAddResponsibility} close={showAddResponsibilityToggle}>
        <div className="pt-14 pb-4 px-4">
          <AddResponsibilityMatrix
            onCancel={showAddResponsibilityToggle}
            addedResponsibilities={addedResponsibilities}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ResponsibilityMatrixContainer;
