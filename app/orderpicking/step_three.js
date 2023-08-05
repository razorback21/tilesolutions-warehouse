import React from "react";
import { StyleSheet, Text as RNText, View} from 'react-native';
import {
    Box,
    Text,
    Heading,
    ScrollView,
    HStack,
    Center,
    Fab,
    Icon,
    useDisclose,
    Actionsheet,
    useToast,
    Modal,
    Button
} from "native-base";
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
import {fetchPickItemData, fetchSalesItemWarehousePalletInfo} from "../../queries/orderpicking_queries";
import useNFC from "../../hooks/useNFC";

export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery} = useApi();
    const toast = useToast();
    const NFC = useNFC();
    const nfcModalRef = React.useRef(null);
    const [isOpenNfcModal, setIsOpenNfcModal] =  React.useState(false)


    const gotoActualPicking = (item) => {
        console.log("REAMING TO BE PICK : ", pickItemDataQuery.data.RemainingToBePick)
        if(!pickItemDataQuery.data.RemainingToBePick) {
            toast.show({
                title: "Picking is already completed.",
                placement: "top",
                status: "info"
            })
        } else {
            router.push({pathname: "/orderpicking/step_three_actual_picking", params: {
                    siid: item.SaleItemID,
                    subLocation: item.SubLocation,
                    prid: item.PurchaseReceivedID,
                    pallet: item.FormattedPalletID,
                    co: params.co,
                    maxAllowedPick: item.MaxAllowedPick,
                }})
        }
    }

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    const nfcScan = async () => {
        await NFC.initialize();

        if(!NFC.scanning) {
            const scan = await NFC.scanTag();

            scan.then(() => {
                if(!NFC.isDeviceSupported) {
                    alert('Your device does not support NFC');
                    return false
                }

                if(NFC.scanning) {
                    setIsOpenNfcModal(true);
                } else {
                    setIsOpenNfcModal(false);
                }
            })
        }

    }

    const nfcStopScan = () => {
        NFC.stopScan();
        setIsOpenNfcModal(false);
    }


    const NfcModal = () => {
        return  <Center>
            <Modal isOpen={isOpenNfcModal} >
                <Modal.Content maxWidth="400px">
                    <Modal.Body bg="#fff" rounded={10}>
                        <Center>
                            <Icon as={MaterialIcons} name="nfc" size="10" color="green.400"/>
                            <Text fontWeight={600} fontSize={14}>Place your device near NFC tag</Text>
                            <Button style={{width:"100%",marginTop:10}} onPress={nfcStopScan}>Cancel</Button>
                        </Center>
                    </Modal.Body>
                </Modal.Content>

            </Modal>
        </Center>
    };


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
                        <Text fontWeight="400" fontSize="12" color="text.600">Max. Pick: {data.MaxAllowedPick} {pickItemDataQuery.data.UoM}</Text>
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
                        <Actionsheet.Item disabled={!pickItemDataQuery.data.RemainingToBePick} startIcon={<Icon as={MaterialIcons} size="6" name="qr-code-scanner" />}
                                          onPress={() => router.push({pathname: '/orderpicking/scanner_palletno', params: {co:params.co, siid:params.siid}})}
                                          _pressed={{
                            bg: "text.100"
                        }}>
                            Scan QR code
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="nfc" size="6" />}
                                          onPress={nfcScan}
                                          _pressed={{
                            bg: "text.100"
                        }}>
                            Scan NFC tag
                        </Actionsheet.Item>
                        <Actionsheet.Item  startIcon={<Icon as={MaterialIcons} name="info" size="6" />} _pressed={{
                            bg: "text.100"
                        }} disabled={!pickItemDataQuery.data.HasPickedItems}
                           onPress={() => router.push({pathname:'/orderpicking/picked_items', params: {siid: params.siid, co: params.co}}) }
                        >
                            Picked Items
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        );

    }

    const itemPalletsInfoQuery = useQuery({
        queryKey: ["item-pallets-info", params.siid],
        queryFn: async () => await fetchSalesItemWarehousePalletInfo(Number(params.siid))
    })

    if(itemPalletsInfoQuery.status === 'loading') {
        return <FullScreenLoader size="lg"/>
    }

    // Redirect to pick items if picking is already done
    if(itemPalletsInfoQuery.isSuccess && !pickItemDataQuery.data.RemainingToBePick) {
         router.replace({pathname:'/orderpicking/picked_items', params:{co:params.co, siid:params.siid}})
    }

    return (
        <>
            <AppBackNavigation path="/orderpicking/step_two" params={{co:params.co}} title={`CO_${params.co}`}/>
            <ActionSheet />

            <Box style={styles.topContainerNoFlex}>
                <Text color="text.500" fontSize="12">STEP 3</Text>
                <Heading size="md" color="tertiary.700" >Select Pallet</Heading>
                {pickItemDataQuery.isSuccess && <PickedItemBoxes data={pickItemDataQuery.data}/>}
                <Center mt="4">
                    {
                        (pickItemDataQuery.data.RemainingToBePick && itemPalletsInfoQuery.isSuccess) ? (
                            itemPalletsInfoQuery.data.length ? (
                                <Text fontWeight="700" color="text.700" fontSize="12">Available at below Sub-locations</Text>
                            ) : (
                                 <Text fontWeight="700" color="text.50" fontSize="14" textAlign="center" padding="10px" bg="blueGray.600" width="100%" rounded="5">No available stocks</Text>
                            )
                        ) : null
                    }

                    {
                        !pickItemDataQuery.data.RemainingToBePick && <Text fontWeight="700" color="text.700" fontSize="12">Picking for this sales item has been completed.</Text>
                    }
                </Center>
            </Box>


            <View style={styles.mainContainer}>
                <NfcModal/>
                <ScrollView>
                {
                    (pickItemDataQuery.data.RemainingToBePick && itemPalletsInfoQuery.isSuccess)
                    ? itemPalletsInfoQuery.data.map((item) => {
                        return <ListItemBox h="95" key={item.PalletID} onPress={() => gotoActualPicking(item)} content={<ItemContent data={item}/>}/>
                    }) : null
               }
                </ScrollView>
            </View>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
