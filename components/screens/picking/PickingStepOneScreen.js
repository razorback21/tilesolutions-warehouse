import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView } from "native-base";
import AppNavigation from "../../shared/AppNavigation";
import ListItemBox from "../../shared/ListItemBox";
import AppStyles from "../../../AppStyles";
import AppBackNavigation from "../../shared/AppBackNavigation";


export default (props) => {

    const ItemContent = () => {
        return (
            <>
                <Box mb="1">
                    <Text fontWeight="700" fontSize="12" color="primary.600">AA.911.2424   <Box h="2.5" width="2.5" bg="success.500" rounded="full" mt="0.2"></Box></Text>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Order Qty : 83 PC</Text>
                </Box>
            </>
        );
    }

    return (
        <>
            <AppBackNavigation navigation={props.navigation} />
            <Box style={styles.topContainerNoFlex}>
                <Text color="tertiary.500" fontSize="12">STEP 1</Text>
                <Heading size="md" color="tertiary.700">Picking order for pickup</Heading>

                <Text my="2" fontSize="12" color="text.600">
                    Written by: Philiipine{"\n"}
                    Sold to: JS Renovations{"\n"}
                    For C.O: <Text fontWeight="700">000183381</Text>
                </Text>
            </Box>
            <Box style={styles.contentContainer}>
                <Box style={styles.innerBox} bg={"tertiary.200"}>
                    <ScrollView>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                    </ScrollView>
                </Box>
            </Box>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
