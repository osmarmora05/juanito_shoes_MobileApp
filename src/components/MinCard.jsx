import { View, Image, StyleSheet } from "react-native";
import StyledText from "./ui/StyledText";
import ChevronRightIcon from "../../assets/icons/arrows/chevron-right.svg";
import { theme } from "../theme";

/* 
  El componente `MinCard` recibe un Objeto de tipo Card
*/

export default function MinCard(props) {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${item.imageCover}` }}
            style={styles.image}
          />
        </View>
        <View>
          <StyledText extraSmall textAlign="left" numberOfLines={1}>
            {item.name}
          </StyledText>
          <StyledText hint small numberOfLines={1}>
            {item.numberOfColors}{" "}
            {item.numberOfColors === 1 ? "Color" : "Colores"}
          </StyledText>
          <StyledText normal bold textAlign="left" numberOfLines={1}>
            $ {item.price}
          </StyledText>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <ChevronRightIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    width: "92%",
    alignContent: "space-between",
    gap: 10,
  },
  imageContainer: {
    backgroundColor: theme.colors.bg.defaultDark,
    borderRadius: 14,
    padding: 10,
    borderColor: "#d1d1d1",
    borderWidth: 2,
    height: 68,
    width: 68,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "contain",
    transform: [{ rotate: "-14deg" }],
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
  },
});