import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Badge, HStack} from "native-base";
import ListItemBox from "../../components/shared/ListItemBox";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {useRouter} from "expo-router";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import useApi from "../../hooks/useApi";
import FullScreenLoader from "../../components/shared/FullScreenLoader";

export default (props) => {
    const router = useRouter();
    const {tsQuery} = useApi();
    const queryClient = useQueryClient();

    const fetchUnpickedOrders = async () => {
         return tsQuery(`{
                OrderForPicking {
                  SaleID
                  CONumber
                  Staff
                  Customer
                  Payment
                  Method
                  Date
                  Time
                }
            }`,
             {}
         ).then(res => {
             return res.data.data.OrderForPicking;
         });
    }

    const unpickedOrders = useQuery({
        queryKey:['unpickedorders'],
        queryFn: fetchUnpickedOrders,
        refetchInterval: 1000 * 60 * 2
    });

    const gotoPickingStepTwo= async (co_number) => {
        await queryClient.invalidateQueries({queryKey:["ordered-items", co_number]});
        router.push({pathname:'/orderpicking/step_two', params: {co: co_number}});
    }

    const ItemContent = ({data}) => {
        return (
            <>
                <Box mb="1">
                    <HStack justifyContent="space-between">
                        <Text fontWeight="700" fontSize="12" color="primary.700">CO No. {data.CONumber}</Text>
                        <Badge _text={{fontSize:10, color:'primary.500'}} rounded="10px" bg="#fff" borderColor="primary.500" borderWidth={1}>{`Staff: ${data.Staff}`}</Badge>
                    </HStack>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">Customer: {data.Customer}</Text>
                    <Text fontWeight="400" fontSize="12" color="text.600">Payment: {data.Payment}</Text>
                    <Text fontWeight="400" fontSize="12" color="text.600">Method : <Text fontWeight="400" color="text.600">{data.Method}</Text></Text>
                    <Text fontWeight="400" fontSize="12" color="text.600">DateTime: <Text fontWeight="400" color="text.600">{data.Date} - {data.Time}</Text></Text>
                </Box>
            </>
        );
    }

    if(unpickedOrders.error) {
        return (<>
            <AppBackNavigation path="/orderpicking"/>
            <Box style={styles.topContainer}>
                <Heading size="md" color="tertiary.700">Failed to retrieved data</Heading>
            </Box>
        </>)
    }

    if(unpickedOrders.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking"/>
            <Box style={styles.topContainer}>
                <Heading size="md" color="tertiary.700">Picking</Heading>
                <Text color="text.600" fontSize="12">Order received ({unpickedOrders.data.length})</Text>
            </Box>

            <Box style={styles.mainContainer}>
                <ScrollView>
                    {
                        unpickedOrders.data.length > 0 && unpickedOrders.data.map((item) => {
                            return <ListItemBox key={item.SaleID} content={<ItemContent data={item}/>}
                                                onPress={() => gotoPickingStepTwo(item.CONumber)}/>
                        })
                    }
                </ScrollView>
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
    mainContainer: {
        flex: 1,
        backgroundColor: "#E7E7E9",
    },
})
