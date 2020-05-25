import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';

import FormStyles from '../../styles/Forms';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { login, signUp } from '../../store/actions/authenticationActions';
import { RootState } from '../../models/ProductsState';
import { ProductsOverview } from '../../navigation/routes';

type Props = {
    navigation: any;
};

const AuthenticationScreen = (props: Props) => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isLoading = useSelector((state: RootState) => state.authentication.isLoading);
    const isLogged = useSelector((state: RootState) => state.authentication.isLogged);
    const error = useSelector((state: RootState) => state.authentication.error);

    useEffect(() => {
        if (isLogged) {
            props.navigation.navigate(ProductsOverview);
        }
    }, [isLogged]);

    const onLogin = () => {
        if (username && password) {
            if (isLogin) {
                dispatch(login(username, password));
            } else {
                dispatch(signUp(username, password));
            }
        }
    };

    return (
        <View style={styles.screen}>
            <LinearGradient
                colors={[Colors.primaryColor, Colors.secondaryColor]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '100%',
                }}
            />
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}>
                <View style={styles.loginForm}>
                    {error
                        ? (
                            <View style={FormStyles.formControl}>
                                <Text style={styles.loginError}>{error}</Text>
                            </View>
                        )
                        : null
                    }
                    <View style={FormStyles.formControl}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            value={username}
                            onChangeText={value => setUsername(value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={FormStyles.formControl}>
                        <TextInput
                            mode="outlined"
                            label="Password"
                            value={password}
                            onChangeText={value => setPassword(value)}
                            keyboardType="default"
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={FormStyles.formControlButton}>
                        {isLoading
                            ? (
                                <ActivityIndicator size="small"/>
                            )
                            : (
                                <Button
                                    color={Colors.primaryColor}
                                    style={styles.loginButton}
                                    mode="contained"
                                    uppercase={false}
                                    onPress={onLogin}>
                                    {isLogin ? 'Login' : 'Sign Up'}
                                </Button>)
                        }
                    </View>
                    <View style={FormStyles.formControlButton}>
                        <Text style={styles.loginLink} onPress={() => setIsLogin(!isLogin)}>
                            Switch to {isLogin ? 'Sign Up' : 'Login'}
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
};

AuthenticationScreen.navigationOptions = (props: Props) => {
    return {
        title: 'Authentication',
        headerShown: false,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    loginForm: {
        marginHorizontal: 20,
        backgroundColor: Colors.white,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: Colors.gray,
        elevation: 3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        marginVertical: 10,
    },
    loginButton: {
        width: '40%',
        paddingVertical: 5
    },
    loginLink: {
        fontWeight: 'bold',
        color: Colors.secondaryColor
    },
    loginError: {
        color: Colors.red
    }
});

export default AuthenticationScreen;