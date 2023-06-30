import TileInfoBox from "./TileInfoBox";
import {Box, HStack, Text} from "native-base";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {useLocalSearchParams} from "expo-router";
import useApi from "../../hooks/useApi";

export default (props) => {
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const fetchPickItemData = async (sales_item_id) => {
        return await tsQuery(`
            PickItemData($SalesItemID: Int!) {
              PickItemData(SalesItemID: $SalesItemID) {
                  Ordered
                  ProductID
                  ProductCode
                  ProductDescription
                  RemainingToBePick
                  UoM
              }
            }
        `,

            {
                "SalesItemID": sales_item_id
            }).then(res => {
            return res.data.data.PickItemData
        })
    }

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => fetchPickItemData(Number(params.siid))
    })

    if(!pickItemDataQuery.isSuccess) {
        return null;
    }

    return  (
        <>
            <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
                <Text fontSize="12">
                    Item Code : <Text fontWeight="700">{pickItemDataQuery.data.ProductCode}</Text>
                </Text>
                <Text fontSize="12">
                    Description : {pickItemDataQuery.data.ProductDescription}
                </Text>
            </Box>
            <HStack justifyContent="center" space="5" mt="4">
                <TileInfoBox title={`${pickItemDataQuery.data.Ordered}`} subTitle="Ordered"/>
                <TileInfoBox title={`${pickItemDataQuery.data.RemainingToBePick}`} subTitle="Remaining"/>
                <TileInfoBox title={`${pickItemDataQuery.data.UoM}`} subTitle="UoM"/>
            </HStack>
        </>
    )
}
