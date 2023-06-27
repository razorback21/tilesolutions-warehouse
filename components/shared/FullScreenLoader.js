import {Spinner, VStack, Center, Text, Box, HStack} from 'native-base';
import React from "react";

const FullScreenLoader = (props) => {
    return (<>
                <Box safeAreaTop bg="primary.500"/>
                <HStack bg="primary.500" px="1" pt="0" pb="1" justifyContent="center" alignItems="center" w="100%">
                    <Text color="white" fontSize="16" fontWeight="bold" pt="1" pb="2">
                        {props.title}
                    </Text>
                </HStack>
                <VStack justifyContent="center" alignItems="center" width="100%" height="100%">
                <Box>
                    <Center>
                        <Spinner size={props.size} color={props.color}/>
                    </Center>
                    <Center>
                        <Text>{props.text}</Text>
                    </Center>
                </Box>
            </VStack>
        </>
    )
}

export default FullScreenLoader;

FullScreenLoader.defaultProps = {
    size: 'md',
    color: 'primary.500',
    text: 'Loading...',
    title: 'Please wait...'
}