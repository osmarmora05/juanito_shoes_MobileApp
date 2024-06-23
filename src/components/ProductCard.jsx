import { View, StyleSheet, Image } from "react-native";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";

/* 
  El componente `ProductCard` recibe un Objeto de tipo Card
*/

export default function ProductCard(props) {
  const { item } = props;
  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <Image style={styles.image} source={{ uri: `${item.imageCover}` }} />
        <View style={styles.infoContainer}>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.name}
          </StyledText>
          <StyledText hint normal>
            {item.numberOfColors}{" "}
            {item.numberOfColors === 1 ? "Color" : "Colores"}
          </StyledText>
          <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
            $ {item.price}
          </StyledText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    width: 150,
    height: 180,
    backgroundColor: theme.colors.bg.default,
    borderRadius: 14,
  },

  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
  },

  infoContainer: {
    width: "100%",
  },

  image: {
    width: 110,
    height: 110,
    resizeMode: "contain",
    transform: [{ rotate: "-14deg" }],
  },

  addToCartButton: {
    width: 30,
    height: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: theme.colors.bg.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
