import { Button, Image, StyleSheet, Text, View } from "react-native";
import CongratulationsLogo from "../../../assets/icons/Congratulations.svg";
import StyledText from "../../components/ui/StyledText";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import { useCart } from "../../hooks/useCart";
import { CommonActions } from "@react-navigation/native";
import { useOrderDetails } from "../../hooks/useOrderDetails";
import { MotiView } from "moti";

export default function Congratulations({ navigation }) {
  const { clearCart } = useCart();
  const { getPedidos } = useOrderDetails();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 100 }}
      style={styles.container}
    >
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
        style={styles.image}
      >
        <CongratulationsLogo />
      </MotiView>
      <StyledText bold extraMedium>
        ¡Felicidades!
      </StyledText>
      <StyledText medium>Tu orden esta lista!</StyledText>
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 300 }}
        style={{ marginTop: 10 }}
      >
        <StyledPrimaryButton
          handleOnPress={() => {
            clearCart();
            getPedidos();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: "BottomTabNavigator" },
                  {
                    name: "BottomTabNavigator",
                  },
                ],
              })
            );
          }}
          text="Volver al menú principal"
        />
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginBottom: 20,
    backgroundColor: "#DFEFFF",
    borderRadius: 100,
  },
});
