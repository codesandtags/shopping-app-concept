import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  { createStore, combineReducers } from 'redux';
import { Provider as StoreProvider} from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import { FONT_BOLD, FONT_REGULAR } from './src/constants/Fonts';
import ProductsNavigator from './src/navigation/MainNavigator';
import Colors from './src/constants/Colors';

import { productsReducer } from './src/store/reducers/productsReducer';
import { cartReducer } from './src/store/reducers/cartReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});
const store = createStore(rootReducer);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    accent: Colors.secondaryColor,
  },
};

const fetchFonts = () => {
  return Fonts.loadAsync({
    [FONT_REGULAR]: require('./assets/fonts/Montserrat-Regular.ttf'),
    [FONT_BOLD]: require('./assets/fonts/Montserrat-Bold.ttf'),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return (
        <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontsLoaded(true)}
        />
    );
  }

  return (
     <StoreProvider store={store}>
       <PaperProvider theme={theme}>
         <ProductsNavigator />
       </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
