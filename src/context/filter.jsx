import { createContext, useState } from "react";

/*
  Contexto que permite filtrar zapatos dependiendo de su categoria
 */

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  // Almacena la categoria del zapatos
  const [filter, setFilter] = useState("Todos");

  /*
  `filterShoes`: Permite filtrar zapatos dependiendo de su categoria. Recibe un objeto de tipo Card
    1. Si el estado `filter` es igual a todos retornamos todos los zapatos 
       Que contenga la categoria "Todos", si no es asi, retornamos el que establecio el usuario
  */

  const filterShoes = (shoes) => {
    return shoes.filter((shoe) => {
      return filter == "Todos" || filter == shoe.category;
    });
  };

  /*
  `updateFilter`: Pemite actualizar el estado `filter`
    1. Recibe por arguemento el nuevo valor que almacenara el estado `filter`.
       El proposito de esta funcion es utilizarlo en un custom Hook de forma comoda y actualizar
       de forma comoda la categoria del zapato
  */

  const updateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <FiltersContext.Provider value={{ filter, filterShoes, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
}