import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Badge, HStack} from "native-base";
import ListItemBox from "../../components/shared/ListItemBox";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {useRouter} from "expo-router";


export default (props) => {

    const router = useRouter();

    const ItemContent = () => {
        return (
            <>
                <Box mb="1">
                    <HStack space="5">
                        <Text fontWeight="700" fontSize="12" color="primary.700">C.O. No. 000182857</Text>
                        <Badge _text={{fontSize:10}}>Staff: John Doe</Badge>
                    </HStack>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">Customer: BEEN CONTRACTING</Text>
                    <Text fontWeight="400" fontSize="12" color="text.600">Payment: BALANCE</Text>
                </Box>
                <Box mb="1">
                    <HStack space="4">
                        <Text fontWeight="400" fontSize="12" color="text.600">Method : <Text fontWeight="400" color="text.600">pickup</Text></Text>
                    </HStack>
                </Box>
                <Box >
                    <Text fontWeight="400" fontSize="12" color="text.600">DateTime: <Text fontWeight="400" color="text.600">Oct 6, 2022 - 11am to 12pm</Text></Text>
                </Box>
            </>
        );
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking"/>
            <Box style={styles.topContainer}>
                <Heading size="md" color="tertiary.700">Picking</Heading>

                <Text color="text.600" fontSize="12">Order received (16)</Text>
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
        paddingTop: 20,
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
