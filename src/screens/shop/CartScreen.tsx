import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import Colors from '../../constants/Colors';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../models/ProductsState';
import { FONT_BOLD } from '../../constants/Fonts';
import CartItem from '../../components/CartItem';

type Props = {
  navigation: StackNavigationProp;
};

const CartScreen = (props: Props) => {
    const cartTotalAmount = useSelector((state: RootState) => {
        return state.cart.totalAmount;
    })
    const cartItems = useSelector((state: RootState) => {
        const itemsToArray = [];
        const items = state.cart.items;

        for (const itemKey in items) {
            const { productTitle, productPrice, quantity, sum } = items[itemKey];

            itemsToArray.push({
                productId: itemKey,
                productTitle,
                productPrice,
                quantity,
                sum,
            })
        }

        return itemsToArray;
    });
    const renderCartItem = (item: any) => {
        return (
            <CartItem cartItem={item} key={item.productId}/>
        )
    };

    return (
        <View style={styles.screen}>
            <View style={styles.cartSummaryContainer}>
                <Text style={styles.cartSummaryText}>
                    <Text>Total:   </Text>
                    <Text style={styles.cartAmount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>

                <Button
                    disabled={cartItems.length === 0}
                    style={styles.productButton}
                    color={Colors.primaryColor}
                    icon="truck"
                    mode="contained"
                    uppercase={false}
                    onPress={() => {
                    }}>
                    Order Now!
                </Button>
            </View>
            <View>
                <Text>Cart Items</Text>
                <FlatList
                    data={cartItems}
                    renderItem={(itemList) => renderCartItem(itemList.item)}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20,
    },
    cartSummaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
        padding: 10,
    },
    cartSummaryText: {
        fontFamily: FONT_BOLD,
    },
    cartAmount: {
        color: Colors.secondaryColor,
        fontSize: 18,
        fontFamily: FONT_BOLD,
        paddingLeft: 10,
        borderWidth: 2,
    },
    productButton: {
        width: '50%',
        borderRadius: 0,
        marginVertical: 12,
        alignSelf: 'center'
    },
});

export default CartScreen;