import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { getGlobalSearchList } from "../../../helpers/global-search";
import { search } from "../../../helpers/icons";
import useOutsideClick from "../../../hooks/use-outside-click";
import Input from "../../../ui-components/Input";
import { ApplicationRoles } from "../../enums";
import GlobalSearchItem from "../global-search-item";
import { GlobalSearchItemProps } from "../global-search-item/model";

function GlobalSearchbar() {
  const router = useRouter();

  const { keycloak } = useKeycloak();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [ref] = useOutsideClick(
    () => {
      setShowSuggestions(false);
    },
    { closeOnEsc: true }
  );

  const suggestions: Array<GlobalSearchItemProps> = useMemo(() => {
    const role = keycloak.tokenParsed?.resource_access?.["DCEP-Application"][
      "roles"
    ][0] as ApplicationRoles;

    return getGlobalSearchList(role);
  }, [keycloak]);

  const searchTextMatcher = (
    { title, desc }: GlobalSearchItemProps,
    searchText: string
  ): boolean => {
    return (
      new RegExp(`${searchText}`, "gi").test(title) ||
      new RegExp(`${searchText}`, "gi").test(desc)
    );
  };

  const filteredSuggestions = useMemo(() => {
    if (searchText?.length > 0) {
      return suggestions.filter((suggestion) =>
        searchTextMatcher(suggestion, searchText)
      );
    }

    return suggestions;
  }, [searchText]);

  const searchTextChangeHandler = ({ target: { value } }: any) => {
    setSearchText(value);
  };

  useEffect(() => {
    setShowSuggestions(false);
  }, [router.asPath]);

  return (
    <div className="relative w-full" ref={ref}>
      <Input
        label=""
        icon={search}
        theme="primary"
        size="sm"
        placeholder="Search Services"
        onFocusEvent={() => setShowSuggestions(true)}
        onInputEvent={searchTextChangeHandler}
        clear={true}
      />

      <CSSTransition
        in={showSuggestions}
        timeout={150}
        classNames="fly"
        unmountOnExit
      >
        <div className="z-20 py-4 px-6 w-full flex flex-col gap-4 shadow-xl bg-theme-background-popup absolute top-12 rounded-lg">
          {filteredSuggestions.map((suggestion, key) => (
            <GlobalSearchItem key={key} {...suggestion} />
          ))}

          {suggestions.length === 0 && (
            <h3 className="px-2 py-1 text-theme-secondary">
              No suggestions found
            </h3>
          )}

          {suggestions.length > 0 && filteredSuggestions.length === 0 && (
            <h3 className="px-2 py-1 text-theme-secondary">No results found</h3>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}

export default GlobalSearchbar;
