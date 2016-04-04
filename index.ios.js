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


// imageSize is used to statically size <Image/> instances
const windowDims = Dimensions.get('window'),
      itemSize   = (windowDims.width / 2) - 20; 

// This is *the* placeholder image to be used in steps #3 and #5
const placeholder = require('./images/placeholder.png');

const styles = StyleSheet.create({
    container : {
        paddingTop      : 30,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        flexDirection   : 'row',
        flexWrap        : 'wrap'
    },

    child : {
        width  : itemSize,
        height : itemSize,
        margin : 7
    },

    topBar : {
        position        : 'absolute', 
        top             : 0, 
        height          : 25, 
        width           : windowDims.width, 
        backgroundColor : 'rgba(0,0,0,.8)'
    }
});

class Placeholder extends Component {
    // Initial state
    state = {
        data : [] // empty data array
    };

    // Step #4 (Self-bound function)
    // We will update the state of the application so that images can render
    onAfterLoad = (data) => {
        this.setState({
            data : data.data
        });
    };

    // Step #1 & #2
    // Here we’ll fetch JSON for images to be displayed
    componentWillMount() {
        // The URL below has an 'r' parameter that is used as a 'cache buster' and is only intended for demonstration purposes
        let url = 'http://api.giphy.com/v1/gifs/search?q=javascript&api_key=dc6zaTOxFJmzC&limit=30&r=' + Math.random();
        console.log('Loading data')

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

    // This will be responsible for rendering the image components
    buildImages(data) {
        let images  = [],
            length  = data.length,
            i       = 0,
            randVal = '?r=' + Math.random(),  // Cache busting for testing only can be removed
            source,
            item;

        // Empty array?
        if (data.length == 0) {
            // This console.log() call can be removed.
            console.log('Rendering placeholders');
            // Fill the array with 10 undefines
            data.length = length = 10;
        }
        else {
            // This else branch is here just for debugging and can be removed.
            console.log(`Got data. Rendering ${length} images.`);
        }

        for (; i < length; i++) {
            item = data[i];

            // For when we actually have data
            if (item) {
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