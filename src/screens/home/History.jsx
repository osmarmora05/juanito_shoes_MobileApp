import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import StyledText from "../../components/ui/StyledText";
import { useEffect, useState } from "react";
import { cargarUsuarioLocal } from "../../localStorage/usuario.local";
import { obtenerPedido } from "../../controllers/pedidos.controller";
import { theme } from "../../theme";
import { useOrderDetails } from "../../hooks/useOrderDetails";

export default function History({ navigation }) {
  const {pedidos} = useOrderDetails()

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
      {
        (pedidos.length > 0 ? (
          <>
            <StyledText medium textAlign="center">
              Historial de pedidos
            </StyledText>
            <ScrollView style={{ marginTop: 10 }}>
              {pedidos.map((pedido, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OrderDetails", {
                      id: pedido.id,
                      total: pedido.total,
                      sub_total: pedido.sub_total,
                    })
                  }
                  key={index}
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
              ))}
            </ScrollView>
          </>
        ) : (
          <StyledText medium textAlign="center">
            No hay pedidos aún
          </StyledText>
        ))
      }
      {/* <Modal
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
      </Modal> */}
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
