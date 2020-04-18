import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export const spindleSpeedConfiguration = {
	type: 'spindle',
	displayDigits: 6,
	unitOptions: ['sfm', 'rpm'],
	modeOptions: ['sfm', 'rpm'],
};

export default SpindleSpeed = React.forwardRef(({ name,
	value, units, mode, 
	leftComponent, rightComponent ,
	displayDigits
	}, ref) => {
	
	const configuration = spindleSpeedConfiguration;

	const showDigits = displayDigits || spindleSpeedConfiguration.displayDigits;

	const displayValue = Number(value).toFixed(0);
	const displayUnits = units;
	const displayBackgroundValue = Number('8'.repeat(configuration.digits));

	const firstUnit = configuration.unitOptions[0];
	const secondUnit = configuration.unitOptions[1];

	const unitStyle = (baseStyle, highlight) => {
		if (highlight) {
			return StyleSheet.compose(baseStyle, styles.highlight);
		}

		return baseStyle;
	}

	return (
		<View style={styles.container}>
			<View style={styles.prefix}>
				{leftComponent}
			</View>
			<View style={styles.content}>
				<Text style={styles.backgroundText} numberOfLines={1} ellipsizeMode='head'>
					{displayBackgroundValue}
				</Text>

				<TextInput value={displayValue} ref={ref}
					editable={false} style={styles.valueText} 
					maxLength={showDigits + 1} />
			</View>
			<View style={styles.postfix}>
				<View style={styles.unitsContainer}>
					<Text style={unitStyle(styles.firstUnit, displayUnits === firstUnit)}>{firstUnit}</Text>
					<Text style={unitStyle(styles.secondUnit, displayUnits === secondUnit)}>{secondUnit}</Text>
				</View>
				{rightComponent}
			</View>
		</View>
	);
});

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

	// the zeroAxis button
	prefix: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	// the value display
	content: {
		flexGrow: 1,
		backgroundColor: 'black',
		position: 'relative',
	},

	backgroundText: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		zIndex: -1,
		fontSize: 64,
		fontFamily: 'DSEG7Classic-BoldItalic',
		color: '#333',
		textAlign: 'right',
	},
	valueText: {
		// position: 'absolute',
		// bottom: 0,
		// right: 0,
		marginTop: 'auto',
		fontSize: 64,
		fontFamily: 'DSEG7Classic-BoldItalic',
		color: 'greenyellow',
		textAlign: 'right',
	},

	// the units and mode button
	postfix: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	unitsContainer: {
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		marginRight: 10,
	},
	firstUnit: {
		fontSize: 22,
		color: '#333',
	},
	secondUnit: {
		fontSize: 22,
		color: '#333',
	},

	// style to use to highlight things
	highlight: {
		color: 'greenyellow',
	}
});
