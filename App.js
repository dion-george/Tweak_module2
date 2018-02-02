import React, { Component } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {SpeechToText} from 'react-native-watson';
 import Grammar from './Grammar';

import {
  Platform,
  StyleSheet,
  Text,
  View,
 Dimensions,
 Image,
 TouchableOpacity,

} from 'react-native';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

const StartStop = 0;

// const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081', height:300, width: Dimensions.get('window').width} ]}>
 // <Text style={[this.answerStyle()]}>{this.state.answer}</Text>
      // </View>;
// const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7',height:300, width: Dimensions.get('window').width} ]} />;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
 


export default class TabViewExample extends Component {
    constructor(props){
  super()

  this.state = {
    index: 0,
    grammerText: "random",
    grammar: "",
    routes: [
      { key: '1', title: 'Pronunciation' },
      { key: '2', title: 'Grammar' },
    ],
    sentence: 'She only paints with bold colours; she does not like pastels',
    answer: 'Your answer will appear as you speak',
    color:'red',
    instruction: "Start Recording"
  };
 
 this.onSpeechButtonPress = this.onSpeechButtonPress.bind(this)
  this.onStopButtonPress = this.onStopButtonPress.bind(this)
  this.FirstRoute  = this.FirstRoute.bind(this)
  this.SecondRoute  = this.SecondRoute.bind(this)


    this.onMicRelease = this.onMicRelease.bind(this);
    this.onMicPress = this.onMicPress.bind(this);
}


 FirstRoute = () => <Grammar grammar = {this.state.grammerText} />
  SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7',height:300, width: width} ]} >
<Text style={this.answerStyle()}>{this.state.grammar}</Text>
  </View>;

    onMicPress = () => {
        this.onSpeechButtonPress();
    }
    
    onMicRelease = () => {
        this.onStopButtonPress();
    }
 



onSpeechButtonPress() {
  var ref = this;
  let grammerText = ""
        if(this.state.instruction=='Start Recording')
        // will transcribe microphone audio/
        {
          SpeechToText.startStreaming((error, text) =>
        {

            if(text){
              console.log("Text",text)
              result = JSON.parse(text)
          
            word_confidence = result[0]['alternatives'][0]['word_confidence'] 
            if(word_confidence){
              this.setState({answer: ''})
            for (var i = 0; i < word_confidence.length; i++)
            {
              for (var j = 0; j < word_confidence[i].length; j++)
              {
                    console.log('word_confidence[' + i + '][' + j + '] = ' + word_confidence[i][j]);
                    pronounciation = word_confidence[i][j]
                    if(j==1)
                    {
                      pronounciation = word_confidence[i][j]*100;
                      if(pronounciation<50){this.setState({color:'yellow'})}
                      else{this.setState({color:'blue'})}  
                    }
                  else{
                    
                     grammerText =  grammerText + pronounciation + " ";
                  }
                    this.setState({answer: this.state.answer + ":" + pronounciation})
                    console.log(this.state.answer)
                    
              }
            }

              fetch('https://8xzzaark26.execute-api.ap-south-1.amazonaws.com/final?text=' + grammerText, {
              method: 'GET',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              },
            }).then((response) => {
              
              var toUpdate = ref.state.grammar + response._bodyText.substr(1,response._bodyText.length-1) + ". ";
              this.setState({
              grammar: toUpdate
            });
            }).catch((error) => {
              console.error(error);
            this.setState({
          grammar: "Failed to connect to server!"
          });
          });
  
            }

            }
            else{
              console.log(error)
            }
          })
          this.setState({instruction: 'Stop Recording'})
          console.log("Button Pressed");
        }
        else{
          SpeechToText.stopStreaming()
          this.setState({instruction: 'Start Recording'})
          console.log("stop")      
        }                

    
  };

  onStopButtonPress() {
    SpeechToText.stopStreaming()
    this.setState({instruction: 'Start Recording'})
    console.log("stop")  
  };
  
    answerStyle = () => {
     return {
      backgroundColor: this.state.color
    }
   }


  _handleIndexChange = index => this.setState({ index });
 
  _renderHeader = props => <TabBar {...props} />;
 
  _renderScene = SceneMap({
    '1': this.FirstRoute,
    '2': this.SecondRoute,
  });

  render() {
    console.log("SpeechToText initialized")
      SpeechToText.initialize("1f340809-9ea9-4eaa-9404-83042e08f853", "IwxHoB67AAJE")

    return (
<View style={{flex:1,flexDirection: 'column'}}> 
    
  <View style={{width:Dimensions.get('window').width, height: 50, backgroundColor: '#40c9c4'}}>
    
    <View style={{flex: 1, flexDirection: 'row'}}>


      <View style={{width:270}}>

        <TouchableOpacity onPress={this._onPressButton}>
          <Text style={{textAlign:'center',alignSelf:'center',fontSize:20,fontWeight:'bold',color:'#063852',marginTop:10,fontFamily: 'sans-serif-condensed'}}> Grammar Check</Text>
        </TouchableOpacity>
      </View> 
    </View>
        
  </View>



  <View style={{width:Dimensions.get('window').width, height: 40,alignItems:'center',justifyContent:'center'}}>
    
    <Text style={{fontSize:20,fontFamily: 'sans-serif-condensed',fontWeight:'bold',color:'#1E434C'}}> Take a question</Text>   
       
  </View>     


  
  <View style={{width:Dimensions.get('window').width, height: 180, alignItems:'center',justifyContent:'center'}}>

    <TouchableOpacity onPressIn={this.onMicPress} onPressOut={this.onMicRelease}>
    <Image 
       style={{width: 140, height: 140}}
       source={require('./images/mic1.png')}
     />

    </TouchableOpacity>

  </View>
  <TouchableOpacity onPress={this.onSpeechButtonPress.bind(this)}> 
  <View style={{width: '80%', height: 45, marginLeft: '10%', backgroundColor:'#41cbc7',borderRadius:5,justifyContent:'center',alignItems:'center'}}>    
                             
    <Text style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
    {this.state.instruction}
    </Text>
    </View>
    </TouchableOpacity>



  
  <View style={{width:Dimensions.get('window').width, height: 30,alignItems:'flex-start',justifyContent:'center'}}>
    
    <Text style={{fontSize:20,fontFamily: 'sans-serif-condensed',color:'#1E434C'}}>Report:{this.state.answer}Grammar:{this.state.grammar}</Text>   
       
  </View>     






      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}

  />

  



</View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    // flex: 1,
  width: Dimensions.get('window').width,


  },
});