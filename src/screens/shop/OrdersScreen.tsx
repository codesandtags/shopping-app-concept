import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { useSelector } from 'react-redux';

import { RootState } from '../../models/ProductsState';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';

type Props = {
  navigation: any;
};

const OrdersScreen = (props: Props) => {
    const orders = useSelector((state: RootState) => state.orders.orders);
    const renderOrder = (order:any) => {
        console.log('REndering order', order);

      return (
          <View style={{
              borderWidth: 1,
              width: '90%',
              flex: 1,
              padding: 5,
              alignSelf: 'center'
          }}>
              <Text>{order.totalAmount}</Text>
          </View>
      )
    };

    return (
        <View style={styles.screen}>
            <Text>Welcome to this OrdersScreen</Text>
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
        flex: 1
    }
});

export default OrdersScreen;