import { View, Pressable, useWindowDimensions } from 'react-native'

interface RightSwipeActionsProps {
    onPress: () => void;
    Icon: React.ReactNode;
    backgroundColor?: string
}

const RightSwipeActions = ({ onPress, Icon, backgroundColor }: RightSwipeActionsProps) => {
    const { width } = useWindowDimensions()

    const borderWidth = width < 450 ? 33 : 50

    return (
        <Pressable onPress={onPress}>
            <View
                style={{
                    backgroundColor,
                    borderRadius: 9999,
                    height: borderWidth,
                    width: borderWidth,
                    alignItems: "center",
                    justifyContent: 'center',
                }}
            >
                {Icon}
            </View>
        </Pressable>
    );
};

export default RightSwipeActions