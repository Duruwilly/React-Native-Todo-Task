import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { format } from "date-fns"
import { Colors } from '../constants/colors'
import Card from '../components/ui/Card'
import PrimaryButton from '../components/common/PrimaryButton'
import { useSelector } from "react-redux"
import { RootState } from '../redux/store/store'

const Homescreen = ({ navigation }: any) => {
    const { tasks, completedTask } = useSelector((state: RootState) => state.tasksReducer)

    const switchScreen = () => {
        navigation.navigate('NewTask')
    }

    const { width } = useWindowDimensions()

    // sizes for different screen width
    const fontSize = width < 450 ? 30 : 100
    const dateFontSize = width < 450 ? 18 : 25

    return (
        <View style={styles.rootContainer}>
            <View>
                <View style={styles.header}>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.headerText, { fontSize: dateFontSize }]}>
                            {format(new Date(), "MMMM dd, yyy")}
                        </Text>
                        <Text style={[styles.headerText, { marginTop: 40, fontSize, fontWeight: "700" }]}>My Todo List</Text>
                    </View>
                    <View style={styles.stripeBelow}></View>
                    <View style={styles.stripeTop}></View>
                    <View style={styles.cardContainer}>
                        <View>
                            <Card position='absolute' top={0} data={tasks} textOnEmptyData="Nice Job! You have no tasks to do or you have completed your tasks." />
                            <View style={{ marginTop: 270 }}>
                                <Text style={{
                                    fontSize: dateFontSize, fontWeight: "700", width: "100%", maxWidth: 500,
                                    alignSelf: "center"
                                }}>Completed</Text>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Card height={200} data={completedTask} textOnEmptyData="You have no completed task!" />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <PrimaryButton onPress={switchScreen}>Add New Task</PrimaryButton>
        </View>
    )
}

export default Homescreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        position: "relative"
    },
    header: {
        backgroundColor: Colors.primary800,
        width: "100%",
        height: 250,
        paddingTop: 60,
        position: "relative"
    },
    headerTextContainer: {
        marginBottom: 24
    },
    headerText: {
        color: "white",
        textAlign: "center",
        fontWeight: "600"
    },
    stripeBelow: {
        position: "absolute",
        bottom: 0,
        left: -200,
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
        right: -80,
        backgroundColor: "transparent",
        borderRadius: 9999,
        borderWidth: 40,
        borderColor: Colors.primary500,
        height: 150,
        width: 150,
        zIndex: -99
    },
    cardContainer: {
        paddingHorizontal: 18
    },
})