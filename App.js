//React Imports 
import React, { useState } from 'react';
//Redux Imports
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './redux/reducers/productReducer';
//Expo Imports
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
//Navigation Imports
import ShopNavigator from './navigation/ShopNavigator';



//Instantiate the rootReducer and create the Redux-Store
const rootReducer = combineReducers({
  products: productsReducer,
})
const store = createStore(rootReducer);



//Load Fonts
function fetchFonts () {
  return (
    Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
  );
}



//MAIN FUNCTION ===================================================================================
export default function App() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  if (!isAppLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setIsAppLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
