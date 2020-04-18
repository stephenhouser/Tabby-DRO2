import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default function DROHeader() {

	return (
		<Header backgroundImageStyle={styles.header} barStyle='light-content'
  			leftComponent={{ icon: 'menu', color: '#fff' }}
  			centerComponent={{ text: 'ExpoDRO', style: { color: '#fff' } }}
  			rightComponent={<Button buttonStyle={styles.connect} title='Connect'/>}
		/>
	  );
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#343a40',
	},
	connect: {
		backgroundColor: 'green',
	}
  });
  