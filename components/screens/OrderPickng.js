import React from "react";
import { StyleSheet } from 'react-native';
import {Box, VStack, Text, Heading, Input, Button, Center} from "native-base";
import AppNavigation from "../shared/AppNavigation";



export default () => {

    return (
        <>
            <AppNavigation />
            <Box style={styles.container}>
                <VStack>
                   <Heading size="lg" mb="5" color="tertiary.700">Order Picking</Heading>
                </VStack>
                <Box>
                    <Input placeholder="Enter Order Confirmation No." style={{textAlign:"center"}}/>
                    <Button size="md" mt="2">Submit</Button>
                </Box>
                <Center>
                    <Heading ize="lg" mb="5" color="text.500" my="3">or</Heading>
                </Center>
            </Box>
        </>
    )
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: "#E7E7E9",
        flex:1,
        paddingTop: 35,
        paddingLeft: 15,
        paddingRight: 15
    }
})
