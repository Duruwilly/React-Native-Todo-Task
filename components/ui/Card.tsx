import { FlatList, StyleSheet, Text, View } from 'react-native'
import { taskType } from '../../common.type';
import CardItem from './CardItem';

type CardProps = {
    backgroundColor?: string;
    height?: number;
    position?: 'absolute' | 'relative';
    top?: number;
    data: taskType,
    textOnEmptyData: string
};

const Card = ({ backgroundColor = 'white', height = 250, position, top, data, textOnEmptyData }: CardProps) => {
    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor,
                    height,
                    position: position === 'absolute' ? 'absolute' : 'relative',
                    top: position === 'absolute' ? top : undefined,
                },
            ]}
        >
            <FlatList data={data} renderItem={(itemData) => {
                return (
                    <CardItem
                        title={itemData.item.title}
                        time={itemData.item.time}
                        category={itemData.item.category}
                        id={itemData.item.id}
                        isLastItem={itemData.index === data.length - 1}
                    />
                )
            }}
                alwaysBounceVertical={false}
                // horizontal={true}
                keyExtractor={(item) => item.id} />
            {data?.length === 0 && <Text>{textOnEmptyData}</Text>}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 24,
        padding: 17,
        width: "100%",
        maxWidth: 500,
        alignSelf: "center"
    },
})