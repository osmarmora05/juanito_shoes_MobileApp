import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import data from "../../data/products.json";
import { FlatList } from "react-native-gesture-handler";
import { theme } from "../../theme";

export default function Home({ navigation }) {
  const [productData, setProductData] = useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.productCardcontainer}
        onPress={() => {
          navigation.navigate("ProductDetails", { data: item });
        }}
      >
        <ProductCard item={item} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setProductData(data);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <ProductCard /> */}
      <FlatList
        data={productData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.defaultDark,
  },
  contentContainerStyle: {
    alignItems: "center",
  },

  productCardcontainer: {
    margin: 20,
  },
});
