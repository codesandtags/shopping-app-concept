import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';

import * as Routes from './routes';
import CartScreen from '../screens/shop/CartScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetail';
import OrdersScreen from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import { createAppContainer } from 'react-navigation';
import { FONT_REGULAR } from '../constants/Fonts';
import React from 'react';

const defaultNavigationConfig = {
    headerStyle: {
        backgroundColor: Colors.black
    },
    headerTintColor: Colors.white,
    headerBackTitleStyle: {
        fontFamily: FONT_REGULAR,
        fontSize: 14
    }
};

const ProductsNavigator = createStackNavigator({
    [Routes.Cart]: CartScreen,
    [Routes.ProductsOverview]: ProductsOverviewScreen,
    [Routes.ProductDetail]: ProductDetailScreen,
    [Routes.EditProduct]: EditProductScreen,
    [Routes.UserProducts]: UserProductsScreen,
}, {
    defaultNavigationOptions: defaultNavigationConfig,
    initialRouteName: Routes.ProductsOverview,
    navigationOptions: {
        drawerIcon: (drawerConfig: any) => {
            return (
                <MaterialIcons name="shopping-cart" size={24} color="black" />
            )
        }
    }
});

const OrdersNavigator = createStackNavigator({
    [Routes.OrdersScreen]: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavigationConfig,
    navigationOptions: {
        drawerIcon: (drawerConfig: any) => {
            return (
                <MaterialIcons name="create" size={24} color="black" />
            )
        }
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
    }
});

export default createAppContainer(ShopNavigator);