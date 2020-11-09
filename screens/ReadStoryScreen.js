import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


class ReadStoryScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    ReadStoryScreen
                </Text>
            </View>
        );
    }
}

export default ReadStoryScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });