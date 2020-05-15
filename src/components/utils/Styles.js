import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import PropTypes from 'prop-types'

const { width , height } = Dimensions.get('window');
let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);
console.log(`calRatio: ${calRatio}`);
if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}
console.log(`calRatio: ${calRatio}`);

export const screenWidth = width;
export const screenHeight = height;
export const ratio = calRatio / (360 / 9);
console.log(`ratio: ${ratio}`);
export const statusBarHeight = getStatusBarHeight(true); // false to get android height.

// interface Icolors {
//   dodgerBlue: string;
//   dusk: string;
//   blueyGray: string;
//   cloudyBlue: string;
//   paleGray: string;
//   darkBlue: string;
// }

// colors.propTypes = {
//   dodgerBlue: PropTypes.string,
//   dusk: PropTypes.string,
//   blueyGray: PropTypes.string,
//   cloudyBlue: PropTypes.string,
//   paleGray: PropTypes.string,
//   darkBlue: PropTypes.string,
// }

export const colors = {
  dodgerBlue: 'rgb(58,139,255)',
  dusk: 'rgb(65,77,107)',
  blueyGray: 'rgb(134,154,183)',
  cloudyBlue: 'rgb(175,194,219)',
  paleGray: 'rgb(233,237,244)',
  darkBlue: 'rgb(30, 80, 180)',
};

console.log(colors.dusk)