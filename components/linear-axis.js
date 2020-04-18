import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export const linearAxisConfiguration = {
	type: 'linear',
	displayDigits: 8,				// number of total digits to display.
	displayDecimalPlaces: 4,		// number of fixed digits after decimal place
	unitOptions: ['in', 'mm'],		// must be two things here!	hardcoded below.
	modeOptions: ['abs', 'inc'],	// must be two things here! hardcoded below.
};

export default LinearAxis = React.forwardRef(({ name,
	value, units, 							// most changeable things...
	leftComponent, rightComponent,			// left and right components to show
	displayDigits, displayDecimalPlaces, 	// digit display options
	}, ref) => {

	const showDigits = displayDigits || linearAxisConfiguration.displayDigits;
	const showDecimalPlaces = displayDecimalPlaces || linearAxisConfiguration.displayDecimalPlaces;

	const displayValue = Number(value).toFixed(showDecimalPlaces);
	const displayUnits = units || linearAxisConfiguration.unitOptions[0];
	const displayBackgroundValue = Number('8'.repeat(showDigits - showDecimalPlaces) + '.' + '8'.repeat(showDecimalPlaces));

	const topUnit = linearAxisConfiguration.unitOptions[0];
	const bottomUnit = linearAxisConfiguration.unitOptions[1];

	const unitMarker = (unitsDesignator) => {
		// Special case for making inches show as double smart quote
		if (unitsDesignator === 'in') {
			return '”';
		}

		return unitsDesignator;
	}

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
					<Text style={unitStyle(styles.topUnit, displayUnits === topUnit)}>
						{unitMarker(topUnit)}</Text>
					<Text style={unitStyle(styles.bottomUnit, displayUnits === bottomUnit)}>
						{unitMarker(bottomUnit)}</Text>
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
		// flex: 1,
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
		marginTop: -10,
	},
	topUnit: {
		fontSize: 42,
		color: '#333',
	},
	bottomUnit: {
		fontSize: 22,
		color: '#333',
	},

	// style to use to highlight things
	highlight: {
		color: 'greenyellow',
	}
});
