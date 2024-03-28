import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import data from "../../data/products.json";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {
  const [productData, setProductData] = useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <ProductCard item={item}/>
      </View>
      //   </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (typeof data !== "undefined" && data && data.length > 0) {
      setProductData(data);
    }
  }, []);

  return (
    <View style={{ flex: 1}}>
      {/* <Text>Hola desde home</Text> */}
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
  contentContainerStyle: {
    alignItems: "center",
  },
});
