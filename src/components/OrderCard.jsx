import { MotiView } from "moti";
import { theme } from "../theme";
import StyledText from "./ui/StyledText";
import { Image, StyleSheet, Text, View } from "react-native";

export default function OrderCard({
  imagen = "Imagen no disponible",
  nombre = "Nombre no disponible",
  color = "Color no disponible",
  talla = "Talla no disponible",
  cantidad = 1,
  precio = "Precio no disponible",
  time = 0,
}) {
  return (
    <>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: time }}
        style={styles.mainBox}
      >
        <View style={styles.box}>
          <View style={styles.containerimage}>
            <Image style={styles.image} source={{ uri: `${imagen}` }} />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <StyledText extraSmall textAlign="left" numberOfLines={1}>
                {nombre}
              </StyledText>
              <Text
                style={{
                  fontSize: 15,
                  color: theme.colors.text.hint,
                }}
              >
                Color: {color}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  color: theme.colors.text.hint,
                }}
              >
                Talla: {talla}
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
              <StyledText extraMedium medium>{`$${precio}`}</StyledText>
              <StyledText extraMedium medium>{`x${cantidad}`}</StyledText>
            </View>
          </View>
        </View>
      </MotiView>
    </>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: theme.colors.bg.default,
    borderRadius: 14,
    padding: 10,
    marginTop: 10,
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
  infoContainer: {
    width: "65%",
    justifyContent: "space-between",
    height: 100,
  },
});
