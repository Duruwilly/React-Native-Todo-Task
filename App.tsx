import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from './navigations/route';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style='light' />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent'
              },
              contentStyle: {
                backgroundColor: "#e4edf5",
              },
              headerShadowVisible: false,
              headerShown: false,
            }}
          >
            {routes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={route.options}

              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

