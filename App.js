//React Imports 
import React, { useState } from 'react';
//Redux Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './redux/reducers/productReducer';
import cartReducer from './redux/reducers/cartReducer';
import orderReducer from './redux/reducers/orderReducer';
import authReducer from './redux/reducers/authReducer';
import ReduxThunk from 'redux-thunk';
//Expo Imports
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
//Navigation Container Imports
import NavigationContainer from './navigation/NavigationContainer';


//Instantiate the rootReducer and create the Redux-Store
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  authentication: authReducer,
});
//Create the React-Redux Store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));



//Load Fonts
function fetchFonts() {
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
      <NavigationContainer />
    </Provider>
  );
}
