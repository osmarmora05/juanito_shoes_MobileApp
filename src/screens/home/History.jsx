import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import StyledText from "../../components/ui/StyledText";
import { useOrderDetails } from "../../hooks/useOrderDetails";
import { MotiView } from "moti";

export default function History({ navigation }) {
  const { pedidos } = useOrderDetails();

  // Función para formatear la fecha en formato dd/mm/yyyy
  const formatearFecha = (fechaUpdate) => {
    const fecha = new Date(fechaUpdate);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son base 0, así que se suma 1.
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  return (
    <View style={styles.container}>
      {pedidos.length > 0 ? (
        <>
          <StyledText medium textAlign="center">
            Historial de pedidos
          </StyledText>
          <ScrollView style={{ marginTop: 10 }}>
            {pedidos.map((pedido, index) => (
              <MotiView
                key={pedido.id}
                from={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 200 }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OrderDetails", {
                      id: pedido.id,
                      total: pedido.total,
                      sub_total: pedido.sub_total,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    borderTopColor: "#ccc",
                    borderTopWidth: 2,
                    borderStyle: "dashed",
                    paddingVertical: 20,
                  }}
                >
                  <StyledText medium>{`factura# ${index + 1}`}</StyledText>
                  <Text
                    style={{ color: "blue", fontSize: 18, fontWeight: "500" }}
                  >
                    {formatearFecha(pedido.updated)}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </ScrollView>
        </>
      ) : (
        <StyledText medium textAlign="center">
          No hay pedidos aún
        </StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 25,
    gap: 10,
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
