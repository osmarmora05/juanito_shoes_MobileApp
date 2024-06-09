// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList
// } from "react-native";
// import { useState, useEffect } from "react";
// import ProductCard from "../../components/ProductCard";
// import { theme } from "../../theme";
// import { getLimitedInventario } from "../../controllers/index.controller";
// import StyledText from "../../components/ui/StyledText";

// export default function Home({ navigation }) {
//   // UWUW
//   const [shoes, setShoes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isShoes, setIsShoes] = useState(true);

//   const getShoes = async (reset = false) => {
//     try {
//       setLoading(true);
//       const result = await getLimitedInventario(currentPage);
//       if (result == null) {
//         setIsShoes(false);
//         return;
//       }
//       setShoes((prevData) => [...prevData, ...result]);
//     } catch (e) {
//       console.log("there was an error in getShoes ", e);
//       throw e;
//     } finally {
//       setLoading(false);
//     }
//   };
//   const loadMoreShoes = () => {
//     if (!loading && isShoes) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const renderItem = ({ item, index }) => {
//     return (
//       <TouchableOpacity
//         style={styles.productCardcontainer}
//         onPress={() => {
//           navigation.navigate("ProductDetails", { data: item });
//         }}
//       >
//         <ProductCard item={item} />
//       </TouchableOpacity>
//     );
//   };

//   useEffect(() => {
//     getShoes();
//   }, [currentPage]);

//   useEffect(() => {
//     console.log(shoes);
//   }, [shoes]);

//   return (
//     <View style={styles.container}>
//       {/* <ProductCard /> */}
//       <FlatList
//         data={shoes}
//         keyExtractor={(item) => `${item.id}`}
//         renderItem={renderItem}
//         numColumns={2}
//         onEndReached={isShoes && loadMoreShoes}
//         onEndReachedThreshold={0.1}
//         refreshing={loading}
//         onRefresh={()=>console.warn("En refresh")}
//         ListFooterComponent={() =>
//           loading ? (
//             <ActivityIndicator />
//           ) : !isShoes ? (
//             <StyledText>Vaya! Parece que has llegado al final</StyledText>
//           ) : null
//         }
//         contentContainerStyle={styles.contentContainerStyle}
//         // debug
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: theme.colors.bg.defaultDark,
//     backgroundColor: "red"
//   },
//   contentContainerStyle: {
//     alignItems: "center",
//   },

//   productCardcontainer: {
//     margin: 20,
//   },
// });

// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
// } from "react-native";
// import { useState, useEffect } from "react";
// import ProductCard from "../../components/ProductCard";
// import { FlatList } from "react-native";
// import { theme } from "../../theme";
// import { getLimitedInventario } from "../../controllers/index.controller";
// import StyledText from "../../components/ui/StyledText";

// /**
//  * Tutoriales
//  * https://www.youtube.com/watch?v=jow2lXber3A - Video en el que me base para crear la logica para crear el scroll infinito
//  * https://www.youtube.com/watch?v=i4jKoTlSqvI - Implementacion profuda del FlatList
//  * https://www.youtube.com/watch?v=SitSOHyvBuE - Explica uso del refreshing
//  * https://www.youtube.com/watch?v=pHLFJs7jlI4 - Explica uso del refreshing
//  *
//  */

// export default function Home({ navigation }) {
//   // Almacena los zapatos dispnibles
//   const [shoes, setShoes] = useState([]);
//   // Se encarga de mostrar/ocultar el ActivityIndicator
//   const [loading, setLoading] = useState(false);
//   // Manajeador de paginacion de la APIs (pocketbase)
//   const [currentPage, setCurrentPage] = useState(1);
//   // Verifica de que si la APIs envia un registro o un valor nulo(cuando ya no hay mas registros)
//   const [isShoes, setIsShoes] = useState(true);
//   // Se encarga de habilitar el scrooll para arriba para traer mas datos
//   const [refreshing, setRefreshing] = useState(false);

//   /**
//    * Rensponsabilidad: Se encarga de traer los zapatos disponibles de pocketbase
//    * 1. Envolvemos en un manejador de excepciones toda lo logica, por si surge un fallo HTTP
//    * 2. Cuando traemos datos de la PB, actualizamos el estado loading, para que se muestre en la ui, un loader,
//    *    indicando al usuario que se estan cargando datos
//    * 3. Llamamos la funcion getLimitedInventario que renota el stock, y le pasamos por argumento el currentPage,
//    *    Hacemos eso para que luego cuando vayamos a traer mas datos, aumentamos su valor, y getLimitedInventario
//    *    se ejecuta denuevo y trae otros datos
//    * 4. Hacemos validacion de la variable result que almacena lo que retorna getLimitedInventario, ya que en la BD, puede existir la casualidad
//    *    que no hayan registro, en caso que sea así, result puede contener un valor nulo, y si es nulo, no traemos registro y se le indica al
//    *    usuario
//    * 5. Verificamos que el parametro reset, sea true o false, pero antes de todo, voy a hacer un parentesis, que es reset?, Basicamente se encarga
//    *    de indicar de que si la funcion es ejecutada por primera vez, para luego al estado shoes, establecer el valor de result. Ok ya explicado
//    *    eso, por que chequeamos reset?, basicamente si es true, establecemos el valor de result, si nó, mantenemos el valor que contenga el estado
//    *    y añadimos nuevo zapatos
//    */
//   const getShoes = async (reset = false) => {
//     try {
//       setLoading(true);
//       const result = await getLimitedInventario(currentPage);
//       if (result == null) {
//         setIsShoes(false);
//         return;
//       }
//       if (reset) {
//         setShoes(result);
//       } else {
//         // Evitar duplicados. Hago esta baina, para limpiar un warning que me muestra el emulador
//         const newShoes = result.filter(
//           (newItem) => !shoes.some((item) => item.id === newItem.id)
//         );
//         setShoes((prevData) => [...prevData, ...newShoes]);
//       }
//     } catch (e) {
//       console.log("There was an error in getShoes ", e);
//       throw e;
//     } finally {
//       setLoading(false);
//       if (refreshing) {
//         setRefreshing(false);
//       }
//     }
//   };

//   const loadMoreShoes = () => {
//     if (!loading && isShoes) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setCurrentPage(1);
//     getShoes(true);
//   };

//   const renderItem = ({ item, index }) => {
//     return (
//       <TouchableOpacity
//         style={styles.productCardcontainer}
//         onPress={() => {
//           navigation.navigate("ProductDetails", { data: item });
//         }}
//       >
//         <ProductCard item={item} />
//       </TouchableOpacity>
//     );
//   };

//   useEffect(() => {
//     getShoes();
//   }, [currentPage]);

//   useEffect(() => {
//     console.log(shoes);
//   }, [shoes]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={shoes}
//         keyExtractor={(item) => `${item.id}`}
//         renderItem={renderItem}
//         numColumns={2}
//         onEndReached={isShoes && loadMoreShoes}
//         onEndReachedThreshold={0.1}
//         refreshing={refreshing}
//         onRefresh={handleRefresh}
//         ListFooterComponent={() =>
//           loading ? (
//             <ActivityIndicator />
//           ) : !isShoes ? (
//             <StyledText>Vaya! Parece que has llegado al final</StyledText>
//           ) : null
//         }
//         contentContainerStyle={styles.contentContainerStyle}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.bg.defaultDark,
//   },
//   contentContainerStyle: {
//     alignItems: "center",
//   },
//   productCardcontainer: {
//     margin: 20,
//   },
// });

import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { FlatList } from "react-native";
import { theme } from "../../theme";
import { getLimitedInventario } from "../../controllers/index.controller";
import StyledText from "../../components/ui/StyledText";

/**
 * Tutoriales
 * https://www.youtube.com/watch?v=jow2lXber3A - Video en el que me base para crear la logica para crear el scroll infinito
 * https://www.youtube.com/watch?v=i4jKoTlSqvI - Implementacion profuda del FlatList
 * https://www.youtube.com/watch?v=SitSOHyvBuE - Explica uso del refreshing
 * https://www.youtube.com/watch?v=pHLFJs7jlI4 - Explica uso del refreshing
 *
 */

export default function Home({ navigation }) {
  // Scroll infinito
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShoes, setIsShoes] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // Scroll infinito

  // Filtros
  const [filter, setFilter] = useState("Todos");
  // Filtros

  const filterShoes = () => {
    return shoes.filter((shoe) => {
      return filter == "Todos" || filter == shoe.nombre_categoria;
    });
  };


  const filteredShoes = filterShoes()


  const getShoes = async (reset = false) => {
    try {
      setLoading(true);
      const result = await getLimitedInventario(currentPage);
      if (result == null) {
        setLoading(false);
        setIsShoes(false);
        return;
      }
      if (reset) {
        setShoes(result);
      } else {
        // Evitar duplicados. Hago esta baina, para limpiar un warning que me muestra el emulador
        const newShoes = result.filter(
          (newItem) => !shoes.some((item) => item.id === newItem.id)
        );
        setShoes((prevData) => [...prevData, ...newShoes]);
      }

      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    } catch (e) {
      console.log("There was an error in getShoes ", e);
      throw e;
    }
  };

  const loadMoreShoes = () => {
    if (!loading && isShoes) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    getShoes(true);
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

  useEffect(() => {
    getShoes();
  }, [currentPage]);

  // useEffect(() => {
  //   console.log(refreshing);
  // }, [refreshing]);

  useEffect(() => {
    console.log(shoes);
  }, [shoes]);

  return (
    <View style={styles.container}>
      <FlatList
        // data={shoes}
        data={filteredShoes}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={isShoes && loadMoreShoes}
        onEndReachedThreshold={0.1}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator />
          ) : !isShoes ? (
            <StyledText>Vaya! Parece que has llegado al final</StyledText>
          ) : null
        }
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
