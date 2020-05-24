import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';

import Colors from '../../constants/Colors';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models/ProductsState';
import { FONT_BOLD } from '../../constants/Fonts';
import CartItem from '../../components/CartItem';
import { removeFromCart } from '../../store/actions/cartActions';
import { addOrder } from '../../store/actions/ordersActions';

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
    const dispatch = useDispatch();
    const onOrderNow = () => {
      console.log('Adding order...');
      dispatch(addOrder(cartItems, cartTotalAmount))
    };
    const onRemoveItem = (item: any) => {
      console.log('Removing item', item);
        dispatch(removeFromCart(item));
    };
    const renderCartItem = (item: any) => {
        return (
            <CartItem
                showBorderBox={true}
                cartItem={item}
                key={item.productId}
                removeItem={onRemoveItem}
                deletableItem={true}
            />
        )
    };

    return (
        <View style={styles.screen}>
            <View style={styles.cartSummaryContainer}>
                <Text style={styles.cartSummaryText}>
                    <Text>Total:   </Text>
                    <Text style={styles.cartAmount}>${Math.abs(cartTotalAmount).toFixed(2)}</Text>
                </Text>

                <Button
                    disabled={cartItems.length === 0}
                    style={styles.productButton}
                    color={Colors.primaryColor}
                    icon="truck"
                    mode="contained"
                    uppercase={false}
                    onPress={onOrderNow}>
                    Order Now!
                </Button>
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.productId}
                    renderItem={(itemList) => renderCartItem(itemList.item)}
                />
            </View>
        </View>
    )
};

CartScreen.navigationOptions = (props: Props) => {
    return {
        title: 'Your Cart'
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        margin: 20,
    },
    cartSummaryContainer: {
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
        fontSize: 16,
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