import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView } from "native-base";
import ListItemBox from "../../components/shared/ListItemBox";
import AppStyles from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {useQuery} from "@tanstack/react-query";
import {useLocalSearchParams} from "expo-router";
import useApi from "../../hooks/useApi";
import FullScreenLoader from "../../components/shared/FullScreenLoader";
import {useRouter} from "expo-router";

export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const orderItems = async (co_number)=> {
        return await tsQuery(
            `
                PickingOrderedItems($CONumber: String!) {
                    PickingOrderedItems(CONumber: $CONumber) {
                        Status
                        WrittenBy
                        Customer
                        CONumber
                        OrderItems {
                            Code
                            Description
                            Shade
                            Qty
                            SalesItemID
                        }
                    }
                }
            `,
            {
                CONumber: co_number
            }
        ).then(res => {
            return res.data.data.PickingOrderedItems
        })
    }

    const gotoStepThree = (sales_item_id, co_number) => {
        router.push({pathname: "/orderpicking/step_three", params: {siid: sales_item_id, co: co_number}})
    }

    const ItemContent = ({data}) => {
        return (
            <>
                <Box mb="1">
                    <Text fontWeight="700" fontSize="12" color="primary.600">{data.Code}   <Box h="2.5" width="2.5" bg="success.500" rounded="full" mt="0.2"></Box></Text>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">{data.Description}</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Order Qty : {data.Qty}</Text>
                </Box>
            </>
        );
    }

    const orderItemsQuery = useQuery({
        queryKey: ["ordered-items", params.co],
        queryFn: () => orderItems(params.co)
    })

    if(orderItemsQuery.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking/order_received" />
            <Box style={styles.topContainerNoFlex}>
                <Text color="tertiary.500" fontSize="12">STEP 2</Text>
                <Heading size="md" color="tertiary.700">Picking order for pickup</Heading>

                <Text mt="1" fontSize="12" color="text.600" space="10">
                    For C.O: <Text fontWeight="700">{orderItemsQuery.data.CONumber}</Text> - Written by: {orderItemsQuery.data.WrittenBy}{"\n"}
                    Sold to: {orderItemsQuery.data.Customer}
                </Text>
            </Box>

            <Box style={styles.mainContainer} >
                <ScrollView>
                    {
                        orderItemsQuery.isSuccess && orderItemsQuery.data.OrderItems.map((item) => {
                           return  <ListItemBox key={item.Code} onPress={() => gotoStepThree(item.SalesItemID, params.co)} content={<ItemContent data={item}/>}/>
                        })
                    }
                </ScrollView>
            </Box>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
