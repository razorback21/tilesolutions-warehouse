import {Box, Menu, Icon, IconButton} from 'native-base';
import Ionicons from "@expo/vector-icons/Ionicons";


const AppNavMoreMenu = () => {
    const logout = () => {
        console.warn('log out')
    }

    return (<Box w="5%" alignItems="center">
                <Menu on w="150" defaultIsOpen={false} trigger={triggerProps => {
                       return <IconButton {...triggerProps} icon={<Icon as={Ionicons} name='md-ellipsis-vertical' size='5'/>}
                                         _icon={{color: "white"}}/>;
                }}>
                    <Menu.Item onPress={logout}>Log out</Menu.Item>
                </Menu>
            </Box>
    )
}

export default AppNavMoreMenu;
