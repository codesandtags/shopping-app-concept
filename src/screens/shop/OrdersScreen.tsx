import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useSelector } from 'react-redux';

import { RootState } from '../../models/ProductsState';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import OrderItem from '../../components/OrderItem';

type Props = {
  navigation: any;
};

const OrdersScreen = (props: Props) => {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const renderOrder = (order:any) => {
      return (
          <OrderItem orderItem={order}/>
      )
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={orders}
                renderItem={itemList => renderOrder(itemList.item)}
            />
        </View>
    )
};

OrdersScreen.navigationOptions = (props: Props) => {
    return {
        title: 'Your Orders',
        headerLeft: (navigationProperties: any) => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title='Menu'
                        iconName="menu"
                        onPress={() => {
                            props.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        },
    }
}

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 10,
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    }
});

export default OrdersScreen;