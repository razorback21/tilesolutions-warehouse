import {StyleSheet} from "react-native";
import AppStyles from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {Box, Center, Heading, ScrollView, Text} from "native-base";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import ListItemBox from "../../components/shared/ListItemBox";
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import useApi from "../../hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import {fetchPickItemData} from "../../queries/orderpicking_queries";

export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    const fetchPickedItems = (sales_item_id) => {
        return tsQuery(`
            PickedItems($SalesItemID: Int!) {
                PickedItems(SalesItemID: $SalesItemID) {
                    ID
                    Status
                    Qty
                    UoM
                    SubLocation
                    Warehouse
                    PickedBy
                    PickDate
                    SalesItemID
                }
            }
        `, {
            SalesItemID: sales_item_id
        }).then(res => {
            return res.data.data.PickedItems
        });
    }

    const pickedItemsQuery = useQuery({
        queryKey: ["picked-items", params.siid],
        queryFn: async () => await fetchPickedItems(Number(params.siid))
    })

    const PickedItemsContent = ({data}) => {
        return (
            <>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Picked Qty : {data.Qty} {data.UoM}</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Location : {data.Warehouse}, {data.SubLocation} </Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Picked By : {data.PickedBy}</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Pick date : {data.PickDate}</Text>
                </Box>
            </>
        );
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking/step_two" params={{co:params.co}} title={`CO_${params.co}`}/>
            <Box style={styles.topContainerNoFlex}>
                <Heading size="md" color="tertiary.700" >Picked Items</Heading>
                {pickItemDataQuery.isSuccess && <PickedItemBoxes data={pickItemDataQuery.data}/>}
                {
                    pickItemDataQuery.isSuccess && !pickItemDataQuery.data.RemainingToBePick && (
                        <Center mt="4">
                            <Text fontWeight="700" color="text.700" fontSize="12">Picking for this sales item has been completed.</Text>
                        </Center>
                    )
                }

            </Box>

            <Box style={styles.mainContainer}>
                <ScrollView>
                    {
                        pickedItemsQuery.isSuccess && pickedItemsQuery.data.map((item, i) => {
                            return <ListItemBox key={item.ID} showRightIcon={false} content={<PickedItemsContent data={item}/>}/>
                        })
                    }
                </ScrollView>
            </Box>

        </>
    )
}

const styles = StyleSheet.create({
    ...AppStyles
})
