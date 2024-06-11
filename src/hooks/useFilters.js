import { useContext } from "react";
import { FiltersContext } from "../context/filter";

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used withing a FiltersContextProvider");
  }
  return context;
};