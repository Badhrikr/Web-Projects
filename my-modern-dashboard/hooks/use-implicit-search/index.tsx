import { useEffect, useState } from "react";

function useImplicitSearch<T>(
  dataToFilter: T[]
): [T[], (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void] {
  const [filteredResults, setFilteredResults] = useState<T[]>(dataToFilter);

  useEffect(() => {
    setFilteredResults(dataToFilter);
  }, [dataToFilter]);

  const filterData = (data: any, filterText: string): boolean => {
    if (typeof data === "string") {
      return data?.toLowerCase().includes(filterText.toLowerCase());
    } else if (typeof data === "number") {
      return String(data).toLowerCase().includes(filterText.toLowerCase());
    } else if (typeof data === "object") {
      return Object.keys(data ?? {})?.some((key) =>
        filterData(data[key as keyof typeof data], filterText)
      );
    } else if (data instanceof Array) {
      return data?.some((key) =>
        filterData(data[key as keyof typeof data], filterText)
      );
    }

    return false;
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const filterText = (e.target as HTMLInputElement).value;
    const _filteredResults = dataToFilter.filter((data) =>
      filterData(data, filterText)
    );
    setFilteredResults(_filteredResults);
  };

  return [filteredResults, handleChange];
}

export default useImplicitSearch;
