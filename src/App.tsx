import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from './pages/HomeScreen/HomeScreen';
import {AddScreen} from './pages/AddScreen/AddScreen';
import {EditScreen} from './pages/EditScreen/EditScreen';
import {CompletedScreen} from './pages/CompletedScreen/CompletedScreen';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// "All" sekmesi altındaki stack
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="CompletedScreen" component={CompletedScreen} />
    </Stack.Navigator>
  );
};

// "Completed" sekmesi altındaki stack (isteğe bağlı olarak tek sayfa da olabilir)
const CompletedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CompletedScreen" component={CompletedScreen} />
    </Stack.Navigator>
  );
};

export const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name="All"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="list"
                size={20}
                type={IconType.Feather}
                color={focused ? '#9395D3' : '#8B8787'} //Eğer kullanıcı all sekmesindeyse icon rengi mor değilse gri olur
              />
            ),

            tabBarActiveTintColor: '#9395D3', //Bar Aktif olduğunda yazı mor olsun.
          }}
        />
        <Tab.Screen
          name="Completed"
          component={CompletedStack}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="done"
                size={20}
                type={IconType.MaterialIcons}
                color={focused ? '#9395D3' : '#8B8787'} //Eğer kullanıcı completed sekmesindeyse icon rengi mor değilse gri olur
              />
            ),
            tabBarActiveTintColor: '#9395D3', //Bar Aktif olduğunda yazı mor olsun.
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
