import { View,Text } from "react-native"
import { WebView } from 'react-native-webview';

function DummyScreen(){
    return(
        <View style={{flex: 1, margin: 20}}>
            <WebView
                style={{flex: 1, marginTop: 20}}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                source={{html: 
                    `<iframe
                        width="100%"
                        height="50%"
                        style="border:0"
                        loading="lazy"
                        allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBa8SaGoJpoYM0tQvm1ZS9ZR5meBvuoq4s
                        &q=Space+Needle,Seattle+WA
                        &center=47.6205,-122.3493
                        &zoom=19
                        &maptype=roadmap">
                    </iframe>`
                }}
            />
        </View>
    )
}

export default DummyScreen;