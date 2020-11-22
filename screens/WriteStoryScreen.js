import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

class WriteStoryScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            StoryTitle: "",
            Author: "",
            story: "",
        }
    }
    checkStoryExists = async () => {
        // Create a reference to the cities collection
        const storiesRef = db.collection('Stories');

        // Create a query against the collection
        const instances = await storiesRef.where('StoryTitle', '==', this.state.StoryTitle).get();
        console.log(instances)
        var isCopy=false
        instances.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            isCopy=doc.data()
          });
          isCopy=isCopy==null

        if (isCopy==false) {
            alert("Story Title is already taken")
        }
        console.log(isCopy)
        return isCopy;

    }
    submitStory = async () => {
        if (this.checkStoryExists()) {
            const res = await db.collection('Stories').add({
                StoryTitle: this.state.StoryTitle,
                Author: this.state.Author,
                story: this.state.story,
            });

            console.log('Added document with ID: ', res.id);
            alert("Story Subbmitted Sucessfully ")
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
                <KeyboardAvoidingView style={styles.container}>
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
                        style={[styles.inputBox, { height: 200 }]}
                        onChangeText={(text) => {
                            this.setState({ story: text });
                        }}
                        value={this.state.story}
                        placeholder="Write Your Story here "
                        multiline={true}
                    />
                    <TouchableOpacity style={styles.button}
                        onPress={this.submitStory}
                    >
                        <Text>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
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
    button: {
        backgroundColor: '#FFCA4F',
        paddingHorizontal: 20,
        margin: 20,
        paddingVertical: 10,
        borderRadius: 5,

    }
});