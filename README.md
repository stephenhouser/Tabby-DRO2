## Run Instructions

 Run instructions for iOS:
    • cd "/Users/houser/Projects/TabbyDRO2" && npx react-native run-ios
    - or -
    • Open TabbyDRO2/ios/TabbyDRO2.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "/Users/houser/Projects/TabbyDRO2" && npx react-native run-android



## Install Dependencies

npm install --save git://github.com/stephenhouser/react-native-bluetooth-serial#dro @react-navigation/drawer @react-navigation/native react-native-screens  react-native-elements react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-vector-icons


## Fix

2020-04-17 11:18:29.236174-0400 expodro[505:79123] You've implemented -[<UIApplicationDelegate> application:performFetchWithCompletionHandler:], but you still need to add "fetch" to the list of your supported UIBackgroundModes in your Info.plist.
2020-04-17 11:18:29.236300-0400 expodro[505:79123] You've implemented -[<UIApplicationDelegate> application:didReceiveRemoteNotification:fetchCompletionHandler:], but you still need to add "remote-notification" to the list of your supported UIBackgroundModes in your Info.plist.
2020-04-17 11:18:29.563 [warn][tid:main][RCTModuleData.mm:68] Module RCTBluetoothSerial requires main queue setup since it overrides `init` but doesn't implement `requiresMainQueueSetup`. In a future release React Native will default to initializing all native modules on a background thread unless explicitly opted-out of.
2020-04-17 11:18:29.594628-0400 expodro[505:79342] TCP Conn 0x283b96040 Failed : error 0:61 [61]
2020-04-17 11:18:29.601642-0400 expodro[505:79346] [access] This app has crashed because it attempted to access privacy-sensitive data without a usage description.  The app's Info.plist must contain an NSBluetoothAlwaysUsageDescription key with a string value explaining to the user how the app uses this data.

2020-04-17 11:19:51.020254-0400 expodro[507:80155] Could not find peripheral FBA9B090-9D99-BFD4-4352-C3DEEE057D8E.
2020-04-17 11:19:53.046 [warn][tid:com.facebook.react.JavaScript] Possible Unhandled Promise Rejection (id: 0):
Error: Could not find peripheral FBA9B090-9D99-BFD4-4352-C3DEEE057D8E.

## Notes

* zero axis
* in/mm => toggle units among inches and mm
* abs/inc => toggle absolute or incremental mode
 * abs -> relative to part
 * inc -> relative to last position
  * when zero axis in inc mode, zero's the position

* preset axis - touch axis and enter new number

* center find
 * locate edge
 * zero axis
 * locate other edge
 * press 1/2 then the axis to find center of



* hole circle
* hole pattern
* tool offset


* calculator mode -> transfer to axis


@react-navigation/native
@react-navigation/stack
@react-navigation/drawer
react-native-safe-area-context

Menu Button -- for top menu?
https://js.coach/react-native-menu-button?search=button&collection=React+Native    