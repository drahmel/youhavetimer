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
          <Image source={require('./assets/gradient1w.png')} style={styles.buttonBackgroundImage}>
            {this.startStopButton()}
          </Image>
          {this.lapButton()}
        </View>
      </View>
      <View style={[styles.footer, this.border('blue')]}>
        <Image source={require('./assets/gradient1w.png')} style={styles.backgroundImage}>
          {this.laps()}
        </Image>
      </View>
    </View>
  },
  laps: function () {
    return this.state.laps.map(function (time, index) {
      return <View key={index} style={styles.lap}>
        <Text style={styles.lapText}>
          Lap {index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function () {
    var style;
    if(this.state.running) {
      style = styles.stopButton;
    } else {
      style = styles.startButton;
    }

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
    var style = styles.startButton;
    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleLapPress}
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
    } else {
      this.setState({laps:[]});
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 300);
  },
  handleLapPress: function() {
    if(this.state.running) {
      console.log("Lap press");
      var lap = this.state.timeElapsed;

      this.setState({
        startTime: new Date(),
        // Use concat because push adds to array, but concat replaces it
        laps: this.state.laps.concat([lap])
      });
    }
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
    alignItems: 'stretch',
    marginTop: 20,
    width: null,
    height: null,
  },
  header: { // Yellow
    flex: 1

  },
  footer: { // Blue
    flex: 1,
    backgroundColor: '#055f99',
  },
  timerWrapper: { // Red
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
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
    backgroundColor: '#055faa',
    minHeight: 100
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
    backgroundColor: 'transparent',
    borderColor: '#0088ff'
  },
  stopButton: {
    backgroundColor: '#cc0000',
    borderColor: '#cc0000'
  },
  buttonBackgroundImage: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    resizeMode: 'cover', // cover or 'stretch'
    width: null,
    height: null,
    borderRadius: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // cover or 'stretch'
    width: null,
    height: null,
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  lapText: {
    fontSize: 30,
    color: 'white'
  },
  listText: {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 20
  }
})

AppRegistry.registerComponent('stopwatch', () => StopWatch);
