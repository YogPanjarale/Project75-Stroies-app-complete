import * as React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

class WriteStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            StoryTitle: "",
            Author: "",
            story: "",
        }
    }
    render() {
        return (
            <View>
                <Header
                    backgroundColor={'#39B39C'}
                    centerComponent={{
                        text: 'Write Story',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                />
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => {
                            this.setState({ StoryTitle: text });
                        }}
                        value={this.state.StoryTitle}
                        placeholder="Story Title"
                    />
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(text) => {
                            this.setState({ Author: text });
                        }}
                        value={this.state.Author}
                        placeholder="Author"
                    />
                      <TextInput
                        style={[styles.inputBox,{height:200}]}
                        onChangeText={(text) => {
                            this.setState({ story: text });
                        }}
                        value={this.state.story}
                        placeholder="Write Your Story here "
                        multiline={true}
                        />
                    <TouchableOpacity style={styles.button}>
                        <Text>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default WriteStoryScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
         height: 40,
        // textAlign: 'center',

        borderWidth: 3,
        outline: 'none',
        borderColor: "#aaaaaa"
    },
    button:{
        backgroundColor: '#FFCA4F',
        paddingHorizontal: 20,
        margin: 20,
        paddingVertical:10,
        borderRadius: 5,
        
    }
});