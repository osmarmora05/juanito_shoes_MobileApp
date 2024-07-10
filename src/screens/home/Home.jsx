import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { FlatList, SectionList } from "react-native";
import { theme } from "../../theme";
import { getLimitedInventario } from "../../controllers/index.controller";
import { Card } from "../../Card";
import { useFilters } from "../../hooks/useFilters";
import StyledText from "../../components/ui/StyledText";
import Header from "../../components/ui/Header";

/*
  Referencias
  - https://www.youtube.com/watch?v=jow2lXber3A - Video en el que me base para crear la logica para crear el scroll infinito
  - https://www.youtube.com/watch?v=i4jKoTlSqvI - Implementacion profunda del FlatList
  - https://www.youtube.com/watch?v=SitSOHyvBuE - Explica uso del refreshing
  - https://www.youtube.com/watch?v=pHLFJs7jlI4 - Explica uso del refreshing
*/

/*
  `createArraysOfCardObjects`: Permite crear un arreglo de objetos Card

  1. Recibe por parametro `inventory` que es un arreglo que contiene otros otros arreglos (cada uno de estos representa un zapato) y que como item tiene objetos que retorna la tabla inventario(son las variantes que puede tener un zapatos, es decir si un zapatos tiene dos colore, entonces habran dos objetos),
    de los registro de la tabla inventario

  2. Recorremos `inventory` y cremos un objeto de la clase Card pasandole al constructor el erraglo que representa un zapato, y qye dentro de este tiene objetos

  3. Retornamos un arreglo que contiene multiples objetos de la clase Card
*/
function createArraysOfCardObjects(inventory) {
  const aux = {};
  inventory.forEach((item, index) => {
    aux[index] = new Card(item);
  });

  return Object.values(aux);
}

export default function Home({ navigation }) {
  // Scroll infinito
  // Almacena un arreglo de objetos Cards
  const [shoes, setShoes] = useState([]);
  // Flag de fetch de data. El uso principal, es mostrar un loader cuando se esta trayendo mas data
  const [loading, setLoading] = useState(false);
  // Manjeador de lista paginada. El uso principal es que cuando el usuario solicite mas datos, se aumenta este estado para aumnetar la paginacion de la API y traer datos nuevos
  const [currentPage, setCurrentPage] = useState(1);
  // Flag que chequea si la API devuelve algun datos
  const [isShoes, setIsShoes] = useState(true);
  // Flag que permite saber si se refrescan los datos del estado shoes
  const [refreshing, setRefreshing] = useState(false);
  // Scroll infinito

  // Filtros
  const { filter, filterShoes, updateFilter } = useFilters();
  const [selectedButton, setSelectedButton] = useState("Todos");

  /*
    `getShoes`: Funcion que permite obtener los zapatos en existencias obteniendolo desde el controlador(funcion) `getLimitedInventario`. Recibe por parametro `reset` que es una
    flag que permite saber si reinciar el estado `shoes` (que contiene las existencias), basicamente sustuir el valor de `shoes` con los nuevos que retorna la funcion `getLimitedInventario` (en el caso que haya nuevos datos claro, si no hay pues se muestran los de antes)

    1. Actualizamos el estado `loading` para indicarle al usuario que estamos trayendo datos
    2. Invocamos la funcion `getLimitedInventario` para que retorne las existencias
    3. La funcion `getLimitedInventario` puede retornar dos elementos, 1 un arreglo y dos null que quiere decir que no hay mas lista de paginas que consultar de la bd, en caso que sea nulo, actualizamos el estado `loading` y `isShoes` en falso que quiere decir que no hay mas zapatos y cancelamos la ejecucion de esta funcion
    4. invocamos la funcion `createArraysOfCardObjects` y le pasamos lo que retorna la funcion `getLimitedInventario`, para asi obtener el arreglo que contiene los objetos Cards
    5. Chequeamos que `reset` sea true, en caso de ser asi, actualizamos el estado `shoes` con el arreglo de objetos Cards, en caso de ser false agregamos los objetos cards alfinal del arreglo del estado `shoes`
    6. Actualizamos el estado `loading` para indicarle al usuario que finalizo el fetch
  */

  const getShoes = async (reset = false) => {
    try {
      console.log("getShoes");
      setLoading(true);
      const result = await getLimitedInventario(currentPage);
      console.log(result);
      if (result == null || result.length == 0) {
        console.log("Dentro del if");
        setLoading(false);
        setIsShoes(false);
        return;
      }

      const arraysOfCardObject = createArraysOfCardObjects(result);

      if (reset) {
        setShoes(arraysOfCardObject);
      } else {
        const filteredCards = arraysOfCardObject.filter(
          (newItem) => !shoes.some((item) => item.modeloId === newItem.modeloId)
        );
        setShoes((prevData) => [...prevData, ...filteredCards]);
      }

      setLoading(false);
      setRefreshing(false);
      setIsShoes(true);
    } catch (e) {
      console.log("There was an error in getShoes ", e);
      throw e;
    }
  };

  /*
    `loadMoreShoes`: Permite obtener mas zapatos aumento la lista paginada, pero antes hay que chequear al valor del estado `loading` y si el estado `isShoes` (flag que indica que si traemos mas datos, sea un valor o nulo) es true
  */
  const loadMoreShoes = () => {
    if (!loading && isShoes && selectedButton === "Todos") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  /*
  `handleRefresh`: Pemite traer nueva data, desde la lista paginada 1(miremolos como desde la fila 1)
  */

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    setShoes([]);
    getShoes(true);
  };

  // TODO: DOcs
  const handleButtonPress = (value) => {
    setSelectedButton(value);
    updateFilter(value);

    if (value !== "Todos") {
      setLoading(false);
    }
  };

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

  const renderHeader = () => {
    // Obtenemos categorías únicas de los zapatos
    const uniqueCategories = [];
    shoes.forEach((item) => {
      if (!uniqueCategories.includes(item.category)) {
        uniqueCategories.push(item.category);
      }
    });

    // Añadimos 'Todos' como la primera categoría
    const categories = ["Todos", ...uniqueCategories];
    return (
      <View>
        <Header navigation={navigation} />
        <ScrollView
          horizontal
          style={{
            maxHeight: 45,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleButtonPress(category)}
            >
              <View
                style={{
                  backgroundColor:
                    selectedButton === category
                      ? theme.colors.bg.primary
                      : theme.colors.bg.default,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              >
                <StyledText
                  {...(selectedButton === category
                    ? { textLight: true }
                    : { textDefault: true })}
                >
                  {category}
                </StyledText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    if (selectedButton === "Todos") {
      getShoes();
    }

    console.log(currentPage);
  }, [currentPage]);

  // useEffect(() => {
  //   console.log("Valor de shoes");
  //   console.log(shoes);
  //   console.log("Valor de filter");
  //   console.log(filter);
  // }, [shoes]);

  // CRITCAL: problemas de core, muchas consultas
  return (
    <View style={styles.container}>
      <FlatList
        data={filterShoes(shoes)}
        keyExtractor={(item) => `${item.modeloId}`}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMoreShoes}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
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
