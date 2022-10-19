import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Badge, HStack} from "native-base";
import AppNavigation from "../shared/AppNavigation";
import ListItemBox from "../shared/ListItemBox";


export default () => {

    const ItemContent = () => {
        return (
            <>
                <Box mb="1">
                    <HStack space="5">
                        <Text fontWeight="700" fontSize="12">C.O. No. 000182857</Text>
                        <Badge _text={{fontSize:10}}>Staff: John Doe</Badge>
                    </HStack>
                </Box>
                <Box mb="1">
                    <Text fontWeight="300" fontSize="12">Customer: BEEN CONTRACTING</Text>
                    <Text fontWeight="300" fontSize="12">Payment: BALANCE</Text>
                </Box>
                <Box>
                    <HStack space="7">
                        <Text fontWeight="300" fontSize="12">Method : <Text fontWeight="700">pickup</Text></Text>
                        <Text fontWeight="300" fontSize="12">Date: <Text fontWeight="700">Oct 6, 2022</Text></Text>
                    </HStack>
                </Box>
            </>
        );
    }

    return (
        <>
            <AppNavigation />
            <Box style={styles.topContainer}>
                <Heading size="md" color="tertiary.700">Picking</Heading>

                <Text color="tertiary.500" fontSize="12">Order received (16)</Text>
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
    topContainer: {
        backgroundColor: "#E7E7E9",
        paddingTop: 35,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    contentContainer: {
        backgroundColor: "#FFFFFF",
        flex:1,
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom:10
    },
    innerBox: {
        flex:1,
        padding:8
    }
})
