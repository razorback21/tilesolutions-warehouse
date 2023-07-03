import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, HStack, Center, Flex, Input, Button} from "native-base";
import AppStyles  from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import {useRouter, useLocalSearchParams} from "expo-router";


export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();

    const ActualPick = (props) => {
        return (
            <Box px="2" pt="2" pb="3" bg="text.50" mb="2" rounded="4" shadow="2">
                <Center>
                    <Heading size="md" color="tertiary.700">{props.uom}</Heading>
                </Center>
                <Flex direction="row" justifyContent="space-between">
                    <Flex pb="2" width="30%" direction="column" justifyContent="center" alignItems="center">
                        <Text fontWeight="700" color="tertiary.500">ORDERED</Text>
                        <Text fontWeight="700" color="tertiary.500" fontSize="24">{props.ordered}</Text>
                    </Flex>
                    <Flex  pb="2" width="35%" direction="column" justifyContent="center" alignItems="center">
                        <Text fontWeight="700" color="tertiary.500">PALLET PICK</Text>
                        <Text fontWeight="700" color="tertiary.500" fontSize="24">{props.palletPick}</Text>
                    </Flex>
                </Flex>

                <Input size="sm" placeholder="Actual Pick" style={{textAlign:"center"}}/>
            </Box>
        )
    }

    return (
        <>
            <AppBackNavigation goback={true} title={`CO_${params.co}`}/>
            <ScrollView>
                <Box style={styles.topContainer}>
                    <Text color="tertiary.500" fontSize="12">STEP 3</Text>
                    <Heading size="md" color="tertiary.700" >Actual Picking</Heading>
                    <Text color="tertiary.500" fontSize="12">Sub-location {params.subLocation} - {params.pallet}</Text>

                    <PickedItemBoxes />

                    <Text fontSize="11" fontWeight="700" my="4" color="text.700">CONVERTION TABLE</Text>

                    <Box rounded="4" py="2" alignItems="center" justifyContent="center"  bg="text.50" color="text.500" shadow="4" mb="3">
                        <Text fontWeight="400" fontSize="12">1- PC/PC</Text>
                        <Text fontWeight="400" fontSize="12">4- PC/BX</Text>
                        <Text fontWeight="400" fontSize="12">144- PC/SKD</Text>
                    </Box>

                    <Box justifyContent="center" alignItems="center" mb="3">
                        <Text fontWeight="700" fontSize="12" color="text.700">Maximum pick for this location <Text color="tertiary.700">83 PC</Text></Text>
                    </Box>

                    <ActualPick uom="SKD" ordered="0" palletPick="0"/>
                    <ActualPick uom="BX" ordered="20" palletPick="20"/>
                    <ActualPick uom="PC" ordered="3" palletPick="3"/>

                    <Button mt="3">Save Pick</Button>
                </Box>
            </ScrollView>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
