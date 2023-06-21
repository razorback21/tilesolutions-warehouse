import React from "react";
import { StyleSheet } from 'react-native';
import {Box, VStack, Heading, Input, Button, Center, Divider} from "native-base";
import { useRouter } from 'expo-router';
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import WhiteButton from "../../components/shared/WhiteButton";
import AppStyles from "../../AppStyles";


export default (props) => {
    const router = useRouter();

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    const orderReceived = () => {
        router.push('/orderpicking/order_received')
    }

    return (
        <>
            <AppBackNavigation path="/"/>
            <Box style={styles.topContainer}>
                <VStack>
                   <Heading size="md" mb="3" color="tertiary.700">Order Picking</Heading>
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

