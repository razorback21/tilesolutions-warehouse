import {StyleSheet} from "react-native";
import AppStyles from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import {Box, Center, Heading, ScrollView, Text, Modal, Button, Divider, Input, InputGroup, InputLeftAddon} from "native-base";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import ListItemBox from "../../components/shared/ListItemBox";
import React from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import useApi from "../../hooks/useApi";
import {useQuery} from "@tanstack/react-query";
import {fetchPickItemData} from "../../queries/orderpicking_queries";

export default (props) => {
    const selectedItem = React.useRef({});
    const [showModal, setShowModal] = React.useState(false);
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
                    PickLabel
                    Status
                    Qty
                    UoM
                    SubLocation
                    Warehouse
                    PickedBy
                    PickDate
                    SalesItemID
                    StatusColor
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
                    <Text fontWeight="400" fontSize="12" color="text.600">{data.PickLabel} Qty : {data.Qty} {data.UoM}</Text>
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

    const editPallet = (item) => {
        selectedItem.current = item;
        setShowModal(true)
    }

    const ItemModal = () => {
        return <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.Body>
                    <PickedItemsContent data={selectedItem.current} />
                    <Divider my="2" />
                    <InputGroup w={{
                        base: "100%",
                        md: "285"
                    }} justifyContent="center">
                        <InputLeftAddon children={"Pallet #"} />
                        <Input w={{
                            base: "70%",
                            sm: "100%"
                        }} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button onPress={() => {
                            setShowModal(false);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    }

    return (
        <>
            <AppBackNavigation goback={true} title={`CO_${params.co}`}/>
            <ItemModal />
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
                            return <ListItemBox
                                key={item.ID}
                                rightIcon="edit"
                                rightIconSize="md"
                                onPressRightIcon={() => {
                                    editPallet(item)
                                }}
                                statusColor={item.StatusColor}
                                content={<PickedItemsContent data={item}/>}/>
                        })
                    }
                </ScrollView>
            </Box>

        </>
    )
}

const styles = StyleSheet.create({
    ...AppStyles,
    modalDivider: {
        margin: "10px 0px"
    }
})
