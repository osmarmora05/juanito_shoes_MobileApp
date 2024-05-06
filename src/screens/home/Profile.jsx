import { View, Text } from "react-native";
import { KeyboardAvoidingView, ScrollView, Image } from "react-native";

export default function Profile() {
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <View>
            <Image
              style={{ borderRadius: 50, width: 96, height: 96 }}
              source={require("../../../assets/img/avatar.png")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
