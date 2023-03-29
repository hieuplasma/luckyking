import { useNavigation } from '@react-navigation/native';
import { NavigationUtils } from '@shared';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/reducer/auth';
import { ScreenName } from './ScreenName';
import auth from '@react-native-firebase/auth';

function DrawerCustom(props: any) {
  const navigation = useNavigation<undefined>();
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, paddingTop: 20, paddingLeft: 20 }}>
      <TouchableOpacity onPress={() => {
        dispatch(removeToken())
        props.navigation?.closeDrawer();
        NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
        let user = auth().currentUser;
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