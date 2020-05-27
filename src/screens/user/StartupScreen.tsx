import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import { Authentication, ProductsOverview } from '../../navigation/routes';
import { authenticate } from '../../store/actions/authenticationActions';

type Props = {
    navigation: any;
};

const StartUpScreen = (props: Props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('Trying to get asynchrouonos data');
        const tryLogin = async () => {
            const item = await AsyncStorage.getItem('userData');
            console.log('And the data is: ', item);

            if (!item) {
                props.navigation.navigate(Authentication);
                return;
            }

            const {idToken, userId, expirationDate} = JSON.parse(item);
            const currentExpirationDate = new Date(expirationDate);

            if (currentExpirationDate <= new Date() || !idToken || !userId) {
                props.navigation.navigate(Authentication);
                return;
            }

            props.navigation.navigate(ProductsOverview);
            dispatch(authenticate(idToken, userId))
        }

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primaryColor}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
});

export default StartUpScreen;