import { View, TouchableOpacity } from "react-native";
import StyledText from "./ui/StyledText";
import Plus from "../../assets/icons/arithmetic/plus.svg";
import Minus from "../../assets/icons/arithmetic/minus.svg";

/*
  El componente `QuantityOfProducts` recibe 2 funciones:
    - `increase`: Aumenta el valor que contiene la prop value
    - `decrease`: Desaumenta el valor que contiene la prop value
  El prop `maximumValue` representa la existencia del zapato.
  El prop `value` representa los zapatos que se desea comprar
*/

export default function QuantityOfProducts({
  increase,
  decrease,
  maximumValue,
  value,
}) {
  return (
    <View>
      <StyledText>Existencias: {maximumValue}</StyledText>
      <View
        style={{
          flexDirection: "row",
          width: 70,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={decrease}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1.5,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Minus width={14} height={14} stroke={"#000"} />
          </View>
        </TouchableOpacity>

        <StyledText extraSmall>{value}</StyledText>

        <TouchableOpacity onPress={increase}>
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 1.5,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Plus width={14} height={14} stroke={"#000"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}