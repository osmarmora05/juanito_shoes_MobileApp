import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Plus from "../../assets/icons/plus.svg";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";

export default function ProductCard(props) {
  const { item } = props;
  const firstVariants = item.variantes[0]
  const numberOfColors = item.variantes.length
  
  // console.log("Dentro del componente card")
  // console.log(item.variantes[0])
  // console.log(numberOfColors)

  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <Image style={styles.image} source={{ uri: `${firstVariants.imagen}` }} />
        <View style={styles.infoContainer}>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.nombre}
          </StyledText>
          <StyledText hint normal>
            {numberOfColors} Color
          </StyledText>
          <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
            $ {item.precio}
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
    padding: 16
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
