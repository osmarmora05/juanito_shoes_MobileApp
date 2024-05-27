import { TouchableHighlight, Text, StyleSheet, View } from "react-native";
import GoogleIcon from '../../../../assets/icons/socials/google.svg'
import { theme } from "../../../theme";

export default function StyledGoogleButton({ handleOnPress }) {
    return (
        <TouchableHighlight onPress={handleOnPress} style={styles.parent}>
            <View style={styles.container}>
                <View>
                    <GoogleIcon />
                </View>
                <Text style={styles.text}>Inicia sesión con Google</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    parent: {
        borderRadius: 13,
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 13,
        height: 50,
        width: "100%",
        gap: 18,
        backgroundColor: theme.colors.bg.defaultDark
    },
    text: {
        color: theme.colors.text.default,
        fontFamily: theme.font.fonts.extraBold
    }
})