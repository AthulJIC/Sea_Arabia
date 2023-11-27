import { Platform, StyleSheet } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { GlobalColors } from './colors';
// import DeviceInfo from 'react-native-device-info';

// const isTablet = DeviceInfo.isTablet();

export default StyleSheet.create({
  backIcon:{
    backgroundColor : 'rgba(247, 247, 249, 3)',
    marginLeft:15,
    marginTop:25,
    width:'12%',
    height:44,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
  userButton:{
    width:'93%',
    height:100,
    borderColor:'rgba(0, 0, 0, 1)',
    borderWidth:1,
    borderRadius:5, 
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20
  },
  userText:{
    color:'rgba(0, 104, 117, 1)', 
    fontSize:26,
    fontFamily:'Roboto-Medium'
  },
  filterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom:20,
    marginLeft:15
  },
  filterText: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize:14
  },
  selectedText: {
    color: 'rgba(0, 104, 117, 1)',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
