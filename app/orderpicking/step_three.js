import React from "react";
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, ScrollView, HStack, Center, Fab, Icon, useDisclose, Actionsheet } from "native-base";
import ListItemBox from "../../components/shared/ListItemBox";
import AppStyles  from "../../AppStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import TileInfoBox from "../../components/shared/TileInfoBox";
import {useRouter, useLocalSearchParams} from "expo-router";
import useApi from "../../hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import FullScreenLoader from "../../components/shared/FullScreenLoader";

export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();

    const ItemContent = ({data}) => {
        return (
            <>
                <Box mb="1">
                    <HStack space="5">
                        <Text fontWeight="700" fontSize="12" color="primary.600">{data.SubLocation}</Text>
                    </HStack>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">PalletID: {data.FormattedPalletID}</Text>
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

    const fetchSalesItemWarehousePalletInfo = async (sales_item_id) => {
        return await tsQuery(`
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
                }
            }
        `,

            {
                "SalesItemID": sales_item_id
            }).then(res => {
            console.log(res.data);
            return res.data.data.SalesItemWarehousePalletInfo
        })
    }

    const itemPalletsInfoQuery = useQuery({
        queryKey: ["item-pallets-info", params.siid],
        queryFn: async () => fetchSalesItemWarehousePalletInfo(Number(params.siid))
    })

    if(pickItemDataQuery.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking/step_two" params={{co:params.co}}/>
            <ActionSheet />
            <ScrollView>
                <Box style={styles.topContainerNoFlex}>
                    <Text color="text.500" fontSize="12">STEP 3</Text>
                    <Heading size="md" color="tertiary.700" >Pick from Pallet</Heading>
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

                    <Center mt="4">
                        <Text fontWeight="700" color="text.700" fontSize="12">Available at below Sub-locations</Text>
                    </Center>
                </Box>
                <Box style={styles.contentContainer}>
                    <Box style={styles.innerBox} bg={"tertiary.200"} >
                        {
                            itemPalletsInfoQuery.isSuccess && itemPalletsInfoQuery.data.map((item) => {
                               return <ListItemBox key={item.PalletID} content={<ItemContent data={item}/>}/>
                            })
                        }
                    </Box>
                </Box>
            </ScrollView>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
