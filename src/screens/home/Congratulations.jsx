import { Button, Image, StyleSheet, Text, View } from "react-native";
import CongratulationsLogo from "../../../assets/icons/Congratulations.svg";
import StyledText from "../../components/ui/StyledText";
import StyledPrimaryButton from "../../components/ui/buttons/StyledPrimaryButton";
import { useCart } from "../../hooks/useCart";
import { CommonActions } from "@react-navigation/native";
import { useOrderDetails } from "../../hooks/useOrderDetails";

export default function Congratulations({ navigation }) {
  const { clearCart } = useCart();
  const { getPedidos } = useOrderDetails();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <CongratulationsLogo />
      </View>
      <StyledText bold extraMedium>
        ¡Felicidades!
      </StyledText>
      <StyledText medium>Tu orden esta lista!</StyledText>
      <View style={{ marginTop: 10 }}>
        <StyledPrimaryButton
          handleOnPress={() => {
            clearCart();
            getPedidos();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'BottomTabNavigator' },
                  {
                    name: 'BottomTabNavigator',
                  },
                ],
              })
            );
            
          }}
          text="Volver al menú principal"
        />
      </View>
    </View>
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
