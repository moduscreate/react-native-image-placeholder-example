/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    StatusBar,
    ScrollView
} from 'react-native';

StatusBar.setBarStyle('light-content');
console.disableYellowBox = true; // This gets in the way!

const windowDims = Dimensions.get('window'),
      itemSize   = (windowDims.width / 2) - 20;


const placeholder = require('./images/placeholder.png');


const styles = StyleSheet.create({
    container : {
        paddingTop     : 30,
        justifyContent : 'center',
        alignItems     : 'center',
        backgroundColor: '#F5FCFF',
        flexDirection  : 'row',
        flexWrap       : 'wrap'
    },
    child : {
        width       : itemSize,
        height      : itemSize,
        margin      : 5
    },

    topBar : {
        position        : 'absolute', 
        top             : 0, 
        height          : 25, 
        width           : windowDims.width, 
        backgroundColor : 'rgba(0,0,0,1)'
    }
});

class Placeholder extends Component {
    // Initial state
    state = {
        data : [] // empty data array
    };

    // Self-bound callback
    onAfterLoad = (data) => {
        this.setState({
            data : data.data
        });
    };

    componentWillMount() {
        let url = 'http://api.giphy.com/v1/gifs/search?q=demoscene&api_key=dc6zaTOxFJmzC&limit=50';

        // Initiate query, parse, then update view via callback
        fetch(url)
            .then(function(r) {
                return r.json();
            })
            .then(this.onAfterLoad) // Success callback registration
            .catch(function(e) {    // Failure callback registartion
                alert('Failure fetching data');
                console.log(e)
            });
    }

    buildImages(data) {
        let images  = [],
            length  = data.length,
            i       = 0,
            randVal = '?r=' + Math.random(),
            source,
            item;


        for (; i < length; i++) {
            item = data[i];

            // We don't have data, so put mocks up
            if (! item) {
                source = placeholder
            }
            // For when we actually have data
            else {
                source = {
                    uri    : item.images.original_still.url + randVal, 
                    width  : itemSize, 
                    height : itemSize
                }
            }

            images.push(
                <Image style={styles.child} 
                       source={source} 
                       defaultSource={placeholder} 
                       key={'img' + i}/>
            )
        }

        return images;
    }

    render() {
        let state  = this.state,
            data   = state.data,
            images = this.buildImages(data);

        return (
            <View style={{flex:1}}>
                <ScrollView contentContainerStyle={styles.container}
                            style={{backgroundColor: '#F5FCFF'}}>
            
                    {images}
                </ScrollView>

                <View style={styles.topBar}/> 
            </View>
        );
    }
}

AppRegistry.registerComponent('Placeholder', () => Placeholder);
