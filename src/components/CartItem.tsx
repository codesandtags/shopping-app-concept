import { Product } from '../models/Product';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { FONT_BOLD, FONT_REGULAR } from '../constants/Fonts';

type Props = {
    cartItem: any
};

const CartItem = (props: Props) => {
    const cartItem = props.cartItem;
    console.log('Cart Item', props.cartItem);

    return (
        <View style={styles.cartItemContainer}>
            <Text>
                <Text>{cartItem.quantity} </Text>
                <Text style={styles.cartTitle}>{cartItem.productTitle}</Text>
            </Text>
            <View>
                <Text style={styles.cartSum}>${cartItem.productPrice}</Text>
            </View>
            <View>
                <Text style={styles.cartSum}>${cartItem.productPrice}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        elevation: 3,
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        marginVertical: 20,
        width: '100%',
        paddingBottom: 0
    },
    cartTitle: {
        marginTop: 12,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.secondaryColor,
        fontFamily: FONT_BOLD
    },
    cartSum: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 12,
        fontFamily: FONT_REGULAR
    },
    deleteButton: {

    }
});

export default CartItem;