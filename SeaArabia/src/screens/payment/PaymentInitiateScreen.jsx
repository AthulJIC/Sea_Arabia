import { View,Text,StyleSheet,Linking } from "react-native"
import { useAppContext } from "../../context/AppContext";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";

function PaymentInitiateScreen (){
  const navigation = useNavigation();
    const { paymentUrl } = useAppContext();
    const webViewRef = useRef(null);
    console.log('url=====', paymentUrl);
    // console.log('url from warning:', warning.url);
    // const handleWebViewLoadEnd = (event) => {
    //   if (event.nativeEvent.error) {
    //     console.error('WebView error:', event.nativeEvent.error);
    //     // Handle the error or retrieve information from the error as needed
    //   } else {
    //     // WebView finished loading successfully
    //     console.log('WebView finished loading successfully');
    //     const url = 'http://your_website.com/redirecturl?tap_id=auth_TS02A4720241037j2HM3001482';
    //     if(url.includes('redirecturl?tap_id=auth_')) {
    //         navigation.navigate('Dummy');
    //       }
    //     }
    // };
    const handleWebViewLoad = (navState) => {
      const currentUrl = navState.url;
      console.log('Current URL:', currentUrl);
      // const url = 'http://your_website.com/redirecturl?tap_id=auth_TS02A4720241037j2HM3001482';
      // Check if the WebView has reached the final destination URL
      if (currentUrl && currentUrl.includes('redirecturl?tap_id=auth_')) {
        console.log('Final destination page loaded successfully');
        navigation.navigate('PaymentSuccess');
        // Call your function or perform actions after the final destination page has loaded
      }
    };
    return(
        <View style={styles.container}>
        <WebView
          source={{ uri: paymentUrl}}
          style={styles.webview}
          onLoad={(navState) => handleWebViewLoad(navState)}
          // onError={handleWebViewError}
          onNavigationStateChange={(navState) => handleWebViewLoad(navState)}
        />
      </View>
  
  
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    webview: {
      flex: 1,
    },
  });
export default PaymentInitiateScreen;