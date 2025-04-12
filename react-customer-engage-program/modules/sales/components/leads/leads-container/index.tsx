import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { filter, filter_funnel, search } from "../../../../../helpers/icons";
import useKeydown from "../../../../../hooks/use-keydown";
import useOutsideClick from "../../../../../hooks/use-outside-click";
import { LeadType } from "../../../../../shared/enums";
import { NotificationObject } from "../../../../../shared/model";
import { ReceiveMessageforSpecificRole } from "../../../../../signalR/model";
import Connector from "../../../../../signalR/signalRconnection";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import Input from "../../../../../ui-components/Input";
import Loading from "../../../../../ui-components/Loading";
import Toggle from "../../../../../ui-components/Toggle";
import { LeadTrackerAction } from "../../../enums";
import { LeadsFilterProps } from "../../../model";
import * as Services from "../../../services";
import {
  GetAllLeadsWithPaginationResponse,
  LeadsResponse,
  PaginationParams,
} from "../../../services/model.response";
import FilterChip from "../../filter-chip";
import Lead from "../lead";
import LeadsApplyFilters from "../lead-apply-filters";
import { LeadProps } from "../lead/model";
import { LeadsContainerProps } from "./model";

const LIMIT = 9;
const defaultFilters: LeadsFilterProps = {
  Offset: 0,
  Limit: LIMIT,
  LeadStatus: null,
  LeadType: null,
  Status: null,
  AssignStatus: null,
  SortOrder: null,
  SortField: null,
  AssignedTo: null,
  SourceTechnology: null,
  TargetTechnology: null,
  SearchText: null,
  SourceTechnologyName: null,
  TargetTechnologyName: null,
};

function LeadsContainer({ query }: LeadsContainerProps) {
  const router = useRouter();

  const validQueryParamFilters: LeadsFilterProps = useMemo(() => {
    let validFilters = {};
    Object.keys(query).forEach((filter) => {
      validFilters = {
        ...validFilters,
        ...(filter in defaultFilters && { [filter]: (query as any)[filter] }),
      };
    });

    return {
      ...defaultFilters,
      ...validFilters,
      ...(!("Offset" in query) && { Offset: 0 }),
      ...((!("Limit" in query) || Number(query["Limit"]) < 9) && {
        Limit: defaultFilters.Limit,
      }),
    };
  }, [query]);

  const { keycloak } = useKeycloak();
  const { email } = keycloak?.tokenParsed ?? {};

  const [leads, setLeads] = useState<Array<LeadProps>>([]);
  const [filters, setFilters] = useState<LeadsFilterProps>(
    validQueryParamFilters
  );
  const [fetching, setFetching] = useState(true);
  const [filterText, setFilterText] = useState(
    validQueryParamFilters.SearchText ?? ""
  );
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<PaginationParams>();

  const { events, removeEvents } = Connector();

  const filtersAdded = useMemo(() => {
    return (
      Object.keys(filters)
        .filter(
          (filter) =>
            !["Offset", "Limit"].includes(filter as keyof typeof filters)
        )
        .filter((filter) => filters[filter as keyof typeof filters]).length > 0
    );
  }, [filters]);

  const [filtersContainerRef] = useOutsideClick(
    () => {
      setShowFilters(false);
    },
    { closeOnEsc: true }
  );
  useKeydown((e: KeyboardEvent) => {
    if (e.altKey && e.shiftKey && /^f$/i.test(e.key)) {
      setShowFilters((prev) => !prev);
    }
  });

  const containerRef = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.75,
  });

  const leadsFetchSuccess = async ({
    data,
    pagination,
  }: GetAllLeadsWithPaginationResponse) => {
    setFetching(false);
    setLeads((leads) => [...leads, ...data]);
    setPagination(pagination);
  };

  const leadsFetchError = () => {
    setFetching(false);
    toast("Error Occurred", {
      type: "error",
    });
  };

  const fetchLeads = () => {
    setFetching(true);

    Services.GetAllLeadsWithPagination({
      ...filters,
      success: leadsFetchSuccess,
      error: leadsFetchError,
    });
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const filterApplyHandler = (updatedFilters: LeadsFilterProps) => {
    setLeads([]);
    setFilters({ ...updatedFilters, Limit: LIMIT, Offset: 0 });
    setShowFilters(false);
  };

  const filterResetHandler = () => {
    setLeads([]);
    setFilters({ ...filters, ...defaultFilters });
    setShowFilters(false);
    setFilterText("");
  };

  const filterRemoveHandler = ([...removeFilters]: Array<
    keyof typeof filters
  >) => {
    setLeads([]);

    setFilters((prevFilters) => {
      removeFilters.forEach((_filter) => {
        prevFilters = {
          ...prevFilters,
          [_filter]: null,
        };
      });
      return prevFilters;
    });
  };

  const filterTextChangeHandler = ({ target: { value } }: any) => {
    setFilterText(value.trim());
  };

  const searchSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterText.length === 0) return;

    filterApplyHandler({ ...filters, SearchText: filterText });
  };

  const showAssignedToMeHandler = (checked: boolean) => {
    if (!keycloak || !keycloak.authenticated) return;

    filterApplyHandler({
      ...filters,
      AssignedTo: checked ? email : null,
    });
  };

  const receiveMessage = ({
    notification,
    data,
  }: ReceiveMessageforSpecificRole) => {
    const { action, detailId }: NotificationObject =
      JSON.parse(notification) ?? {};

    const isNewLead = Object.values(LeadType).includes(action as LeadType);
    if (isNewLead) {
      const dataObject: LeadsResponse = JSON.parse(data);
      setLeads((prevLead) => {
        return [
          {
            ...dataObject,
            isNew: true,
            leadType: action as LeadType,
          },
          ...prevLead,
        ];
      });
      return;
    }

    const isLeadUpdate = Object.values(LeadTrackerAction).includes(
      action as LeadTrackerAction
    );

    if (isLeadUpdate && detailId) {
      const dataObject: LeadsResponse = JSON.parse(data);

      setLeads((prevLeads) => {
        let index = prevLeads.findIndex((lead) => lead.id === detailId);
        if (index !== -1) {
          prevLeads[index] = dataObject;
        }
        return [...prevLeads];
      });
    }
  };

  useEffect(() => {
    if (
      inView &&
      !fetching &&
      pagination &&
      leads.length < pagination?.totalCount
    ) {
      setFilters({
        ...filters,
        Offset: Number(filters.Offset ?? 0) + LIMIT,
      });
    }
  }, [inView]);

  useEffect(() => {
    fetchLeads();

    let queryParamsFilters = {};
    Object.keys(filters).forEach((filter) => {
      if (filters[filter as keyof typeof filters] === null) return;

      queryParamsFilters = {
        ...queryParamsFilters,
        [filter]: filters[filter as keyof typeof filters],
      };
    });

    router.push({
      pathname: router.pathname,
      query: queryParamsFilters,
    });
  }, [filters]);

  useEffect(() => {
    events(receiveMessage, receiveMessage);

    return () => {
      removeEvents(receiveMessage, receiveMessage);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4" ref={containerRef}>
      <div className="flex items-center gap-2">
        <form onSubmit={searchSubmitHandler} className="flex-1 relative">
          <Input
            size="sm"
            theme="primary"
            icon={filter_funnel}
            placeholder="Filter by keyword"
            value={filterText}
            onChangeEvent={filterTextChangeHandler}
          />

          <div className="absolute right-1 top-1 bottom-0">
            <Button
              size="sm"
              theme="secondary"
              type="submit"
              className=" !bg-theme-background-popup cursor-pointer h-full px-3 flex-center-center"
            >
              <Icon icon={search} size="md" theme="secondary" />
            </Button>
          </div>
        </form>

        <div>
          <IconButton
            disabled={fetching}
            size="lg"
            theme="primary"
            className="!bg-[rgba(15,82,186,0.1)] !shadow-none toggle-button"
            onClick={toggleFilters}
          >
            <Icon
              icon={filter}
              size="md"
              theme="secondary"
              className="[&>svg]:!stroke-none"
            />
          </IconButton>
        </div>
      </div>

      <div className="flex justify-end">
        <Toggle
          size="xs"
          theme="primary"
          checked={filters.AssignedTo === email}
          disabled={fetching}
          onChange={showAssignedToMeHandler}
        >
          <span className="text-sm text-theme-secondary whitespace-nowrap">
            Show Assigned to Me
          </span>
        </Toggle>
      </div>

      <CSSTransition
        in={filtersAdded && !fetching}
        timeout={300}
        classNames="fly"
        unmountOnExit
      >
        <div className="flex items-center gap-4">
          <h3 className="text-sm">
            <span className="text-theme-secondary whitespace-nowrap">
              Leads found:{" "}
            </span>
            <span className="text-theme-secondary font-semibold">
              {pagination?.totalCount ?? "?"}
            </span>
          </h3>

          <div className="flex flex-wrap gap-x-3 gap-y-3 items-center py-2">
            {Object.keys(filters).map(
              (key, i) =>
                ![
                  "Offset",
                  "Limit",
                  "SourceTechnology",
                  "TargetTechnology",
                  "SourceTechnologyName",
                  "TargetTechnologyName",
                ].includes(key) &&
                filters[key as keyof typeof filters] !== null && (
                  <FilterChip
                    key={i}
                    title={key}
                    filterText={filters[key as keyof typeof filters] as string}
                    onRemove={() =>
                      filterRemoveHandler([key as keyof typeof filters])
                    }
                  />
                )
            )}
            {filters["SourceTechnology"] && (
              <FilterChip
                title={"SourceTechnology"}
                filterText={filters["SourceTechnologyName"] as string}
                onRemove={() =>
                  filterRemoveHandler([
                    "SourceTechnology",
                    "SourceTechnologyName",
                  ])
                }
              />
            )}
            {filters["TargetTechnology"] && (
              <FilterChip
                title={"TargetTechnology"}
                filterText={filters["TargetTechnologyName"] as string}
                onRemove={() =>
                  filterRemoveHandler([
                    "TargetTechnology",
                    "TargetTechnologyName",
                  ])
                }
              />
            )}
          </div>
        </div>
      </CSSTransition>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6">
        {leads.map((lead, key) => (
          <Lead key={lead.id + key} {...lead} />
        ))}
      </div>

      <CSSTransition
        in={showFilters}
        timeout={300}
        classNames="slide-right-left"
        unmountOnExit
      >
        {/* REMOVE */}
        <div
          ref={filtersContainerRef}
          className="flex fixed right-0 bottom-0 top-[7.30rem]"
          // top-[3.75rem]
        >
          <LeadsApplyFilters
            {...filters}
            onApply={filterApplyHandler}
            onReset={filterResetHandler}
          />
        </div>
      </CSSTransition>

      {!fetching && leads.length > 0 && <div ref={ref}></div>}

      {fetching && (
        <div className="py-5 flex gap-2 items-center justify-center">
          <Loading size="md" theme="primary" />
          <span className="text-theme-secondary">Loading</span>
        </div>
      )}

      {!fetching && leads.length === 0 && (
        <h3 className="text-center text-theme-secondary">No results found</h3>
      )}
    </div>
  );
}

export default LeadsContainer;
