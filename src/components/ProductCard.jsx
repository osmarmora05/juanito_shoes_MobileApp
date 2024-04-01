import { View, StyleSheet, TouchableOpacity,Image } from "react-native";
import Plus from "../../assets/icons/plus.svg";
import StyledText from "./ui/StyledText";
import { theme } from "../theme";

export default function ProductCard(props) {
  const { item } = props;

  return (
    <View style={styles.mainBox}>
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{ uri: `${item.Imagen}` }}
        />
        <View style={styles.infoContainer}>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.Nombre}
          </StyledText>
          <StyledText extraSmall bold textAlign="left" numberOfLines={1}>
            {item.Precio}
          </StyledText>
        </View>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Plus width={14} height={14} />
      </TouchableOpacity>
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
  },

  infoContainer: {
    width: "70%",
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