import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from "../../constants/colors";
import { formatTime } from "../../utils/helpers";
import { useDispatch } from "react-redux"
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux"
import { toggleTaskCompletion, deleteTask } from "../../redux/slices/taskSlice";
import RightSwipeActions from "../SwipeAction/RightSwipeAction";

type cardItemPropsType = {
    title: string,
    category: string,
    id: string,
    time: Date,
    isLastItem: boolean
}

const CardItem = ({ title, category, id, time, isLastItem }: cardItemPropsType) => {
    const { tasksId } = useSelector((state: RootState) => state.tasksReducer)

    const dispatch = useDispatch()

    const isChecked = tasksId.includes(id)

    const toggleCheckBox = () => {
        if (isChecked) {
            dispatch(toggleTaskCompletion({ taskId: id }));
        } else {
            dispatch(toggleTaskCompletion({ taskId: id }));
        }
    }

    const deleteTasks = () => {
        dispatch(deleteTask({ taskId: id }))
    }

    const formattedTime = formatTime(time);

    const { width } = useWindowDimensions()

    // sizes for different screen width
    const fontSize = width < 450 ? 18 : 22
    const timeTextFontSize = width < 450 ? 16 : 20
    const iconFontSize = width < 450 ? 24 : 33
    const iconContainerSize = width < 450 ? 50 : 63
    const checkboxSize = width < 450 ? 27 : 35
    const size = width < 450 ? 20 : 28

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable
                renderRightActions={() => (
                    <RightSwipeActions
                        onPress={deleteTasks}
                        Icon={<MaterialIcons name="delete" size={size} color="white" />}
                        backgroundColor={Colors.primary800}
                    />
                )}
            >
                <View style={[styles.cardContent, !isLastItem && styles.borderBottom]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        {
                            category === "work" && <View style={[styles.iconContainer, { backgroundColor: Colors.primary300, height: iconContainerSize, width: iconContainerSize }, isChecked && styles.onCheckTextOpacity]}>
                                <AntDesign name="calendar" size={iconFontSize} color={Colors.primary800} />
                            </View>
                        }
                        {category === "eat" && <View style={[styles.iconContainer, { backgroundColor: "#D7ECF7", height: iconContainerSize, width: iconContainerSize }, isChecked && styles.onCheckTextOpacity]}>
                            <MaterialCommunityIcons name="food-turkey" size={iconFontSize} color="#003F5D" />
                        </View>}
                        {category === "exercise" && <View style={[styles.iconContainer, { backgroundColor: "#f5d3d3", height: iconContainerSize, width: iconContainerSize }, isChecked && styles.onCheckTextOpacity]}>
                            <MaterialCommunityIcons name="run" size={iconFontSize} color="red" />
                        </View>}
                        {category === "shopping" && <View style={[styles.iconContainer, { backgroundColor: "#FFF4CF", height: iconContainerSize, width: iconContainerSize }, isChecked && styles.onCheckTextOpacity]}>
                            <AntDesign name="shoppingcart" size={iconFontSize} color="black" />
                        </View>}
                        <View>
                            <Text style={[styles.cardText, isChecked && styles.strikeThrough, { fontSize }]}>{title}</Text>
                            <Text style={[styles.timeText, isChecked && styles.strikeThrough, { fontSize: timeTextFontSize }]}>{formattedTime}</Text>
                        </View>
                    </View>
                    <Checkbox
                        style={[styles.checkbox, { width: checkboxSize, height: checkboxSize }]}
                        value={isChecked}
                        onValueChange={toggleCheckBox}
                        color={isChecked ? Colors.primary800 : Colors.primary500}
                    />
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}

export default CardItem

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 18
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20
    },
    cardText: {
        fontWeight: "600"
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderBottomColor: "#eee",
    },
    iconContainer: {
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center"
    },
    checkbox: {
        borderRadius: 5
    },
    timeText: {
        fontWeight: "500",
        color: "#969697"
    },
    strikeThrough: {
        textDecorationLine: 'line-through',
        opacity: 0.25
    },
    onCheckTextOpacity: {
        opacity: 0.5
    }
})