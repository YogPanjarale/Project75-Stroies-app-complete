import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native';
import { SearchBar,Header} from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';

class ReadStoryScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            storiesList: [],
            search: '',
            resultList: []
        }
    }
    componentDidMount = () => {
        this.getStories()
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
        if(this.state.search==""||this.state.search==null){
            this.setState({
                resultList: this.state.storiesList
            })
            return
        }
        console.log('updating ....')
        this.setState({
            resultList: this.state.storiesList.filter(item => {
                
                //console.log(item,item.StoryTitle)
                if(item.StoryTitle)
                {var result = item.StoryTitle.toLowerCase().includes(this.state.search.toLowerCase())
                // console.log(result)
                return result}
                return false
            })
        })

    }
    
    render() {
        return (
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
                    onClear={()=>{this.setState({resultList:this.state.storiesList});
                    console.log('input cleared')
                                }}
                    value={this.state.search}
                />
                <Text>{this.state.search}</Text>
                <ScrollView>
                {
                    this.state.resultList.map((doc, index) => {
                        // console.log(doc)
                        return (
                            <TouchableOpacity key={index} style={styles.story}>
                                <Text>
                                    StoryTitle: {doc['StoryTitle']}
                                </Text>
                                <Text>
                                    Author: {doc['Author']}
                                </Text>
                            </TouchableOpacity>

                        )
                    })
                }
                </ScrollView>
            </View>
        );
    }
}

export default ReadStoryScreen;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        //   justifyContent: 'center',
    },
    story: {
        borderBottomWidth: 2,
        borderColor: '#39B39C',
        // width: 250,
        marginVertical: 10,
        

    }
});