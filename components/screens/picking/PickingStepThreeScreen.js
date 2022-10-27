import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, HStack, Center, Input, Button, VStack} from "native-base";
import AppNavigation from "../../shared/AppNavigation";
import ListItemBox from "../../shared/ListItemBox";
import AppStyles  from "../../../AppStyles";
import WhiteButton from "../../shared/WhiteButton";
import AppBackNavigation from "../../shared/AppBackNavigation";
import TileInfoBox from "../../shared/TileInfoBox";

export default (props) => {

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    return (
        <>
            <AppBackNavigation navigation={props.navigation} />
             <Box style={styles.topContainer}>
                    <Text color="tertiary.500" fontSize="12">STEP 3</Text>
                    <Heading size="md" color="tertiary.700" >Enter or Scan Pallet ID</Heading>
                    <Box p="4" mt="5" bg="text.50" rounded="4" shadow="5">
                        <Text fontSize="12">
                            Item Code : <Text fontWeight="700">MP.001.0150</Text>
                        </Text>
                        <Text fontSize="12">
                            Description : UltraFlex 1 Polymer Modified Grey 50 lbs
                        </Text>
                    </Box>

                    <HStack justifyContent="center" space="5" mt="4">
                        <TileInfoBox title="83" subTitle="Ordered"/>
                        <TileInfoBox title="83" subTitle="Remaining"/>
                        <TileInfoBox title="PC" subTitle="UoM"/>
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
