import React from 'react';
import { Box, HStack, IconButton, Icon, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

const AppNavigation = (props) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openMoreMenu, setMoreMenu] = React.useState(false);

    const handleToggleDrawer = () => {
        setOpenDrawer(!openDrawer);
        console.warn(openDrawer);
    }

    const handleOpenMoreMenu= () => {
        setMoreMenu(!openMoreMenu);
        console.warn(openMoreMenu);
    }

    return (
        <>
            <Box safeAreaTop bg="primary.500"/>
            <HStack bg="primary.500" px="1" pt="0" pb="2" justifyContent="space-between" w="100%">
                <HStack alignItems="center">
                    <IconButton icon={<Icon as={Ionicons} name='md-menu' size='5'/>} _icon={{color: "white"}}
                                onPress={handleToggleDrawer}/>
                    <Text color="white" fontSize="20" fontWeight="bold">
                        {props.title}
                    </Text>
                </HStack>
                <HStack>
                    <IconButton onPress={handleOpenMoreMenu} icon={<Icon as={Ionicons} name='md-ellipsis-vertical' size='5'/>}
                                _icon={{color: "white"}}/>
                </HStack>
            </HStack>
        </>
    )
}
AppNavigation.defaultProps = {
    title: 'Tile Solutions'
}

export default AppNavigation;



