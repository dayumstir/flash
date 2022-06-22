import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status !== 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri)
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // will probably need a MediaTypeOptions.Videos too
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  }

  if (hasCameraPermission === null || hasGalleryPermission  === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission  === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        <View style={styles.cameraContainer}>
            <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'}/>
        </View>
        
        <TouchableOpacity style={styles.flipCameraButtonContainer}
            onPress={() => {
            setType(
                type === CameraType.back 
                ? CameraType.front 
                : CameraType.back
            );
            }}>
                {/* <Text style={styles.buttonText}>Flip Camera</Text> */}
                <Image 
                    source={require('../../assets/flip_camera_icon.png')}
                    style={{ width: 50, height: 50 }}
                />
        </TouchableOpacity>
        
        <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.pickGalleryButton} onPress={() => pickImage()}>
                {/* <Text style={styles.buttonText}>Pick From Gallery</Text> */}
                <Image 
                        source={require('../../assets/pick_gallery_icon.png')}
                        style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.takePictureButton} onPress={() => takePicture()}>
                {/* <Text style={styles.buttonText}>Take Picture</Text> */}
                <Image 
                        source={require('../../assets/take_picture_icon.png')}
                        style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Save', {image})}>
                {/* <Text style={styles.buttonText}>Save</Text> */}
                <Image 
                        source={require('../../assets/save_icon.png')}
                        style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity>
        </View>

        {image && <Image source={{uri: image}} style={{ flex: 1 }}/>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    cameraContainer: {
        flex: 0.55,
        flexDirection: 'row',
    },
    flipCameraButtonContainer: {
        flex: 0.2,
        alignSelf: 'flex-end',
        height: 50, 
        width: 80,
    },
    bottomContainer: {
        flex: 0.2,
        flexDirection: 'row',
    },
    takePictureButton: {
        flex: 0.6,
        alignItems: 'center',
        alignSelf: 'center',
        height: 50, 
        width: 80,
    },
    pickGalleryButton: {
        flex: 0.3,
        alignItems: 'center',
        alignSelf: 'center',
        height: 50, 
        width: 40,
    },
    saveButton: {
        flex: 0.3,
        alignItems: 'center',
        alignSelf: 'center',
        height: 50, 
        width: 40,
    },
    buttonText: {
        color: "white"
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})


// to allow for longer aspect ratio, need to change it from 1 to something else
