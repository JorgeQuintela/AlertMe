import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

// const isDarkMode = useColorScheme() === 'dark';
const isDarkMode = true;

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: isDarkMode ? 'black' : 'white',
  },
  textStyle: {
    color: isDarkMode ? 'white' : 'black',
  },
  watchView: {
    backgroundColor: isDarkMode ? 'black' : 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexDirecton: 'row',
  },
  watchItem: {
    flexBasis: '20%',
    // width: screenWidth / 5,
  },
  squareView: {
    backgroundColor: isDarkMode ? 'black' : 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 10,
    margin: 2,
  },
  squareViewRed: {
    borderColor: 'red',
  },
  squareViewGreen: {
    borderColor: 'green',
  },
  squareText: {
    // width: '100%',
    textAlign: 'center',
    color: isDarkMode ? 'white' : 'black',
  },
});
// const styles1 = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default styles;
