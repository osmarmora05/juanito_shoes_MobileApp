import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputIcon from "./InputIcon";
import Cap from "../../../assets/icons/Cap.svg";
import Cart from "../../../assets/icons/Cart.svg";
import Buscar from "../../../assets/icons/Buscar.svg";
import { theme } from "../../theme";

const Header = ({ navigation }) => {
  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.containerSubPrincipal}>
        <View style={styles.containerExplora}>
          <Cap style={styles.cap} />
          <Text style={styles.explora}>Explora</Text>
        </View>
        <TouchableOpacity
          style={styles.cart}
          onPress={() => navigation.navigate("ShoppingCart")}
        >
          <Cart />
        </TouchableOpacity>
      </View>
      <InputIcon
        icon={<Buscar />}
        placeholder="Buscar zapatos..."
        onPress={() => {
          console.log("Pronto");
        }}
      />
      {/* Componente del categorías */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    padding: 20,
    gap: 10,
    minWidth: "100%",
  },
  containerSubPrincipal: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  containerExplora: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  explora: {
    color: theme.colors.text.default,
    fontSize: 32,
    fontWeight: "900",
  },
  cap: {
    position: "absolute",
    top: -5,
    left: -15,
  },
  cart: {
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 999,
  },
});

export default Header;
