import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { MaterialIcons } from '@expo/vector-icons';

import * as Routes from './routes';
import CartScreen from '../screens/shop/CartScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetail';
import OrdersScreen from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { FONT_REGULAR } from '../constants/Fonts';
import React from 'react';
import AuthenticationScreen from '../screens/user/AuthenticationScreen';
import StartUpScreen from '../screens/user/StartupScreen';
import { Button, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authenticationActions';
import { Authentication } from './routes';

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
}, {
    defaultNavigationOptions: defaultNavigationConfig,
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
                <MaterialIcons name="list" size={24} color="black" />
            )
        }
    }
});

const UserProductsNavigator = createStackNavigator({
    [Routes.UserProducts]: UserProductsScreen,
    [Routes.EditProduct]: EditProductScreen,
}, {
    defaultNavigationOptions: defaultNavigationConfig,
    navigationOptions: {
        drawerLabel: 'Admin Products',
        drawerIcon: (drawerConfig: any) => {
            return (
                <MaterialIcons name="edit" size={24} color="black" />
            )
        }
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    UserProducts: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor,
    },
    contentComponent: (props) => {
        const dispatch = useDispatch();

        return (
            <View style={{flex: 1}}>
                <SafeAreaView>
                    <DrawerNavigatorItems {...props} />
                    <Button
                        title="Logout"
                        color={Colors.primaryColor}
                        onPress={() => {
                            dispatch(logout());
                            props.navigation.navigate(Authentication);
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
});

const AuthenticationNavigator = createStackNavigator({
    [Routes.Authentication]: AuthenticationScreen,
}, {
    defaultNavigationOptions: defaultNavigationConfig,
});

const MainNavigator = createSwitchNavigator({
    Startup: StartUpScreen,
    Authentication: AuthenticationNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator);