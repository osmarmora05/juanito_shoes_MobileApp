import { useState } from "react";

/* 
`useCount`: funcion que tiene metodos utiles para crear 
  contadores

  recibe por parametro `initialCount` que es el valor inicial del estado `count` y el `maximumValue` que es el valor que representa el limite de valor del estado `count`

  Por que crear la logica del contador aqui? Por que se puede utilizar esta logica en varias pantallas de forma clean
*/

function useCount(initialCount = 1, maximumValue) {
  // Estado que almecena un numero, que representa el valor del contador
  const [count, setCount] = useState(initialCount);

  // Funcion que aumenta el valor del estado `count` en uno y que no debe ser mayor que `maximumValue`
  const increment = () => {
    if (count < maximumValue) {
      setCount((count) => count + 1);
    }
  };

  // Funcion que desincrementa el estado `count` en uno, y que no debe ser menor que 0
  const decrement = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  // Funcion que vuelve al estado inicial `count`
  const reset = () => {
    setCount(initialCount);
  };

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export default useCount;