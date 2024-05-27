import {PermissionsAndroid, Platform} from 'react-native';
import {
  check,
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const requestPermissions = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const permissions = [
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ];

      const statuses = await checkMultiple(permissions);

      const allGranted = Object.values(statuses).every(
        status => status === RESULTS.GRANTED,
      );

      if (allGranted) {
        return true;
      } else {
        const requestStatuses = await requestMultiple(permissions);
        const allRequestGranted = Object.values(requestStatuses).every(
          status => status === RESULTS.GRANTED,
        );
        return allRequestGranted;
      }
    } else if (Platform.OS === 'ios') {
      const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        const requestStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        return requestStatus === RESULTS.GRANTED;
      }
    }
  } catch (err) {
    console.error('Permission request error:', err);
    return false;
  }

  return false;
};
