import { useContext } from "react";
import { FiltersContext } from "../context/filter";

/*
  `useFilters`: Custom hook que permite utilizar el contexto `FiltersContext`
*/

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used withing a FiltersContextProvider");
  }
  return context;
};