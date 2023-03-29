import { useNavigation } from '@react-navigation/native';
import { NavigationUtils } from '@shared';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeToken } from '../redux/reducer/auth';
import { ScreenName } from './ScreenName';

function DrawerCustom(props: any) {
    const navigation = useNavigation<undefined>();
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1, paddingTop: 20, paddingLeft: 20 }}>
          <TouchableOpacity onPress={()=> {
            dispatch(removeToken()) 
            props.navigation?.closeDrawer();
            NavigationUtils.resetGlobalStackWithScreen(navigation, ScreenName.Authentication);
          } }>
            <Text>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
    )
}
export default DrawerCustom