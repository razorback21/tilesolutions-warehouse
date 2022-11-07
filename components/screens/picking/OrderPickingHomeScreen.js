import React from "react";
import { StyleSheet } from 'react-native';
import {Box, VStack, Heading, Input, Button, Center, Divider} from "native-base";
import AppBackNavigation from "../../shared/AppBackNavigation";
import WhiteButton from "../../shared/WhiteButton";
import AppStyles from "../../../AppStyles";


export default (props) => {

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    const orderReceived = () => {
        props.navigation.navigate('OrderReceived');
    }

    return (
        <>
            <AppBackNavigation navigation={props.navigation}/>
            <Box style={styles.topContainer}>
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
                    <WhiteButton title="Scan NFC Tag" icon="nfc" mb="2" onPress={scanNFCTag}/>
                    <WhiteButton title="Scan QR code" icon="qr-code-scanner"onPress={scanQRCode}/>
                </VStack>
                <Divider my="6"/>
                <WhiteButton title="Order Received" icon="call-received" mb="2" onPress={orderReceived}/>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    ...AppStyles
})

