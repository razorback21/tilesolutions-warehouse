import React from "react";
import { StyleSheet } from 'react-native';
import {Box, VStack, Heading, Input, Button, Center, Divider} from "native-base";
import AppBackNavigation from "../../shared/AppBackNavigation";
import WhiteButton from "../../shared/WhiteButton";



export default (props) => {

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    const orderReceived = () => {
        console.warn('Goto order received');
    }

    return (
        <>
            <AppBackNavigation navigation={props.navigation}/>
            <Box style={styles.container}>
                <VStack>
                   <Heading size="md" mb="5" color="tertiary.700">Order Picking</Heading>
                </VStack>
                <Box>
                    <Input placeholder="Enter Order Confirmation No."/>
                    <Button size="md" mt="2">Submit</Button>
                </Box>
                <Center>
                    <Heading size="md" mb="5" color="text.500" my="3">or</Heading>
                </Center>
                <VStack>
                    <WhiteButton title="Scan NFC Tag" icon="nfc" mb="2" handler={scanNFCTag}/>
                    <WhiteButton title="Scan QR code" icon="qr-code-scanner"handler={scanQRCode}/>
                </VStack>
                <Divider my="6"/>
                <WhiteButton title="Order Received" icon="call-received" mb="2" handler={orderReceived}/>
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
