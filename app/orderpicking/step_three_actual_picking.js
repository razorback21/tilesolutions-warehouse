import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Center, Flex, Input, Button} from "native-base";
import AppStyles  from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import {useRouter, useLocalSearchParams} from "expo-router";
import {useQuery} from "@tanstack/react-query";
import useApi from "../../hooks/useApi";
import {fetchPickItemData} from "../../queries/orderpicking_queries";


export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    const fetchConversionListQuery = (purchase_received_id) => {
        console.log('PRID', purchase_received_id)
        return tsQuery(`
            PurchaseReceivedConversionList($PurchaseReceivedID: Int!) {
                PurchaseReceivedConversionList(PurchaseReceivedID: $PurchaseReceivedID) {
                    Symbol
                    Qty
                }
            }
        `, {
            PurchaseReceivedID: purchase_received_id
        }).then(res => {
            return res.data.data.PurchaseReceivedConversionList;
        })
    }

    const conversionListQuery = useQuery({
        queryKey: ["conversion-list", params.prid],
        queryFn: async () => await fetchConversionListQuery(Number(params.prid))
    })

    const fetchPickFormConversionList = (sale_item_id, purchase_received_id) => {
        return tsQuery(`
            PickFormConversionList($SalesItemID: Int!, $PurchaseReceivedID: Int!) {
                PickFormConversionList(SalesItemID: $SalesItemID, PurchaseReceivedID: $PurchaseReceivedID) {
                    UoM
                    Ordered
                    PalletPick
                }
            }
        `, {
            SalesItemID: sale_item_id,
            PurchaseReceivedID: purchase_received_id
        }).then(res => res.data.data.PickFormConversionList);
    }

    const pickFormConversionListQuery = useQuery({
        queryKey: ["pick-form-conversion-list", Number(params.siid), Number(params.prid)],
        queryFn: async () => await fetchPickFormConversionList(Number(params.siid), Number(params.prid))
    })

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

                <Input size="xl" placeholder="Actual Pick" style={{textAlign:"center"}} />
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
                    <Text color="tertiary.500" fontSize="12">Location {params.subLocation} - {params.pallet}</Text>

                    <PickedItemBoxes data={pickItemDataQuery.data}/>

                    <Text fontSize="11" fontWeight="700" my="4" color="text.700">CONVERSION TABLE</Text>

                    <Box rounded="4" py="2" alignItems="center" justifyContent="center"  bg="text.50" color="text.500" shadow="4" mb="3">
                        {
                            conversionListQuery.isSuccess && conversionListQuery.data.map(res => {
                                return <Text fontWeight="400" fontSize="12" key={res.Symbol}>{res.Qty}- {pickItemDataQuery.data.UoM}/{res.Symbol}</Text>
                            })
                        }
                     </Box>

                    <Box justifyContent="center" alignItems="center" mb="3">
                        <Text fontWeight="700" fontSize="12" color="text.700">Maximum pick for this location <Text color="tertiary.700">{params.availablePickableItems} {pickItemDataQuery.data.UoM}</Text></Text>
                    </Box>

                    {
                        pickFormConversionListQuery.isSuccess && pickFormConversionListQuery.data.map(res => {
                            return <ActualPick key={res.UoM} uom={res.UoM} ordered={res.Ordered} palletPick={res.PalletPick}/>
                        })
                    }
                    <Button mt="3" disabled={pickFormConversionListQuery.isLoading || pickFormConversionListQuery.isError}>Save Pick</Button>
                </Box>
            </ScrollView>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
