import React from 'react';
import { Box, HStack, IconButton, Icon, Text, Menu } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppNavMoreMenu from "./AppNavMoreMenu";
import { useNavigation, DrawerActions  }from '@react-navigation/native';


const AppNavigation = (props) => {
    const navigation = useNavigation();

    const handleToggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <>
            <Box safeAreaTop bg="primary.500"/>
            <HStack bg="primary.500" px="1" pt="1" pb="1" justifyContent="space-between" w="100%">
                <HStack alignItems="center" marginRight="auto">
                    <IconButton icon={<Icon as={Ionicons} name='md-menu' size='5'/>} _icon={{color: "white"}}
                                onPress={handleToggleDrawer}/>
                </HStack>
                <HStack>
                    <Text color="white" fontSize="16" fontWeight="bold" pt="2" marginRight="-5px">
                        {props.title}
                    </Text>
                </HStack>
                <HStack alignItems="center" marginLeft="auto" >
                   <AppNavMoreMenu/>
                </HStack>
            </HStack>
        </>
    )
}
AppNavigation.defaultProps = {
    title: 'Tile Solutions'
}

export default AppNavigation;



