import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ToggleButton, { Button } from './toggle-button';

export default function Controls() {
	return (
		<View style={styles.container}>			
			<ToggleButton onTitle='abs' offTitle='inc' value={true} />
			<ToggleButton onTitle='in' offTitle='mm' value={true} />
			<Button title='arc' />
			<Button title='=0' />
			<Button title='cos' />
			<Button title='sin' />
			<Button title='tan' />
			<Button title='CAL' />
			<Button title='Clear' />
			<Button title='√' />
			<Button title='+➕' />
			<Button title='−' />
			<Button title='×' />
			<Button title='÷' />
			<Button title='=' />
			<Button title='±' />
			<Button title='Enter' />
			<Button title='1/2' />
		</View>
	  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'row',		// items in this container flow across the row 
		// alignContent: 'flex-start',
		// justifyContent: 'flex-start',
		flexWrap: 'wrap',

		backgroundColor: '#333',	// same as overall background color 
		borderColor: 'darkgrey',	// border around the component 
		borderWidth: 1,
		borderRadius: 5,
		margin: 3,
		padding: 10,
	},
	text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 22,
	}
});
  