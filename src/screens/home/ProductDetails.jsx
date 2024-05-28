import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import StyledText from "../../components/ui/StyledText";
import { theme } from "../../theme";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const HEIGHT_WINDOW = Dimensions.get("window").height;

export default function ProductDetails() {
  const { params } = useRoute();
  const navigation = useNavigation();
  const item = params?.data;
  const marca = item.Marca;
  const widthMultiplier = calculateWidthMultiplier(marca);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: item.Nombre,
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            {/* Size */}
            <View style={styles.sizeContainer}>
              <StyledText extraSmall>Tamaño</StyledText>
              <View style={styles.sizeView}>
                <StyledText textAlign="center">{item.Tamaño}</StyledText>
              </View>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
              <Text
                style={[
                  styles.brandText,
                  {
                    fontSize: marca.length <= 4 ? theme.font.big.fontSize : 84,
                    textAlignVertical: marca.length <= 4 ? "bottom" : "center",
                    width: `${widthMultiplier * 100}%`,
                    height: marca.length <= 4 ? "56%" : "auto",
                  },
                ]}
              >
                {marca}
              </Text>
              <Image
                style={styles.productImage}
                source={{ uri: `${item.Imagen}` }}
              />
            </View>

            {/* Color */}
            <View style={styles.colorContainer}>
              <StyledText extraSmall>Color</StyledText>
              <View style={styles.colorView}>
                <View
                  style={[styles.colorBlock, { backgroundColor: item.Color }]}
                ></View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            {/* Title & Stock */}
            <View>
              {/* Shoe name */}
              <View style={{ marginBottom: 18 }}>
                <StyledText medium extraBold textAlign="center">
                  {item.Nombre}
                </StyledText>
              </View>
              {/* Price and category */}
              <View>
                <StyledText medium bold>
                  {item.Precio}
                </StyledText>
                <StyledText normal extraBold hint>
                  {item.Categoría}
                </StyledText>
              </View>
            </View>
            {/* quantity */}
            {/* <View></View> */}
            {/* Description */}
            <View>
              <StyledText textAlign="center">{item.Descripción}</StyledText>
            </View>

            <StyledPrimaryButton text={"Agregar al carrito"} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const calculateWidthMultiplier = (text) => {
  // Base Width Multiplier
  const baseMultiplier = 1.9;
  const additionalMultiplier = 0.02;

  // Increase width by 10% for each additional character
  return baseMultiplier + text.length * additionalMultiplier;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: HEIGHT_WINDOW,
  },
  innerContainer: {
    maxWidth: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  sizeContainer: {
    width: "20%",
    paddingTop: 50,
    alignItems: "center",
  },
  sizeView: {
    width: 55,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: theme.colors.bg.default,
    borderWidth: 2,
    borderColor: theme.colors.text.hint,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 450,
  },
  brandText: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Poppins Black",
    color: theme.colors.text.hint,
    opacity: 0.3,
    transform: [{ rotate: "90deg" }],
    textTransform: "uppercase",
    textAlign: "center",
  },
  productImage: {
    height: 180,
    width: 250,
    transform: [{ rotate: "-20deg" }],
    position: "absolute",
  },
  colorContainer: {
    width: "20%",
    paddingTop: 50,
    alignItems: "center",
  },
  colorView: {
    width: 55,
    height: 36,
    backgroundColor: theme.colors.bg.default,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.text.hint,
  },
  colorBlock: {
    width: 14,
    height: 14,
    borderRadius: 2,
    borderWidth: 0.2,
  },
  descriptionContainer: {
    gap: 10,
  },
});
