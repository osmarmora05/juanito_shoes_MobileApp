import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Trash from "../../assets/icons/Trash.svg";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";
import QuantityOfProducts from "./QuantityOfProducts";
import { useCart } from "../hooks/useCart";
import { showCustomToast } from "../utils";
import useCount from "../hooks/useCount";
import { useEffect } from "react";

export default function CartCard(props) {
  const { item, fun } = props;
  const { removeFromCart } = useCart();
  const { count, increment, decrement, reset } = useCount(
    item.cantidad_compra,
    item.existencias
  );

  useEffect(() => {
    fun(count);
  }, [count]);

  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <View style={styles.containerimage}>
          <Image style={styles.image} source={{ uri: `${item.imagen}` }} />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <StyledText extraSmall textAlign="left" numberOfLines={1}>
              {item.nombre}
            </StyledText>
            <Text
              style={{
                fontSize: 15,
                color: theme.colors.text.hint,
              }}
            >
              Color: {item.color}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: theme.colors.text.hint,
              }}
            >
              Talla: {item.talla}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 10,
            }}
          >
            <StyledText extraSmall bold textAlign="left">
              ${(item.precio * count).toFixed(2)}
            </StyledText>
            <QuantityOfProducts
              increase={increment}
              decrease={decrement}
              value={count}
              maximumValue={item.existencias}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.trashContainer}
        onPress={() => {
          showCustomToast("error", "", `Se elimino ${item.nombre}`, "");
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
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    width: "65%",
    justifyContent: "space-between",
    height: 100,
  },
});
