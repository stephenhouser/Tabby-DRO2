/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StyleSheet, StatusBar, Text } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import { useFonts } from '@use-expo/font';

import Main from './main';
import DROHeader from './components/header';

const Drawer = createDrawerNavigator();

const DROTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
	},
};

export default function App() {
  /*
	let [fontsLoaded] = useFonts({
		'DSEG7Classic-BoldItalic': require('./assets/fonts-DSEG_v045/DSEG7-Classic/DSEG7Classic-BoldItalic.ttf'),
		'DSEG7Modern-Italic': require('./assets/fonts-DSEG_v045/DSEG7-Modern/DSEG7Modern-Italic.ttf'),
		'DSEG7Modern-BoldItalic': require('./assets/fonts-DSEG_v045/DSEG7-Modern/DSEG7Modern-BoldItalic.ttf')
	});
	if (!fontsLoaded) {
		return (<Text>Loading...</Text>);
	} else {
  */

  return (
    <NavigationContainer theme={DROTheme}>
      <StatusBar barStyle='light-content'  />
      <Drawer.Navigator
        style={styles.app}
        screenOptions={{
          header: () => (
            <DROHeader />
          )
        }}
      >
        <Drawer.Screen name="ExpoDRO" component={Main} />
        {/* <Drawer.Screen name="Settings" component={Main} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
	},
});

