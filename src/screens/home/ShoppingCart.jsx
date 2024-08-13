import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { theme } from "../../theme";
import CartCard from "../../components/CartCard";
import { useCart } from "../../hooks/useCart";
import Toast from "react-native-toast-message";
import {
  agregarMovimiento,
  agregarPedido,
} from "../../controllers/index.controller";
import { cargarUsuarioLocal } from "../../localStorage/usuario.local";
import { modificarInventario } from "../../controllers/inventario.controller";

export default function ShoppingCart({ navigation }) {
  function getCount(count) {
    setCount(count);
  }

  // Carga de los productos en el carrito
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(1);

  // Contexto del carrito
  const { cart } = useCart();

  // Esta variable contendra el valor total de cada zapato con su respectiva cantidad y precio calculados
  // Con esta tambien se pondra calcular el iva de toda la compra
  const [total, setTotal] = useState(0);

  // Cada vez que se elimine un zapato, se realizara nuevamente el calculo
  useEffect(() => {
    // NewTotal tendra el valor total de los productos, multiplicando la cantidad de productos que lleva el usuario y el precio
    let newTotal = 0;
    cart.forEach((item) => {
      newTotal += item.cantidad_compra * item.precio;
    });
    setTotal(newTotal);
  }, [cart, count]);

  const [user, setUser] = useState({});
  // Usuario que esta realizando la compra
  useEffect(() => {
    const getUsuario = async () => {
      setUser(await cargarUsuarioLocal());
    };
    getUsuario();
  }, []);

  const agregarMovimientosPedido = async (pedido) => {
    cart.forEach(async (item) => {
      await agregarMovimiento({
        data: item,
        user_id: user.id,
        pedido_id: pedido.id,
      });
    });
  };

  const modificarInventarioCarrito = async () => {
    cart.forEach(async (item) => {
      await modificarInventario(item);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productCardContainer}>
        <CartCard item={item} fun={getCount} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="none"
          visible={isLoading}
          onRequestClose={() => {}}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          </View>
        </Modal>
        {cart && cart.length > 0 ? (
          <>
            <Text style={styles.title}>{cart.length} Items</Text>
            <FlatList
              data={cart}
              keyExtractor={(item, index) => `${item.id_inventario}, ${index}`}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              No hay productos en el carrito
            </Text>
          </View>
        )}

        <Toast />
      </View>
      {cart && cart.length > 0 ? (
        <View style={styles.container_cart}>
          <View style={styles.sub_container_cart}>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>$ {total.toFixed(2)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                $ {(total + (total * 0.15)).toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              try {
                setIsLoading(true);

                // Primero se crea el pedido
                const pedido = await agregarPedido({
                  user_id: user.id,
                  total: (total + total * 0.15).toFixed(2),
                  sub_total: total,
                });

                // Agregar los movimientos de los productos (Salidas)
                await agregarMovimientosPedido(pedido);

                // Modificar el estado de los productos en el inventario
                await modificarInventarioCarrito();

                setIsLoading(false);
                navigation.navigate("Congratulations");
              } catch (error) {
                console.log("Error en ShoppingCart: ", error);
              }
            }}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.defaultDark,
    padding: 15,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text.primary,
    marginLeft: 10,
  },
  contentContainerStyle: {
    alignItems: "center",
    flexDirection: "column",
  },
  productCardContainer: {
    margin: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 20,
  },
  container_cart: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
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
