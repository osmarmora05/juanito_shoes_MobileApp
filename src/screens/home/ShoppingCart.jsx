import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { theme } from "../../theme";
import CartCard from "../../components/CartCard";
import { useCart } from "../../hooks/useCart";
import Toast from "react-native-toast-message";

export default function ShoppingCart() {
  function getCount(count) {
    setCount(count);
  }
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
      newTotal += count * item.precio;
    });
    setTotal(newTotal);
  }, [cart, count]);

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
                $ {(total + total * 0.15).toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Pronto carrito");
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
});
