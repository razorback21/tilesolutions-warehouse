import React from "react";
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, ScrollView, HStack, Center, Fab, Icon, useDisclose, Actionsheet } from "native-base";
import ListItemBox from "../../components/shared/ListItemBox";
import AppStyles  from "../../AppStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {useRouter, useLocalSearchParams} from "expo-router";
import useApi from "../../hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import FullScreenLoader from "../../components/shared/FullScreenLoader";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import {fetchPickItemData} from "../../queries/orderpicking_queries";

export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const gotoActualPicking = (item) => {
        router.push({pathname: "/orderpicking/step_three_actual_picking", params: {
            siid: item.SaleItemID,
            subLocation: item.SubLocation,
            prid: item.PurchaseReceivedID,
            pallet: item.FormattedPalletID,
            co: params.co,
        }})
    }

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    const ItemContent = ({data}) => {
        return (
            <>
                <Box mb="1">
                    <HStack space="5">
                        <Text fontWeight="700" fontSize="14" color="primary.600">{data.SubLocation} <Text fontWeight="700" fontSize="14" color="text.600"> - {data.FormattedPalletID}</Text></Text>
                    </HStack>
                </Box>
                <Box mb="1">

                    <Text fontWeight="400" fontSize="12" color="text.600">Shade: {data.Shade}</Text>
                </Box>
                <Box>
                    <HStack space="7">
                        <Text fontWeight="400" fontSize="12" color="text.600">Quantity : {data.Qty}</Text>
                        <Text fontWeight="400" fontSize="12" color="text.600">Available: {data.Available}</Text>
                    </HStack>
                </Box>
            </>
        );
    }

    function ActionSheet() {
        const { isOpen, onOpen, onClose } = useDisclose();

        return (
            <Center>
                <Fab
                    onPress={onOpen}
                    placement="bottom-right"
                    colorScheme="blue"
                    size="sm"
                    icon={<Icon name="md-ellipsis-vertical" as={Ionicons} />}
                />
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="qr-code-scanner" />} _pressed={{
                            bg: "text.100"
                        }}>
                            Scan QR code
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="nfc" size="6" />} _pressed={{
                            bg: "text.100"
                        }}>
                            Scan NFC tag
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        );

    }

    const fetchSalesItemWarehousePalletInfo = (sales_item_id) => {
        return tsQuery(`
            SalesItemWarehousePalletInfo($SalesItemID: Int!) {
                SalesItemWarehousePalletInfo(SalesItemID: $SalesItemID) {
                    SubLocation
                    PalletID
                    FormattedPalletID
                    Shade
                    Qty
                    Available
                    Reserved
                    SaleItemID
                    PurchaseReceivedID
                }
            }
        `,
{
           "SalesItemID": sales_item_id
        }).then(res => {
            return res.data.data.SalesItemWarehousePalletInfo
        })
    }

    const itemPalletsInfoQuery = useQuery({
        queryKey: ["item-pallets-info", params.siid],
        queryFn: async () => await fetchSalesItemWarehousePalletInfo(Number(params.siid))
    })

    if(itemPalletsInfoQuery.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking/step_two" params={{co:params.co}} title={`CO_${params.co}`}/>
            <ActionSheet />
            <Box style={styles.topContainerNoFlex}>
                <Text color="text.500" fontSize="12">STEP 3</Text>
                <Heading size="md" color="tertiary.700" >Pick from Pallet</Heading>
                {pickItemDataQuery.isSuccess && <PickedItemBoxes data={pickItemDataQuery.data}/>}
                <Center mt="4">
                    {
                        itemPalletsInfoQuery.isSuccess && (
                            itemPalletsInfoQuery.data.length ? (
                                <Text fontWeight="700" color="text.700" fontSize="12">Available at below Sub-locations</Text>
                            ) : (
                                 <Text fontWeight="700" color="text.50" fontSize="14" textAlign="center" padding="10px" bg="blueGray.600" width="100%" rounded="5">No available stocks</Text>
                            )
                        )

                    }

                </Center>
            </Box>

            <Box style={styles.mainContainer}>
                <ScrollView>
                {
                    itemPalletsInfoQuery.isSuccess && itemPalletsInfoQuery.data.map((item) => {
                       return <ListItemBox h="95" key={item.PalletID} onPress={() => gotoActualPicking(item)} content={<ItemContent data={item}/>}/>
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
