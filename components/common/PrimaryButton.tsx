import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Colors } from '../../constants/colors'

type propsType = {
    onPress: () => void,
    children: string
}

const PrimaryButton = ({ onPress, children }: propsType) => {

    const { width } = useWindowDimensions()

    const fontSize = width < 450 ? 17 : 25

    return (
        <View style={styles.buttonOuterContainer}>
            <View style={styles.button}>
                <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} onPress={onPress} android_ripple={{ color: Colors.primary800 }}>
                    <Text style={[styles.buttonText, { fontSize }]}>{children}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonOuterContainer: {
        paddingHorizontal: 18,
        marginBottom: 30,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        borderRadius: 9999,
        overflow: "hidden",
        width: "100%",
        maxWidth: 500,
        alignSelf: "center"
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary800,
        paddingVertical: 20,
        elevation: 2
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700"
    },
    pressed: {
        opacity: 0.9
    }
})