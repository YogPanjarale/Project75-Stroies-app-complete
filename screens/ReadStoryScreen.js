import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList, Image
} from 'react-native';
import { SearchBar, Header,Icon } from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';

class ReadStoryScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            storiesList: [],
            search: '',
            resultList: [],
            selectedStory: {},
            full: false,
        }
    }
    componentDidMount = () => {
        this.getStories()
        // setInterval(this.getStories,2000)
    }
    getStories = async () => {
        var storiesRef = await db.collection('Stories').get()
        console.log(storiesRef)
        storiesRef.forEach(doc => {
            this.setState({
                storiesList: [...this.state.storiesList, doc.data()]
            })
        });
        this.setState({
            resultList: this.state.storiesList
        })
    }
    updateSearch = async () => {
        if (this.state.search == "" || this.state.search == null) {
            this.setState({
                resultList: this.state.storiesList
            })
            return
        }
        console.log('updating ....')
        this.setState({
            resultList: this.state.storiesList.filter(item => {

                //console.log(item,item.StoryTitle)
                if (item.StoryTitle) {
                    var result = item.StoryTitle.toLowerCase().includes(this.state.search.toLowerCase())
                    // console.log(result)
                    return result
                }
                return false
            })
        })

    }
    openStory = (item) => {
        console.log(item)
        this.setState({
            selectedStory: item,
            full: true
        })
    }
    render() {
        return (
        <View >{this.state.full ?

            <View style={styles.container}>
                <Header
                    backgroundColor={'#39B39C'}
                    leftComponent={
                        <TouchableOpacity style={{}}
                            onPress={() => { this.setState({ full: false ,selectedStory:false}) }}>
                                <Icon
                                name="arrow-back"
                                color="#fff"/>
                        </TouchableOpacity>}
                    centerComponent={{
                        text: 'Read Stories',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                />
                <ScrollView>
                <Text style={[styles.paragraph,{fontSize:25}]}>{this.state.selectedStory.StoryTitle}</Text>
                <Text style={[styles.paragraph,{fontSize:20,fontWeight:400,marginVertical:5}]}>{this.state.selectedStory.Author}</Text>
                <Text style={[styles.paragraph,{fontSize:14,fontWeight:200}]}>{this.state.selectedStory.story}</Text>
                </ScrollView>
            </View>
            :
            <View style={styles.container}>
                <Header
                    backgroundColor={'#39B39C'}
                    centerComponent={{
                        text: 'Read Stories',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                />
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={(val) => {
                        this.setState({ search: val })
                        // console.log("  ...."+val+"..... ")
                        this.updateSearch()
                    }}
                    lightTheme
                    onClear={() => {
                        this.setState({ resultList: this.state.storiesList });
                        console.log('input cleared')
                    }}
                    value={this.state.search}
                />
                <Text>{this.state.search}</Text>
                <ScrollView>
                    {
                        this.state.resultList.map((doc, index) => {
                            // console.log(doc)
                            //  return <BookItem key={index} doc={doc} />
                        })
                    }
                    <FlatList
                        data={this.state.resultList}
                        renderItem={({ item }) => (

                            <BookItem doc={item} onPress={() => { this.openStory(item) }} />

                        )}

                        keyExtractor={item => item.StoryTitle}
                        onEndReached={this.updateSearch}
                        onEndReachedThreshold={0.7}
                    />
                </ScrollView>
            </View>}</View>
        );
    }
}
const BookItem = ({ doc, onPress }) => {
    //console.log(doc)
    return (
        <TouchableOpacity style={styles.story} onPress={onPress}>
            <Text>
                StoryTitle: {doc.StoryTitle}
            </Text>
            <Text>
                Author: {doc.Author}
            </Text>
        </TouchableOpacity>)
}
const renderItem = ({ doc }) => (
    <BookItem doc={doc} />
);
export default ReadStoryScreen;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#ecf0f1',
        // alignItems: 'center',
        //   justifyContent: 'center',
    },
    paragraph: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'left'
    },
    story: {
        borderBottomWidth: 5,
        borderWidth: 2,
        borderColor: '#39B39C',
        // width: 250,
        marginVertical: 5,
        padding: 5,

    }
});