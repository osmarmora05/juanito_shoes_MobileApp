import React, { useState } from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

function UserImage({ onImageSelected }) {
  const [imagen, setImagen] = useState(null);

  const agregarImagen = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Validar si el usuario ingreso la imagen
      if (!result.cancelled) {
        setImagen(result);
        onImageSelected(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.container_img} onPress={agregarImagen}>
        {!imagen && (
          <Image
            style={styles.icon}
            source={require("../../../../assets/img/Usuario.png")}
          />
        )}
        {imagen && <Image source={{ uri: imagen.assets[0].uri }} style={styles.userImage} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container_img: {
    borderRadius: 75,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
  },
  userImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    borderRadius: 75,
  },
  icon: {
    width: 150,
    height: 150,
  },
});

export default UserImage;
