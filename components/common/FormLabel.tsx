import React from 'react'
import { StyleSheet, Text, useWindowDimensions } from 'react-native'

const FormLabel = ({ title }: { title: string }) => {

    const { width } = useWindowDimensions()

    const fontSize = width < 450 ? 14 : 17

    return (
        <Text style={[styles.title, { fontSize }]}>{title}</Text>
    )
}

export default FormLabel

const styles = StyleSheet.create({
    title: {
        color: "black",
        fontWeight: "700",
        marginBottom: 8,
    }
})