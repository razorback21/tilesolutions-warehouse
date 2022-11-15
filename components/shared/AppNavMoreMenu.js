import {Box, Menu, Icon, IconButton} from 'native-base';
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuth from "../../hooks/useAuth";

const AppNavMoreMenu = () => {
    const [appLogout] = useAuth();

    return (<Box w="5%" alignItems="center">
                <Menu on w="150" defaultIsOpen={false} trigger={triggerProps => {
                       return <IconButton {...triggerProps} icon={<Icon as={Ionicons} name='md-ellipsis-vertical' size='5'/>}
                                         _icon={{color: "white"}}/>;
                }}>
                    <Menu.Item onPress={appLogout}>Log out</Menu.Item>
                </Menu>
            </Box>
    )
}

export default AppNavMoreMenu;
