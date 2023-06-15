import React from 'react';
import { Box, HStack, IconButton, Icon, Text } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const AppBackNavigation = (props) => {
    const router = useRouter();

    const goBack = () => {
        router.push(props.path);
    }

    return (
        <>
            <Box safeAreaTop bg="primary.500"/>
            <HStack bg="primary.500" px="1" pt="0" pb="1" alignItems="center">
                <HStack alignItems="center">
                    <IconButton icon={<Icon as={MaterialIcons} name='arrow-back-ios' size='5'/>} _icon={{color: "white"}}
                                onPress={() => goBack()}/>

                </HStack>
                <Text color="white" fontSize="16" fontWeight="bold" onPress={() => goBack()}>
                    {props.title}
                </Text>
            </HStack>
        </>
    )
}
AppBackNavigation.defaultProps = {
    title: 'Back'
}

export default AppBackNavigation;



