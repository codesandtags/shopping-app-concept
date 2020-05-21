import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { FONT_BOLD } from '../constants/Fonts';

type Props = {
    cartItem: any,
    removeItem: any
};

const CartItem = (props: Props) => {
    const cartItem = props.cartItem;
    console.log('Cart Item', props.cartItem);

    return (
        <View style={styles.cartItemContainer}>
            <Text style={styles.quantity}>{cartItem.quantity} </Text>
            <Text style={styles.cartTitle}>{cartItem.productTitle}</Text>
            <Text style={styles.cartSum}>${cartItem.sum.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => props.removeItem(cartItem)}>
                <MaterialCommunityIcons name="cart-remove" size={24} color={Colors.primaryColor}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        elevation: 3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        marginVertical: 10,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    quantity: {
        fontSize: 16,
        paddingRight: 10,
    },
    cartTitle: {
        fontSize: 16,
        textAlign: 'left',
        color: Colors.secondaryColor,
        fontFamily: FONT_BOLD,
        flex: 1,
    },
    cartSum: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: FONT_BOLD,
        width: 80
    },
    deleteButton: {}
});

export default CartItem;