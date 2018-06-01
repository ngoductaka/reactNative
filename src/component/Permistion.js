import { PermissionsAndroid } from 'react-native';

export default async function Permission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      { }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log("You can use the camera");
      return granted;
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
    return err
  }
}
