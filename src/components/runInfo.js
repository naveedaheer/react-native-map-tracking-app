import React, { Component } from 'react';
import { Text, View } from 'react-native';
import sharedStyle from './../styles/sharedStyle';

export default class RunInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
    }

    formatValue() {
        return this.state.value;
    }

    render() {
        let value = this.state.value ? this.formatValue() : '-';
        return (
            <View style={[sharedStyle.runInfoWrapper, { flex: 1, flexDirection: 'column-reverse' }]}  >
                <Text style={sharedStyle.runInfoTitle} >{this.props.title.toUpperCase()}</Text>
                <Text style={sharedStyle.runInfoValue} >{value}</Text>
            </View>
        );
    }
}