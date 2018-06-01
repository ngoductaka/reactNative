import React, { Component } from 'react';
import { FlatList, AppRegistry, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Board from './src/component/Board';
import AiBoard from './src/component/AiBoard';
import Weather from './src/component/Weather';
import PM from './src/component/PM';
import Location from './src/component/Location';
import Map from './src/component/Map';
import History from './src/component/History';
import MapView from 'react-native-maps';

export default class PmApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            history: true
        }
    }

    componentDidMount() {

    }
    switchView(his) {
        this.setState({
            history: !his
        })
        console.log("pm App",this.state.history)
    }
    render() {
        const { history } = this.state
        return (
            <View style={{ flex: 1 }}>
                {/* swith map */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center' }}>
                        <Text onPress={() => this.switchView(this.state.history)} > pm history map</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
                        <Text onPress={() => this.switchView(this.state.history)}> PM map </Text>
                    </View>
                </View>
                {/* map */}
                <View style={{ flex: 7 }}>
                    <Map history={this.state.history} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ });
