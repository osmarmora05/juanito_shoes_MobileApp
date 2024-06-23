import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StyledText from "../../components/ui/StyledText";
import { theme } from "../../theme";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import QuantityOfProducts from "../../components/QuantityOfProducts";
import useCount from "../../hooks/useCount";
import { useCart } from "../../hooks/useCart";

// `color`: Diccionario que contiene los colores en español (que devuelve pb) y retornar su valor correspondiente en hex
const colors = {
  rojo: "#DC2626",
  azul: "#2563EB",
  amarillo: "#FACC15",
  verde: "#16A34A",
  blanco: theme.colors.bg.default,
  gris: "#6B7280",
  café: "#78716C",
  naranja: "#F97316",
  rosado: "#E11D48",
  morado: "#7C3AED",
  negro: "#18181B",
};

export default function ProductDetails() {
  const { params } = useRoute();
  const navigation = useNavigation();
  // Obtenemos el objeto de tipo Card
  const item = params?.data;
  // Estado que almacena el zapato junto con su cantidada, imagen etc,
  // es decir todad la info necesaria para crear el detalle
  const [shoes, setShoes] = useState(item.sizesWithYourColorsAndQuantities);
  // Estado que almacena la talla del zapato, por defecto selccionamos la primera talla
  const [selectedSize, setSelectedSize] = useState(shoes[0]?.talla || null);
  // Estado que almecena el indice del color, por defecto es 0
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const mark = item.mark;
  const widthMultiplier = calculateWidthMultiplier(mark);
  // variable que almacena el zapato seleccionado junto a la talla y su color
  const selectedShoe = shoes.find((shoe) => shoe.talla === selectedSize);

  // Importamos la funcion `useCount` que brinda los metodos necesarios para crear el contador de forma modular

  const { count, increment, decrement, reset } = useCount(
    1, // Initial count
    parseInt(selectedShoe?.existencias[selectedColorIndex] || "0") // Maximum value
  );

  const { cart, addToCart, clearCart, removeFromCart } = useCart();

  // useEffect para agregar el nombre del zapatos como titutlo en la barra de navegacion
  useEffect(() => {
    navigation.setOptions({
      headerTitle: item.name,
    });
  }, []);

  useEffect(() => {
    console.log("Carrito");
    console.log(cart);
  }, [cart]);

  /*
  `handleSizeSelect`: Permite actualizar la talla seleccionada por el usuario, junto con su color (que escogemos el primer color) y contador con su cantidad de compra (que es 1)
  */
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedColorIndex(0); // Reset color index to default on size change
    reset(1);
  };

  /*
  `handleColorSelect`: Permite actualizar el color seleccionado por el usario junto con su cantidad de compra
  */

  const handleColorSelect = (index) => {
    setSelectedColorIndex(index);
    reset(parseInt(selectedShoe?.existencias[index] || "0"));
  };
  /*
   `handleAddToCart`: Permite agregar al contexto Cart el zapato comprado por el usuario(se agrega un objeto)

   1. Buscamos aquel zapato que sea igual a la talla seleccionada por el usuario
   2. Establecemos el color y la imagen, con el estado `selectedColorIndex` ya que este almacena el indice del color seleccionado (es el grupo de colores que esta en la interfaz a la derecha)
  */
  const handleAddToCart = () => {
    const selectedShoe = shoes.find((shoe) => shoe.talla === selectedSize);
    const selectedImage = selectedShoe.imagenes[selectedColorIndex];
    const selectedColor = selectedShoe.colores[selectedColorIndex];
    const selectedQuantity = count;
    addToCart({
      id_modelo: selectedShoe.id_modelo,
      id_inventario: selectedShoe.id_inventario,
      talla: selectedShoe.talla,
      imagen: selectedImage,
      color: selectedColor,
      cantidad_compra: selectedQuantity,
      existencias: parseInt(selectedShoe.existencias[selectedColorIndex]),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            {/* Size */}
            {/* TODO: Agregar un scrool vertical por si hay muchas tallas*/}
            <View style={styles.sizeContainer}>
              <StyledText extraSmall>Tamaño</StyledText>
              {shoes.map((x) => (
                <TouchableOpacity
                  key={x.talla}
                  style={[
                    styles.sizeView,
                    {
                      borderColor:
                        selectedSize === x.talla
                          ? theme.colors.text.hint
                          : "#d1d1d1",
                    },
                  ]}
                  onPress={() => handleSizeSelect(x.talla)}
                >
                  <StyledText textAlign="center">{x.talla}</StyledText>
                </TouchableOpacity>
              ))}
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Text
                style={[
                  styles.brandText,
                  {
                    fontSize: mark.length <= 4 ? theme.font.big.fontSize : 84,
                    textAlignVertical: mark.length <= 4 ? "bottom" : "center",
                    width: `${widthMultiplier * 100}%`,
                    height: mark.length <= 4 ? "56%" : "auto",
                  },
                ]}
              >
                {mark}
              </Text>
              <Image
                style={styles.productImage}
                source={{
                  uri: selectedShoe
                    ? selectedShoe.imagenes[selectedColorIndex]
                    : item.imageCover,
                }}
              />
            </View>

            {/* Color */}
            {/* TODO: Agregar un scrool vertical, en el caso que haya muchos zapatos */}
            <View style={styles.colorContainer}>
              <StyledText extraSmall>Color</StyledText>
              {selectedShoe?.colores.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorView,
                    {
                      borderColor:
                        selectedColorIndex === index
                          ? theme.colors.text.hint
                          : "#d1d1d1",
                    },
                  ]}
                  onPress={() => handleColorSelect(index)}
                >
                  <View
                    style={[
                      styles.colorBlock,
                      { backgroundColor: colors[`${color}`] },
                    ]}
                  ></View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            {/* Title & Stock */}
            <View>
              <View style={{ marginBottom: 10 }}>
                <StyledText medium extraBold textAlign="start">
                  {item.name}
                </StyledText>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <StyledText medium bold>
                    $ {item.price}
                  </StyledText>
                  <StyledText normal extraBold hint>
                    {item.category}
                  </StyledText>
                </View>

                <QuantityOfProducts
                  increase={increment}
                  decrease={decrement}
                  value={count}
                  maximumValue={parseInt(
                    selectedShoe?.existencias[selectedColorIndex] || "0"
                  )}
                />
              </View>
            </View>
            <View>
              {/* TODO: No centrar texto: El texto este alineado a la derecha
                  Y que ocupe todo el tamaño del padre(No justificado)
              */}
              <StyledText textAlign="center">{item.description}</StyledText>
            </View>
            <StyledPrimaryButton
              text={"Agregar al carrito"}
              handleOnPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const calculateWidthMultiplier = (text) => {
  // Base Width Multiplier
  const baseMultiplier = 1.9;
  const additionalMultiplier = 0.02;

  // Increase width by 10% for each additional character
  return baseMultiplier + text.length * additionalMultiplier;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "auto",
  },
  innerContainer: {
    maxWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  sizeContainer: {
    width: "20%",
    paddingTop: 50,
    alignItems: "center",
    gap: 10,
  },
  sizeView: {
    width: 55,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: theme.colors.bg.default,
    borderWidth: 2,
    borderColor: theme.colors.text.hint,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 450,
  },
  brandText: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Poppins Black",
    color: theme.colors.text.hint,
    opacity: 0.3,
    transform: [{ rotate: "90deg" }],
    textTransform: "uppercase",
    textAlign: "center",
  },
  productImage: {
    height: 180,
    width: 250,
    transform: [{ rotate: "-20deg" }],
    position: "absolute",
  },
  colorContainer: {
    width: "20%",
    paddingTop: 50,
    gap: 10,
    alignItems: "center",
  },
  colorView: {
    width: 55,
    height: 36,
    backgroundColor: theme.colors.bg.default,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.text.hint,
  },
  colorBlock: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: 0.2,
  },
  descriptionContainer: {
    display: "flex",
    paddingBottom: 20,
    gap: 10,
  },
});
