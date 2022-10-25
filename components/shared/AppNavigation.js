import React from 'react';
import { Box, HStack, IconButton, Icon, Text, Menu } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppNavMoreMenu from "./AppNavMoreMenu";


const AppNavigation = (props) => {

    const handleToggleDrawer = () => {
        props.navigation.toggleDrawer();
    }

    return (
        <>
            <Box safeAreaTop bg="primary.500"/>
            <HStack bg="primary.500" px="1" pt="0" pb="1" justifyContent="space-between" w="100%">
                <HStack alignItems="center" marginRight="auto">
                    <IconButton icon={<Icon as={Ionicons} name='md-menu' size='5'/>} _icon={{color: "white"}}
                                onPress={handleToggleDrawer}/>

                </HStack>
                <HStack>
                    <Text color="white" fontSize="16" fontWeight="bold" pt="2" ml="-5">
                        {props.title}
                    </Text>
                </HStack>
                <HStack marginLeft="auto">
                   <AppNavMoreMenu />
                </HStack>
            </HStack>
        </>
    )
}
AppNavigation.defaultProps = {
    title: 'Tile Solutions'
}

export default AppNavigation;



