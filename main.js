/*
 *
 */
import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text, View, FlatList  } from 'react-native';
//import Constants from 'expo-constants';

import BluetoothSerial from 'react-native-bluetooth-serial';

import LinearAxis, { linearAxisConfiguration } from './components/linear-axis';
import SpindleSpeed, { spindleSpeedConfiguration } from './components/spindle-speed';
import ToggleButton, { Button } from './components/toggle-button';
import Messages from './components/messages';
import Controls from './components/controls';

export default function Main() {

	const [configurations, setConfigurations] = useState({
		'X': { ...linearAxisConfiguration },
		'Y': { ...linearAxisConfiguration },
		'Z': { ...linearAxisConfiguration },
		'R': { ...spindleSpeedConfiguration },
	})

	const [measurements, setMeasurements] = useState({
		'X': { value: 0.0, units: 'in', mode: 'abs' },
		'Y': { value: 0.0, units: 'in', mode: 'abs' },
		'Z': { value: 0.0, units: 'in', mode: 'abs' },
		'R': { value: 0.0, units: 'rpm', mode: 'rpm' },
	});

	const [bleConnected, setBleConnected] = useState(false);

	const axisValues = {
		'X': useRef(null),
		'Y': useRef(null),
		'Z': useRef(null),
		'R': useRef(null),
	};

	useEffect(() => {
		connectBle();
	});

	/* Update data from Remote */
    const update = (rawData) => {
        var axisName = rawData[0].toUpperCase();
        var rawReading = rawData.substr(1, rawData.length - 2);
		// console.log('update(' + axisName + ', ' + rawReading + ')');

		const measurement = measurements[axisName];
		const value = Number.parseInt(rawReading);
        if (!Number.isNaN(value) && measurement != undefined) {
			setValue(axisName, value);
        }
	}

	const zeroValue = (name) => {
		console.log('zeroValue(' + name + ')');
		setValue(name, 0.0);
	}

	const setValue = (name, newValue) => {
		// console.log('setValue(' + name + ',' + newValue + ')');

		const measurement = measurements[name];
		if (measurement != undefined) {
			const scaled = newValue / 2560.0;
			axisValues[name].current.setNativeProps({'text': scaled.toFixed(4).toString()});
			// var newState = {...measurements}
			// newState[name].value = newValue / 2560.0; //(Math.random() * 100.0) - 33.0;
			// setMeasurements(newState);
		}
	}

	const setMode = (name, newMode) => {
		console.log('setMode(' + name + ',' + newMode + ')');

		const measurement = measurements[name];
		const configuration = configurations[name];
		if (measurement != undefined && configuration != undefined) {
			if (configuration.modeOptions.includes(newMode)) {
				var newState = {...measurements}
				newState[name].mode = newMode;
				setMeasurements(newState);
			}
		}
	};

	const toggleMode = (name) => {
		console.log('toggleMode(' + name + ')');

		const measurement = measurements[name];
		const configuration = configurations[name];
		if (measurement != undefined && configuration != undefined) {
			if (measurement.mode == configuration.modeOptions[0]) {
				setMode(name, configuration.modeOptions[1]);
			} else {
				setMode(name, configuration.modeOptions[0]);
			}
		}
	}
	
	const setUnits = (name, newUnits) => {
		console.log('setUnits(' + name + ',' + newUnits + ')');

		const measurement = measurements[name];
		const configuration = configurations[name];
		if (measurement != undefined && configuration != undefined) {
			if (configuration.unitOptions.includes(newUnits)) {
				var newState = {...measurements}
				newState[name].units = newUnits;
				setMeasurements(newState);
			}
		}
	};

	const toggleUnits = (name) => {
		console.log('toggleUnits(' + name + ')');

		const measurement = measurements[name];
		const configuration = configurations[name];
		if (measurement != undefined && configuration != undefined) {
			if (measurement.units == configuration.unitOptions[0]) {
				setUnits(name, configuration.unitOptions[1]);
			} else {
				setUnits(name, configuration.unitOptions[0]);
			}
		}
	};

	const connectBle = () => {
		if (!bleConnected) {
			BluetoothSerial.list()
			.then((devices) => {
				for (var i = 0; i < devices.length; i++) {
					console.log(devices[i].name + ':' + devices[i].uuid);
					if (devices[i].name == 'HC-06' || devices[i].name == 'SH-HC-08') {
						return BluetoothSerial.connect(devices[i].uuid);
					}

				throw "No known device found to connect to.";
				}
			})
			.then(() => {
				setBleConnected(true);
				BluetoothSerial.on('data', (data) => update(data['data']));
				return BluetoothSerial.subscribe(";");
			})
			.catch((error) => {
				console.log("ERROR: ==>");
				console.log(error);
			})
		}
	};

	const renderLinearAxis = (axisName, axis, configuration) => {
		return (
			<LinearAxis	name={axisName} ref={axisValues[axisName]}
				value={axis.value} units={axis.units} mode={axis.mode}
				leftComponent={
					<Button title={axisName} onPress={() => zeroValue(axisName)} />
				}
				rightComponent={
					<ToggleButton onTitle='abs' offTitle='inc' value={axis.mode === 'abs'}
						onValueChange={() => toggleMode(axisName)} />
				} 
			/>
		);
	}

	const renderSpindleSpeed = (spindleName, spindle, configuration) => {
		return (
			<SpindleSpeed name={spindleName} ref={axisValues[spindleName]}
				value={spindle.value} units={spindle.units} mode={spindle.mode}
				leftComponent={<Text style={{color: 'white'}}>RPM</Text>}
				rightComponent={
					<ToggleButton onTitle='rpm' offTitle='sfm' value={spindle.mode === 'rpm'} 
						onValueChange={() => toggleMode(spindleName)} />
				}
			/>
		);
	}

	const renderMeasurement = ({item, index, separators}) => {
		const measurement = measurements[item];
		const configuration = configurations[item];
		if (measurement != undefined && configuration != undefined) {
			switch (configuration.type) {
				case 'linear':
					return renderLinearAxis(item, measurement, configuration);
				case 'spindle':
					return renderSpindleSpeed(item, measurement, configuration);
			}
		}

		return (
			<Text style={{color: 'white'}}>Unknown Measurement {item}</Text>
		);
	}

	console.log("render");
	return (
		<View style={styles.container}>
		 	<View style={styles.cross} >
		 		<View style={styles.axes}>
		 			<FlatList data={Object.keys(measurements)}
		 				keyExtractor={item => item}
		 				renderItem={renderMeasurement} />
		 		</View>
		 		<View style={styles.controls}>
		 			<Controls />
		 			<Text>Points</Text>
					 <Button onPress={() => connectBle()}>Connect</Button>
		 		</View>
		 	</View>
			<Messages />
		</View>
	  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: Platform.OS === 'ios' ? 44 : 0,
		// backgroundColor: 'black',
	},
	cross: {
		flex: 4,
		flexDirection: 'row',
	},
	messages: {
		flex: 1,
	},

	axes: {
		flex: 2,
	},
	controls: {
		flex: 1,
	},
  });
  