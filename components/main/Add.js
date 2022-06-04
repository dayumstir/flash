import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
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
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio} 
          type={type}
          ratio={'1:1'}/>
      </View>
      <Button
        style={{
          flex: 0.1,
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}
        title="Flip Image"
        onPress={() => {
           setType(
            type === CameraType.back 
            ? CameraType.front 
            : CameraType.back
          );
        }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()}/>
      <Button title="Pick Image From Gallery" onPress={() => pickImage()}/>
      {image && <Image source={{uri: image}} style={{ flex: 1 }}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }
})


// to allow for longer aspect ratio, need to change it from 1 to something else
