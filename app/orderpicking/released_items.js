import AppBackNavigation from "../../components/shared/AppBackNavigation";
import React from "react";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import {StyleSheet} from "react-native";
import AppStyles from "../../AppStyles";
import {Box, ScrollView, Heading, Text} from "native-base";
import {useQuery} from "@tanstack/react-query";
import {fetchPickItemData} from "../../queries/orderpicking_queries";
import ItemInfoBox from "../../components/shared/ItemInfoBox";
import {useLocalSearchParams} from "expo-router";
import useApi from "../../hooks/useApi";
import ListItemBox from "../../components/shared/ListItemBox";

export default (props) => {
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    const fetchReleasedItems =  (sales_item_id) => {
        return tsQuery(`
            ReleasedItems($SalesItemID: Int!) {
                ReleasedItems(SalesItemID: $SalesItemID) {
                    ID
                    Qty
                    UoM
                    ReleasedBy
                    ReleaseDate
                }
            }
        `, {
            SalesItemID: sales_item_id
        }).then(res => {
            return res.data.data.ReleasedItems
        })
    }

    const releasedItems = useQuery({
        queryKey: ["released-items", params.siid],
        queryFn: async () => await fetchReleasedItems(Number(params.siid))
    })

    const ReleasedItemsContent = ({data}) => {
        return (
            <>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">Release Qty : {data.Qty} {data.UoM}</Text>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">Released By : {data.ReleasedBy}</Text>
                </Box>
                <Box>
                    <Text fontWeight="400" fontSize="12" color="text.600">Release Date : {data.ReleaseDate}</Text>
                </Box>
            </>
        );
    }

    return (<>
            <AppBackNavigation path="/orderpicking/step_two" params={{co:params.co}} title={`CO_${params.co}`}/>
            <Box  style={{...styles.topContainerNoFlex, paddingBottom:0}}>
                <Heading size="md" color="tertiary.700" >Release Information</Heading>
                {pickItemDataQuery.isSuccess && <ItemInfoBox data={pickItemDataQuery.data}/>}
                {
                    releasedItems.isSuccess && !releasedItems.data.length
                        ? <Text fontSize="13" fontWeight="700" my="4" color="text.700">No release records found.</Text>
                        : <Text fontSize="13" fontWeight="700" my="4" color="text.700">RELEASED</Text>
                }
            </Box>
            <Box style={styles.mainContainer} >
                <ScrollView>
                    {
                        releasedItems.isSuccess && releasedItems.data.map((item, i) => {
                            return <ListItemBox  key={i} showRightIcon={false} content={<ReleasedItemsContent data={item}/>}/>
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

