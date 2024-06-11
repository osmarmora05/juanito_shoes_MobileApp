import { createContext } from "react";

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filter, setFilter] = useState("Todos");

  const filterShoes = (shoes) => {
    return shoes.filter((shoe) => {
      return filter == "Todos" || filter == shoe.nombre_categoria;
    });
  };

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <FiltersContext.Provider value={{ filter, filterShoes, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
}