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
      running: false,
      startTime: null,
      laps: []
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
        <Image source={require('./assets/gradient1.png')} style={styles.backgroundImage}>
        <View style={styles.footer}>
          {this.laps()}
        </View>

      </Image>
      </View>
    </View>
  },
  laps: function () {
    return this.state.laps.map(function (time, index) {
      return <View style={styles.lap}>
        <Text style="styles.lapText">
          Lap #{index + 1}
        </Text>
        <Text style="styles.lapText">
          {formatTime(time)}
        </Text>
      </View>
    })
  }
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
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleLapPress}
      style={[styles.button]}
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

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },
  handleLapPress: function() {
    console.log("Lap press");
    var lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      // Use concat because push doesn't adds to array, but concat replaces it
      laps: this.state.laps.concat([lap]);
    })
  },
  border: function(color) {
    return {
      //borderColor: color,
      //borderWidth: 4
    }
  },
  fontlist: function () {
    return (
      <View>
        <Text style={{fontFamily: 'Cochin'}}>
          Cochin
        </Text>
        <Text style={{fontFamily: 'Cochin', fontWeight: 'bold'}}>
          Cochin bold
        </Text>
        <Text style={{fontFamily: 'Helvetica'}}>
          Helvetica
        </Text>
        <Text style={{fontFamily: 'Helvetica', fontWeight: 'bold'}}>
          Helvetica bold
        </Text>
        <Text style={{fontFamily: 'Verdana'}}>
          Verdana
        </Text>
        <Text style={{fontFamily: 'Verdana', fontWeight: 'bold'}}>
          Verdana bold
        </Text>
      </View>
    );
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
    backgroundColor: '#222222'
  },
  timerStyle: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 58,
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
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  listText: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
