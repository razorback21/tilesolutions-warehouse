import {Box, Menu, Icon, IconButton} from 'native-base';
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuth from "../../hooks/useAuth";

const AppNavMoreMenu = () => {
    const {appLogout} = useAuth();

    const handleLogout = () => {
        appLogout();
    }

    return (<Box w="5%" alignItems="center">
                <Menu w="150" defaultIsOpen={false} trigger={triggerProps => {
                       return <IconButton marginRight="5px" {...triggerProps} icon={<Icon as={Ionicons} name='md-ellipsis-vertical' size='5'/>}
                                         _icon={{color: "white"}}/>;
                }}>
                    <Menu.Item onPress={handleLogout}>Log out</Menu.Item>
                </Menu>
            </Box>
    )
}

export default AppNavMoreMenu;
