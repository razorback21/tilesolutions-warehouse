import React from "react";
import { StyleSheet } from 'react-native';
import {Box, VStack, Heading, Input, Button, Center, Divider, useDisclose} from "native-base";
import { useRouter, Stack as RouterStack } from 'expo-router';
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import WhiteButton from "../../components/shared/WhiteButton";
import AppStyles from "../../AppStyles";
import useApi from "../../hooks/useApi";
import ModalMessage from "../../components/shared/ModalMessage";
import {useQueryClient} from "@tanstack/react-query";

export default (props) => {
    const [CONumber, setCONumber] = React.useState('0000203539');
    const [modalTitle, setModalTitle ] = React.useState('Message');
    const [modalMessage, setModalMessage ] = React.useState('');
    const router = useRouter();
    const queryClient = useQueryClient();
    const {tsQuery} = useApi();
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const verifyOrder = (co_number) => {
        return tsQuery(
           `VerifyOrderForPicking($CONumber: String!) {
                    VerifyOrderForPicking(CONumber: $CONumber) 
            }`,
            {
                CONumber: co_number
            }).then(res => {
                return res.data.data.VerifyOrderForPicking;
            })
    }


    const viewOrderForPicking = () => {
        if(!CONumber || CONumber === '') {
            onOpen();
            setModalTitle('Error');
            setModalMessage('Order confirmation field is required. Please enter a value.');
        } else {
            verifyOrder(CONumber.toString()).then(valid => {
                if(valid) {
                    router.push({pathname: '/orderpicking/step_two', params: {co: CONumber}});
                } else {
                    onOpen();
                    setModalTitle('Error');
                    setModalMessage('CO number is not valid. Try again.')
                }
            });
        }
    }

    const scanNFCTag = async () => {
        //console.warn('scanning NFC tag', await SecureStore.getItemAsync('api-token'));
    }

    const scanQRCode = async () => {
        console.warn('scanning QR Code');
    }

    const gotoOrderReceived = async () => {
        await queryClient.invalidateQueries();
        router.push('/orderpicking/order_received')
    }

    return (
        <>
            <RouterStack.Screen/>
            <ModalMessage isOpen={isOpen} onClose={onClose} title={modalTitle} message={modalMessage}/>

            <AppBackNavigation route="/"/>
            <Box style={styles.topContainer}>
                <VStack>
                   <Heading size="md" mb="3" color="tertiary.700">Order Picking</Heading>
                </VStack>
                <Box>
                    <Input placeholder="CO #." onChangeText={(text) => setCONumber(text)} defaultValue={CONumber} size="xl" fontSize="25px" textAlign="center"/>
                    <Button size="md" mt="2" onPress={viewOrderForPicking}>Submit</Button>
                </Box>
                <Center>
                    <Heading size="md" mb="5" color="text.500" my="3">or</Heading>
                </Center>
                <VStack>
                    {/*<WhiteButton title="Scan NFC Tag" icon="nfc" mb="2" onPress={scanNFCTag}/>*/}
                    <WhiteButton title="Scan QR code" icon="qr-code-scanner"onPress={scanQRCode}/>
                </VStack>
                <Divider my="6"/>
                <WhiteButton title="Order Received" icon="call-received" mb="2" onPress={gotoOrderReceived}/>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    ...AppStyles
})

