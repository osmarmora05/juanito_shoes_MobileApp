import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";

const InputIcon = ({ placeholder, onChangeText, value, onPress, icon }) => {
  return (
    <View
      style={{
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 6,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>
      <TextInput
        placeholder={placeholder}
        style={{ flex: 1, padding: 10 }}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default InputIcon;
