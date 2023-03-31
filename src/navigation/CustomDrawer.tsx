import { useNavigation } from '@react-navigation/native';
import { NavigationUtils } from '@utils';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/reducer/auth';
import { ScreenName } from './ScreenName';
import auth from '@react-native-firebase/auth';
import { removeUser } from '@redux';

function DrawerCustom(props: any) {
  const navigation = useNavigation<undefined>();
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 120, paddingLeft: 20 }}>
      <TouchableOpacity onPress={() => {
        dispatch(removeToken())
        dispatch(removeUser())
        props.navigation?.closeDrawer();
        NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
        auth()
          .signOut()
          .then(() => console.log('User signed out!'));
      }}>
        <Text>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  )
}
export default DrawerCustom