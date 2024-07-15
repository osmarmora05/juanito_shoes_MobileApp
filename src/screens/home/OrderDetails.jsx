import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { getImagen } from "../../controllers/imagen.controller";
import StyledText from "../../components/ui/StyledText";
import { useOrderDetails } from "../../hooks/useOrderDetails";
import { useEffect } from "react";
import OrderCard from "../../components/OrderCard";
import { theme } from "../../theme";

export default function OrderDetails() {
  const { params } = useRoute();
  const { id, total, sub_total } = params;
  const { movimientoPedido, fetchMovimientos, inventarios, loading } =
    useOrderDetails();

  useEffect(() => {
    fetchMovimientos({ id });
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.container_order}>
        <StyledText medium>Detalles del pedido</StyledText>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {movimientoPedido.map((movimiento, index) => {
            const inventarioPedido = inventarios[index];
            const imagen = inventarioPedido
              ? getImagen(
                  inventarioPedido.collectionId,
                  inventarioPedido.id,
                  inventarioPedido.imagen
                )
              : "Cargando...";

            return (
              <OrderCard
                time={(index + 1) *500}
                key={index}
                nombre={
                  inventarioPedido?.expand?.modelo_id?.expand?.catalogo_id
                    ?.nombre || "Nombre no disponible"
                }
                precio={
                  inventarioPedido?.expand?.modelo_id?.precio ||
                  "Nombre no disponible"
                }
                color={movimiento.color}
                imagen={imagen}
                talla={movimiento.talla}
                cantidad={movimiento.cantidad}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.container_cart}>
        <View style={styles.sub_container_cart}>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>$ {sub_total}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$ {total}</Text>
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="none"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  container_order: {
    padding: 15,
    height: "100%",
  },
  container_cart: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 130,
  },
  sub_container_cart: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
    borderStyle: "dashed",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
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
