import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import data from "../../data/cart.json";
import { FlatList } from "react-native-gesture-handler";
import { theme } from "../../theme";
import CartCard from "../../components/CartCard";
import { useCart } from "../../hooks/useCart";
import Toast from "react-native-toast-message";

export default function ShoppingCart({ navigation }) {
  const { cart } = useCart();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productCardContainer}>
        <CartCard item={item} />
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
      <Toast/>
    </View>
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
});
