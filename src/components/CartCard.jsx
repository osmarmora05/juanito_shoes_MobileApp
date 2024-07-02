import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Trash from "../../assets/icons/Trash.svg";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";
import QuantityOfProducts from "./QuantityOfProducts";

export default function CartCard(props) {
  const { item } = props;

  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <View style={styles.containerimage}>
          <Image style={styles.image} source={{ uri: `${item.Imagen}` }} />
        </View>
        <View style={styles.infoContainer}>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.Nombre}
          </StyledText>
          <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
            ${item.Precio}
          </StyledText>
          <QuantityOfProducts />
        </View>
      </View>
      <TouchableOpacity
        style={styles.trashContainer}
        onPress={() => {
          console.log("Pronto");
        }}
      >
        <Trash width={14} height={14} />
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
  },
});
