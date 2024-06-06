import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import data from "../../data/cart.json";
import { FlatList } from "react-native-gesture-handler";
import { theme } from "../../theme";
import CartCard from "../../components/CartCard";

export default function ShoppingCart({ navigation }) {
  const [productData, setProductData] = useState(data);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productCardContainer}>
        <CartCard item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.length} Items</Text>
      <FlatList
        data={productData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
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
    margin:10,
  },
});
