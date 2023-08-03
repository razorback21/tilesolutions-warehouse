import React from 'react';
import { Box, HStack, IconButton, Icon, Text } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const AppBackNavigation = (props) => {
    const router = useRouter();

    const navigationHandler = () => {
        if(props.goback) {
            router.back();
        } else if(props.route){
            router.push(props.route);
        } else {
            router.push({pathname: props.path, params: props.params});
        }

        if(props.navigateHandler) {
            props.navigateHandler();
        }
    }

    return (
        <>
            <Box safeAreaTop bg="primary.500"/>
            <HStack bg="primary.500" px="1" pt="1" pb="1"  alignItems="center" justifyContent="space-around">
                <HStack alignItems="center" style={{flexBasis: "10%"}}>
                    <IconButton icon={<Icon as={MaterialIcons} name='arrow-back-ios' size='5'/>} _icon={{color: "white"}}
                                onPress={navigationHandler}/>
                    <Text color="white" fontSize="16" fontWeight="bold" onPress={navigationHandler}>
                        {props.backButtonLabel}
                    </Text>
                </HStack>
                <Text color="white" fontSize="16" fontWeight="bold" style={{flexBasis:"50%"}} textAlign="center">
                    {props.title}
                </Text>
                <HStack style={{flexBasis: "10%"}}>
                    {/* additional icon buttons here  */}
                </HStack>

            </HStack>
        </>
    )
}
AppBackNavigation.defaultProps = {
    backButtonLabel: 'Back',
    title: " ",
    navigateHandler: false
}

export default AppBackNavigation;



