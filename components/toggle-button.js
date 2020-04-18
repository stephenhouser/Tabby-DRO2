import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';

export function Button({ title, onPress }) {

	const formattedTitle = title;

	return (
		<TouchableHighlight onPress={onPress} underlayColor='white' activeOpacity={0.5}>
			<View style={styles.container}>
				<Text style={styles.label}>
					{formattedTitle}
				</Text>
			</View>
		</TouchableHighlight>
	);
}

export default function ToggleButton({ value, onTitle, offTitle, onValueChange }) {

	const formattedTopTitle = onTitle;
	const formattedBottomTitle = offTitle;

	const selectedStyle = (isSelected) => {
		if (isSelected) {
			return StyleSheet.compose(styles.label, styles.selected);
		}

		return StyleSheet.compose(styles.label, styles.deselected);
	}

	return (
		<TouchableHighlight onPress={onValueChange} underlayColor='white' activeOpacity={0.5}>
			<View style={styles.container}>
				<Text style={selectedStyle(value)}>
					{formattedTopTitle}
				</Text>
				<View style={{backgroundColor: '#333', height: 2, width: 25}}></View>
				<Text style={selectedStyle(!value)}>
					{formattedBottomTitle}
				</Text>
			</View>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',		// center content in x and y
		justifyContent :'center', 

		backgroundColor: 'black',	// same as overall background color 
		borderColor: 'white',		// border around the component 
		borderWidth: 1,
		borderRadius: 5,
		paddingTop: 5,
		paddingBottom: 5,
		paddingStart: 10,
		paddingEnd: 10,
		width: 64,
		height: 64,
	},

	label: {
		fontSize: 18,
		color: 'white',
		padding: 2,
		textAlign: 'center',
	},

	// style to use to highlight things
	selected: {
		color: 'greenyellow',
	},

	deselected: {
		color: '#777',
	}
});
