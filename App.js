import React, { Component } from 'react';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
 

import {
  Platform,
  StyleSheet,
  Text,
  View,
 Dimensions,
 Image,
 TouchableOpacity,

} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const StartStop = 0;

const FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#ff4081', height:300, width: Dimensions.get('window').width} ]} />;
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7',height:300, width: Dimensions.get('window').width} ]} />;
 


export default class TabViewExample extends Component {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Pronunciation' },
      { key: '2', title: 'Grammar' },
    ],
  };
 
  _handleIndexChange = index => this.setState({ index });
 
  _renderHeader = props => <TabBar {...props} />;
 
  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
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

    <TouchableOpacity onPress={this._onPressButton}>
    <Image 
       style={{width: 140, height: 140}}
       source={require('./images/mic1.png')}
     />

    </TouchableOpacity>

  </View>
  <TouchableOpacity onPress={this._onPressButton}> 
  <View style={{width: '80%', height: 45, marginLeft: '10%', backgroundColor:'#41cbc7',borderRadius:5,justifyContent:'center',alignItems:'center'}}>
                        
    <Text style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
    Start Recording
    </Text>
    </View>
    </TouchableOpacity>



  
  <View style={{width:Dimensions.get('window').width, height: 30,alignItems:'flex-start',justifyContent:'center'}}>
    
    <Text style={{fontSize:20,fontFamily: 'sans-serif-condensed',color:'#1E434C'}}>Report</Text>   
       
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