import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { FONT_BOLD } from '../constants/Fonts';

type Props = {
    cartItem: any,
    removeItem: any,
    deletableItem: boolean;
    showBorderBox: boolean;
};

const CartItem = (props: Props) => {
    const cartItem = props.cartItem;
    const styleCartItem = props.showBorderBox ? styles.cartItemContainerWithBorder : styles.cartItemContainer;

    return (
        <View style={styleCartItem}>
            <Text style={styles.quantity}>{cartItem.quantity} </Text>
            <Text style={styles.cartTitle}>{cartItem.productTitle}</Text>
            <Text style={styles.cartSum}>${cartItem.sum.toFixed(2)}</Text>
            {
                props.deletableItem && (
                    <TouchableOpacity onPress={() => props.removeItem(cartItem)}>
                        <MaterialCommunityIcons name="cart-remove" size={24} color={Colors.primaryColor}/>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainerWithBorder: {
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
    cartItemContainer: {
        backgroundColor: Colors.white,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 16,
        paddingRight: 10,
    },
    cartTitle: {
        fontSize: 14,
        textAlign: 'left',
        color: Colors.secondaryColor,
        flex: 1,
    },
    cartSum: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: FONT_BOLD,
        width: 80
    },
});

export default CartItem;