'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Gallery from 'react-native-gallery';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {

  constructor(props) {
    super(props);

    this._dismissModal = this._dismissModal.bind(this);
    this.state = {
      showCommentBox: true,
      page: 0,
      modalVisible: false,
      images: [],
    };
  }

  _selectPhoto() {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          images: [source],
          modalVisible: true,
        })
      }
    });
  }

  render() {
    let commentBox;
    if(this.state.showCommentBox) {
      commentBox = (
        <View
          style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 100, backgroundColor: '#00000066', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white'}}>What a nice holiday you have!</Text>
          <Text style={{color: 'white'}}>page: {this.state.page}</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this._selectPhoto.bind(this)}
            activeOpacity={0.8} >
            <Image
              style={{width: 100, height: 100, backgroundColor: 'yellow'}}
              source={(this.state.images.length > 0
                ? this.state.images[0]
                : {uri: 'http://pic.baike.soso.com/p/20131221/20131221035449-635662948.jpg'})}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: 'blue'}}/>
        <View style={{flex: 1, backgroundColor: 'green'}}/>

        <Modal
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{flex: 1}}>
            <Gallery
              style={{flex: 1, backgroundColor: 'transparent'}}
              initialPage={0}
              pageMargin={10}
              images={this.state.images}
              onSingleTapConfirmed={() => {
          // this.toggleCommentBox();
          this._dismissModal();
        }}
              onGalleryStateChanged={(idle) => {
          if(!idle) {
            this.hideCommentBox();
          }
        }}
              onPageSelected={(page) => {
           this.setState({page});
        }}
            />
            {commentBox}
          </View>
        </Modal>
      </View>
    );
  }

  toggleCommentBox() {
    if(!this.state.showCommentBox) {
      this.setState({
        showCommentBox: true
      });
    } else {
      this.setState({
        showCommentBox: false
      });
    }
  }

  hideCommentBox() {
    if(this.state.showCommentBox) {
      this.setState({
        showCommentBox: false
      });
    }
  }

  _dismissModal() {
    this.setState({
      modalVisible: false
    });
  }
}
