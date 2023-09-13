import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/colors'

type propsType = {
    name?: "food-turkey" | "run" | 'calendar-month-outline' | 'cart-outline'
    color: string,
    library?: string,
    onPress: () => void,
    backgroundColor: string,
    selected: boolean
}

const CategoryIcon = ({ color, onPress, backgroundColor, name, selected }: propsType) => {

    const { width } = useWindowDimensions()

    // sizes for different screens width
    const iconFontSize = width < 450 ? 24 : 33
    const iconContainerSize = width < 450 ? 48 : 63
    const iconOuterContainerSize = width < 450 ? 50 : 66

    return (
        <Pressable style={[styles.iconOuterContainer, { height: iconOuterContainerSize, width: iconOuterContainerSize }]} onPress={onPress}>
            <View style={[styles.iconInnerContainer, { backgroundColor: backgroundColor, height: iconContainerSize, width: iconContainerSize }]}>
                {selected && (
                    <View style={styles.checkedIcon}>
                        <MaterialCommunityIcons name="check-bold" size={18} color={Colors.primary800} />
                    </View>
                )}
                <MaterialCommunityIcons name={name} size={iconFontSize} color={color} />
            </View>
        </Pressable>
    )
}

export default CategoryIcon

const styles = StyleSheet.create({
    iconInnerContainer: {
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    iconOuterContainer: {
        backgroundColor: "white",
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center"
    },
    checkedIcon: {
        backgroundColor: "white",
        borderRadius: 999,
        height: 20,
        width: 20,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        top: 0,
        right: 0
    }
})