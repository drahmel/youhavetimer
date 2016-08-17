import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
var formatTime = require('minutes-seconds-milliseconds');

var StopWatch = React.createClass({
  getInitialState: function () {
    return {
      timeElapsed: null,
      running: false
    }
  },
  render: function () {
    return <View style={styles.container}>
      <View style={[styles.header, this.border('yellow')]}>
        <View style={[styles.timerWrapper,this.border('red')]}>
        <Text style={styles.timerStyle}>
         {formatTime(this.state.timeElapsed)}
        </Text>
        </View>
        <View style={[styles.buttonWrapper,this.border('green')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer, this.border('blue')]}>
        <Text>
          I am a list of laps
        </Text>
        <Image source={require('./assets/gradient1.png')} style={styles.backgroundImage} />
      </View>
    </View>
  },
  startStopButton: function () {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}
      >

      <Text style={styles.buttonText}>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function () {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}
      >
    <Text style={styles.buttonText}>
    Lap
    </Text>
    </TouchableHighlight>

  },
  handleStartPress: function() {
    console.log("Start press");
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running:false});
      return;
    }
    var startTime = new Date();
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - startTime,
        running: true
      });
    }, 30);
  },
  border: function(color) {
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: { // Yellow
    flex: 1

  },
  footer: { // Blue
    flex: 1
  },
  timerWrapper: { // Red
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40a7e3'
  },
  timerStyle: {
    fontSize: 64,
    color: '#ffffff'
  },
  buttonWrapper: { // Green
    flex: 3,
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#055faa'
  },
  button: {
    borderWidth: 2,
    height: 80,
    width: 160,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  startButton: {
    backgroundColor: '#0088ff',
    borderColor: '#0088ff'
  },
  stopButton: {
    backgroundColor: '#cc0000',
    borderColor: '#cc0000'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
