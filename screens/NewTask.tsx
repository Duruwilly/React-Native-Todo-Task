import { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    useWindowDimensions
} from 'react-native'
import FormLabel from '../components/common/FormLabel'
import PrimaryButton from '../components/common/PrimaryButton'
import { Colors } from '../constants/colors'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import CategoryIcon from '../components/ui/CategoryIcon'
import { formatTime } from '../utils/helpers'
import { useDispatch } from "react-redux"
import { addTask } from '../redux/slices/taskSlice'
import { taskInputStateType } from '../common.type'
import { MaterialIcons } from '@expo/vector-icons';

const NewTask = ({ navigation }: any) => {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const { width } = useWindowDimensions()

    const date = new Date();

    const tasksInputStateSchema: taskInputStateType = {
        title: "",
        category: "",
        date: date,
        time: date,
        note: "",
        id: Math.floor(Math.random() * 10000).toString()
    }

    const [tasksInputState, setTasksInputState] = useState(tasksInputStateSchema)

    const [emptyInputCheck, setEmptyInputCheck] = useState<boolean>(false)

    const clearState = () => {
        setTasksInputState((state) => {
            return {
                ...state,
                ...tasksInputStateSchema
            }
        })
    }

    const dateTimeOnChange = (event: DateTimePickerEvent, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowDate(false);
        setShowTime(false);
        setTasksInputState((state) => {
            return {
                ...state,
                date: currentDate,
                time: currentDate
            }
        })
    };

    const dispatch = useDispatch()

    const showDatepicker = () => {
        setShowDate(true)
    };

    const showTimepicker = () => {
        setShowTime(true)
    };

    const switchScreen = () => {
        if (tasksInputState.category === "" || tasksInputState.note === "" || tasksInputState.title === "" || /^\s*$/.test(tasksInputState.title)) {
            setEmptyInputCheck(true)
            setTimeout(() => {
                setEmptyInputCheck(false)
            }, 3000)
        } else {
            dispatch(addTask([tasksInputState]))
            clearState()
            navigation.navigate('TodoList')
        }
    }

    const formattedTime = formatTime(tasksInputState.time);

    // sizes for different screen width
    const fontSize = width < 450 ? 18 : 26
    const leftFontSize = width < 450 ? 24 : 28
    const leftFontSizeBackground = width < 450 ? 48 : 56
    const headerHeight = width < 450 ? 100 : 120

    return (
        <View style={styles.rootContainer}>
            <View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.headerContent}>
                    <Pressable onPress={() => navigation.navigate("TodoList")} style={[styles.leftIcon, { height: leftFontSizeBackground, width: leftFontSizeBackground }]}>
                        <MaterialIcons name="chevron-left" size={leftFontSize} color="black" />
                    </Pressable>
                    <Text style={[styles.headerText, { fontSize }]}>Add New Task</Text>
                </View>
                <View style={styles.stripeBelow}></View>
                <View style={styles.stripeTop}></View>
            </View>
            <ScrollView style={styles.screen} alwaysBounceVertical={false}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.contentContainer}>
                        {/* Title */}
                        <View style={styles.titleContainer}>
                            <FormLabel title='Task Title' />
                            <TextInput
                                style={styles.formInput}
                                value={tasksInputState.title}
                                onChangeText={(value) => setTasksInputState((state) => {
                                    return { ...state, title: value }
                                })}
                                placeholder="Pick up the milk"
                                placeholderTextColor={'black'}
                            />
                        </View>
                        {/* category */}
                        <View style={[styles.contentItem, {
                            flexDirection: "row", alignItems: "center", gap: 16, width: "100%", maxWidth: 500,
                            alignSelf: "center"
                        }]}>
                            <FormLabel title='Category' />
                            <CategoryIcon name='calendar-month-outline' color={Colors.primary800} backgroundColor={Colors.primary300} onPress={() => {
                                setTasksInputState((state) => {
                                    return { ...state, category: "work" }
                                })
                            }}
                                selected={tasksInputState.category === 'work'}
                            />
                            <CategoryIcon name='food-turkey' color="#003F5D" backgroundColor="#D7ECF7" onPress={() => {
                                setTasksInputState((state) => {
                                    return { ...state, category: "eat" }
                                })
                            }}
                                selected={tasksInputState.category === 'eat'}
                            />
                            <CategoryIcon name='run' color="red" backgroundColor="#f5d3d3" onPress={() => {
                                setTasksInputState((state) => {
                                    return { ...state, category: "exercise" }
                                })
                            }}
                                selected={tasksInputState.category === 'exercise'}
                            />
                            <CategoryIcon name='cart-outline' color="black" backgroundColor="#FFF4CF" onPress={() => {
                                setTasksInputState((state) => {
                                    return { ...state, category: "shopping" }
                                })
                            }}
                                selected={tasksInputState.category === 'shopping'}
                            />
                        </View>
                        {/* date and time */}
                        <View style={[styles.contentItem, {
                            width: "100%", maxWidth: 500,
                            alignSelf: "center"
                        }]}>
                            <FormLabel title='When' />
                            <View style={{
                                flexDirection: "row", gap: 12, flex: 1,
                            }}>
                                <Pressable onPress={showDatepicker} style={{
                                    flex: 1, borderColor: "rgb(209, 213, 219)", borderWidth: 1, height: 55, padding: 10, backgroundColor: "white", borderRadius: 6, justifyContent: "center",
                                }}>
                                    {showDate && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={tasksInputState.date}
                                            mode="date"
                                            is24Hour={true}
                                            onChange={dateTimeOnChange}
                                        />
                                    )}
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "500" }}>{tasksInputState.date.toLocaleDateString()}</Text>
                                        <MaterialCommunityIcons name="calendar-today" size={24} color={Colors.primary800} />
                                    </View>
                                </Pressable>

                                <Pressable onPress={showTimepicker} style={{
                                    flex: 1, borderColor: "rgb(209, 213, 219)", borderWidth: 1, height: 55, padding: 10, backgroundColor: "white", borderRadius: 6, justifyContent: "center"
                                }}>
                                    {showTime && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={tasksInputState.time}
                                            mode="time"
                                            onChange={dateTimeOnChange}
                                        />
                                    )}
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={{ fontSize: 15, fontWeight: "500" }}>{formattedTime}</Text>
                                        <Feather name="clock" size={24} color={Colors.primary800} />
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                        {/* notes */}
                        <View style={[styles.contentItem, {
                            width: "100%", maxWidth: 500,
                            alignSelf: "center"
                        }]}>
                            <FormLabel title='Notes' />
                            <TextInput
                                multiline={true}
                                numberOfLines={9}
                                style={styles.textInput}
                                placeholder="Notes"
                                placeholderTextColor={"black"}
                                value={tasksInputState.note}
                                onChangeText={(value) => setTasksInputState((state) => {
                                    return { ...state, note: value }
                                })}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {/* warning */}
                {emptyInputCheck && <Text style={[styles.warningText, { fontSize }]}>Kindly fill in all fields!</Text>}
            </ScrollView>
            <PrimaryButton onPress={switchScreen}>Save</PrimaryButton>
        </View>
    )
}

export default NewTask

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        position: "relative"
    },
    header: {
        backgroundColor: Colors.primary800,
        width: "100%",
        height: 100,
        position: "relative"
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
    },
    headerText: {
        color: "white",
        textAlign: "center",
        fontWeight: "700"
    },
    leftIcon: {
        backgroundColor: "white",
        borderRadius: 9999,
        left: 0,
        marginLeft: 9,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center"
    },
    stripeBelow: {
        position: "absolute",
        bottom: 0,
        left: -120,
        backgroundColor: "transparent",
        borderRadius: 9999,
        borderWidth: 50,
        borderColor: Colors.primary500,
        height: 300,
        width: 300,
        zIndex: -99
    },
    stripeTop: {
        position: "absolute",
        top: 0,
        right: -60,
        backgroundColor: "transparent",
        borderRadius: 9999,
        borderWidth: 20,
        borderColor: Colors.primary500,
        height: 100,
        width: 100,
        zIndex: -99
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 65,
        marginTop: 20
    },
    contentItem: {
        marginTop: 20
    },
    titleContainer: {
        width: "100%",
        maxWidth: 500,
        alignSelf: "center"
    },
    formInput: {
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
        height: 55,
        padding: 10,
        borderWidth: 1,
        borderColor: "rgb(209, 213, 219)",
        backgroundColor: "white",
        borderRadius: 6
    },
    textInput: {
        borderColor: "rgb(209, 213, 219)",
        borderWidth: 1,
        padding: 14,
        backgroundColor: "white",
        borderRadius: 6,
        height: 180,
        ...Platform.select({
            ios: {
                paddingTop: 14
            },
            android: {
                textAlignVertical: "top",
            },
        }),
    },
    warningText: {
        backgroundColor: Colors.primary300,
        width: "50%",
        paddingVertical: 12,
        fontWeight: "600",
        alignSelf: "center",
        textAlign: "center",
        color: Colors.primary600
    }
})