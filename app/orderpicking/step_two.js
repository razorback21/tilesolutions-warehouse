import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Center, Actionsheet, useDisclose } from "native-base";
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
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [selectedItem, setSelectedItem] = React.useState({});

    const gotoStepThree = (sales_item_id, co_number) => {
        router.push({pathname: "/orderpicking/step_three", params: {siid: sales_item_id, co: co_number}})
    }

    const fetchOrderItems = (co_number)=> {
        return tsQuery(
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
                            HasReleasedItems
                            HasPickedItems
                            Status
                            StatusColor
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

    const orderItemsQuery = useQuery({
        queryKey: ["ordered-items", params.co],
        queryFn: async () => await fetchOrderItems(params.co)
    })

    if(orderItemsQuery.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    const OrderItemContent = ({data}) => {
        return (
            <Box>
                <Box mb="1">
                    <Text fontWeight="700" fontSize="14" color="primary.600">{data.Code}</Text>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">{data.Description}</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Order Qty : {data.Qty}</Text>
                </Box>
            </Box>
        );
    }



    const ActionSheet = (props) => {
        return <Center>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item onPress={() => router.push({pathname:'/orderpicking/picked_items', params: {siid:selectedItem.SalesItemID, co:params.co}})} disabled={!selectedItem.HasPickedItems}>Picked Information</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => router.push({pathname:'/orderpicking/released_items', params: {siid:selectedItem.SalesItemID,co:params.co}})} disabled={!selectedItem.HasReleasedItems}>Released Information</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </Center>;
    }

    return (
        <>
            <AppBackNavigation goback={true} title={`CO_${params.co}`}/>
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
                        orderItemsQuery.isSuccess && orderItemsQuery.data.OrderItems.map((item, i) => {
                            return item.HasReleasedItems || item.HasPickedItems
                                ? <ListItemBox key={i}
                                               onPress={() => {
                                                   gotoStepThree(item.SalesItemID, params.co)}
                                               }
                                               content={<OrderItemContent data={item}/>}
                                               rightIcon="more-vert"
                                               rightIconSize="md"
                                               onPressRightIcon={() => {
                                                       setSelectedItem(item)
                                                       onOpen();
                                                   }
                                               }
                                               statusColor={item.StatusColor}
                                />
                                : <ListItemBox key={i} onPress={() => gotoStepThree(item.SalesItemID, params.co)} content={<OrderItemContent data={item}/>}/>
                        })
                    }
                </ScrollView>
            </Box>
            <ActionSheet />
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
