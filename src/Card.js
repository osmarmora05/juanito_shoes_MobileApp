/*
Por que una clase Card?

1. Es escalable, imaginate que en un futuro se agrege descuento a un zapato, pues vendria a este clase y creariamos un metodo get para obtener ese descuento de forma sencilla y que se puede aplicar en multiples cards

2. Puedo manipular de forma sencilla lo que quiera de un zapato y de manera centralizada

Y pues hay muchas mas, pero me da pereza escribirlas, son las 12 de la noche zzz
*/

export class Card {
  #shoes;
  constructor(shoes = []) {
    this.#shoes = shoes;
  }

  get modeloId() {
    return this.#shoes[0]["id_modelo"];
  }

  get name() {
    return this.#shoes[0]["nombre"];
  }

  get price() {
    return this.#shoes[0]["precio"];
  }

  get imageCover() {
    return this.#shoes[0]["imagen"];
  }

  get description() {
    return this.#shoes[0]["descripcion"];
  }

  get mark() {
    return this.#shoes[0]["nombre_marca"];
  }

  get category() {
    return this.#shoes[0]["nombre_categoria"];
  }

  // or Stock?
  get sizesWithYourColorsAndQuantities() {
    const aux = [];
    const shoes = this.#shoes;

    shoes.forEach((item) => {
      let sizeEntry = aux.find((entry) => entry.talla === item.talla);

      if (!sizeEntry) {
        sizeEntry = {
          id_modelo: item.id_modelo,
          id_inventario: item.id_inventario,
          talla: item.talla,
          imagenes: [],
          colores: [],
          existencias: [],
        };
        aux.push(sizeEntry);
      }

      sizeEntry.imagenes.push(item.imagen);
      sizeEntry.colores.push(item.color);
      sizeEntry.existencias.push(item.cantidad);
    });

    return aux;
  }

  get numberOfColors() {
    const uniqueColors = [];
    let numberOfColors = 0;

    this.#shoes.forEach((item) => {
      if (!uniqueColors.includes(item.color)) {
        uniqueColors.push(item.color);
        numberOfColors++;
      }
    });

    return numberOfColors;
  }
}
