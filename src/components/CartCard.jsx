import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Trash from "../../assets/icons/Trash.svg";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";
import QuantityOfProducts from "./QuantityOfProducts";
import { useCart } from "../hooks/useCart";
import { showCustomToast } from "../utils";

export default function CartCard(props) {
  const { item } = props;
  const { removeFromCart } = useCart();

  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <View style={styles.containerimage}>
          <Image style={styles.image} source={{ uri: `${item.imagen}` }} />
        </View>
        <View style={styles.infoContainer}>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.nombre}
          </StyledText>
          <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
            ${item.precio}
          </StyledText>
          <QuantityOfProducts
            maximumValue={item.existencias}
            value={item.cantidad_compra}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.trashContainer}
        onPress={() => {
          showCustomToast(
            "error",
            "",
            `Se elimino ${item.nombre}`,
            "",
          );
          removeFromCart(item);
        }}
      >
        <Trash width={15} height={15} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: theme.colors.bg.default,
    borderRadius: 14,
    padding: 10,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    gap: 15,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    transform: [{ rotate: "-14deg" }],
  },
  containerimage: {
    backgroundColor: theme.colors.bg.defaultDark,
    borderRadius: 14,
  },

  trashContainer: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    width: "65%",
  },
});
