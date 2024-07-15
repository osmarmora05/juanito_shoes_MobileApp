import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { theme } from "../../theme";
import InputIcon from "../../components/ui/InputIcon";
import ArrowLeftIcon from "../../../assets/icons/arrows/arrow-left.svg";
import SearchIcon from "../../../assets/icons/Buscar.svg";
import { useState, useEffect } from "react";
import { getSpecificInventory } from "../../controllers/inventario.controller";
import { Card } from "../../Card";
import MinCard from "../../components/MinCard";
import StyledText from "../../components/ui/StyledText";
import { MotiView } from "moti";

function createArraysOfCardObjects(inventory) {
  const aux = {};
  inventory.forEach((item, index) => {
    aux[index] = new Card(item);
  });

  return Object.values(aux);
}

export default function Search({ navigation }) {
  // Almacena un arreglo de objetos Cards
  const [shoes, setShoes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getShoes = async (shoeName) => {
    try {
      setLoading(true);
      const result = await getSpecificInventory(shoeName);
      if (result == null || result.length == 0) {
        setShoes([]);
        setLoading(false)
      } else {
        const arraysOfCardObject = createArraysOfCardObjects(result);
        setShoes(arraysOfCardObject);
        setLoading(false);
      }
    } catch (e) {
      console.log("There was an error in getShoes - Search screen", e);
      throw e;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: index * 200 }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProductDetails", { data: item });
          }}
        >
          <MinCard item={item} />
        </TouchableOpacity>
      </MotiView>
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue != "") {
        getShoes(inputValue);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.arrowIconContainer}>
            <ArrowLeftIcon />
          </View>
        </TouchableOpacity>

        <InputIcon
          icon={<SearchIcon />}
          autofocus
          placeholder={"Buscar"}
          onChangeText={(newText) => setInputValue(newText)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : shoes.length === 0 && inputValue !== "" ? (
        <StyledText textAlign="center">No se encontraron resultados</StyledText>
      ) : (
        <FlatList
          data={shoes}
          keyExtractor={(item) => `${item.modeloId}`}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => <StyledText></StyledText>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.defaultDark,
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 55,
    paddingTop: 20,
    gap: 10,
  },
  arrowIconContainer: {
    justifyContent: "center",
    height: 40,
  },
  contentContainerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
});
