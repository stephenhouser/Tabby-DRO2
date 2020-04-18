import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Messages() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Messages go here...</Text>
		</View>
	  );
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',		// items in this container flow across the row 
		backgroundColor: 'black',	// same as overall background color 
		borderColor: 'darkgrey',	// border around the component 
		borderWidth: 1,
		borderRadius: 5,
		margin: 3,
		padding: 10,
	},
	text: {
		color: 'white',
	}
});
  