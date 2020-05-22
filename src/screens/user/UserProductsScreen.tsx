import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models/ProductsState';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import ProductItem from '../../components/ProductItem';
import { ProductDetail } from '../../navigation/routes';
import { addToCart } from '../../store/actions/cartActions';
import { Product } from '../../models/Product';
import { Button } from 'react-native-paper';
import ButtonStyles from '../../styles/Buttons';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/productsActions';

type Props = {
    navigation: any;
};

const UserProductsScreen = (props: Props) => {
    const userProducts = useSelector((state: RootState) => {
        return state.products.userProducts;
    });
    const dispatch = useDispatch();
    const renderUserProduct = (product: Product) => {
        return <ProductItem
            product={product}
        >
            <Button
                style={ButtonStyles.productButton}
                icon="playlist-edit"
                mode="contained"
                uppercase={false}
                onPress={() => {

                }}>
                Edit
            </Button>
            <Button
                style={ButtonStyles.productButton}
                color={Colors.primaryColor}
                icon="playlist-remove"
                mode="contained"
                uppercase={false}
                onPress={() => {
                    dispatch(deleteProduct(product));
                }}>
                Remove
            </Button>
        </ProductItem>
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={userProducts}
                renderItem={itemList => renderUserProduct(itemList.item)}
            />
        </View>
    )
};

UserProductsScreen.navigationOptions = (props: Props) => {
    return {
        title: 'User Products',
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

export default UserProductsScreen;