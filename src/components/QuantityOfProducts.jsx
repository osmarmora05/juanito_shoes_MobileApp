import { View, Text } from "react-native";
import StyledText from "./ui/StyledText";
import Plus from "../../assets/icons/arithmetic/plus.svg";
import Minus from "../../assets/icons/arithmetic/minus.svg";

const defaultValue = 1;

export default function QuantityOfProducts({ value = defaultValue }) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: 70,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
      <StyledText extraSmall>{value}</StyledText>
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
    </View>
  );
}