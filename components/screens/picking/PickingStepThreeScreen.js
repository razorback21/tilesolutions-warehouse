import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, HStack, Center, Input, Button, VStack} from "native-base";
import AppNavigation from "../../shared/AppNavigation";
import ListItemBox from "../../shared/ListItemBox";
import AppStyles  from "../../../AppStyles";
import WhiteButton from "../../shared/WhiteButton";

export default () => {

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    return (
        <>
            <AppNavigation />
             <Box style={styles.topContainer}>
                    <Text color="tertiary.500" fontSize="12">STEP 3</Text>
                    <Heading size="md" color="tertiary.700" >Enter or Scan Pallet ID</Heading>
                    <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
                        <Text fontSize="12">
                            Item Code : <Text fontWeight="700">MP.001.0150</Text>
                        </Text>
                        <Text fontSize="12">
                            Description : UltraFlex 1 Polymer Modified Grey 50 lbs
                        </Text>
                    </Box>

                    <HStack justifyContent="center" space="5" mt="4">
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">83</Text>
                            <Text color="tertiary.700" fontWeight="700">Ordered</Text>
                        </Box>
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">83</Text>
                            <Text color="tertiary.700" fontWeight="700">Remaining</Text>
                        </Box>
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">PC</Text>
                            <Text color="tertiary.700" fontWeight="700">UoM</Text>
                        </Box>
                    </HStack>

                    <Box mt="4">
                         <Box>
                             <Input placeholder="Enter Pallet ID"/>
                             <Button size="md" mt="2">Submit</Button>
                         </Box>
                         <Center>
                             <Heading size="md" mb="5" color="text.500" my="3">or</Heading>
                         </Center>
                         <VStack>
                             <WhiteButton title="Scan NFC Tag" icon="nfc" mb="2" handler={scanNFCTag}/>
                             <WhiteButton title="Scan QR code" icon="qr-code-scanner"handler={scanQRCode}/>
                         </VStack>
                     </Box>
                </Box>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
