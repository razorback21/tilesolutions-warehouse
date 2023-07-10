import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, Center, Flex, Input, Button, Toast, useDisclose} from "native-base";
import AppStyles  from "../../AppStyles";
import AppBackNavigation from "../../components/shared/AppBackNavigation";
import PickedItemBoxes from "../../components/shared/PickedItemBoxes";
import {useRouter, useLocalSearchParams} from "expo-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import useApi from "../../hooks/useApi";
import {fetchPickItemData} from "../../queries/orderpicking_queries";
import SpinnerModal from "../../components/shared/SpinnerLoader";


export default (props) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {tsQuery, tsMutation} = useApi();
    const [savePickPayload, setSavePickPayload] = React.useState([])
    const { onOpen, isOpen, onClose} = useDisclose(false);

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

    React.useEffect(() => {
        // picking live validation
        const savedPickQty = Number(pickItemDataQuery.data.Ordered - pickItemDataQuery.data.RemainingToBePick);

        let currentPickData = 0;
        savePickPayload.forEach((v, i) => {
            currentPickData += v.QtyInOrderedUoM;
        })

        if((currentPickData + savedPickQty) > pickItemDataQuery.data.Ordered) {
            Toast.closeAll();
            Toast.show({
                description: `Overpicking (${currentPickData + savedPickQty} ${pickItemDataQuery.data.UoM}). Please check your input.`
            });
        }
        console.log('savePickPayload', savePickPayload);
    }, [savePickPayload]);

    const fetchConversionListQuery = async (purchase_received_id) => {
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
        queryFn: () => fetchConversionListQuery(Number(params.prid))
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
        }).then(res => {
            return res.data.data.PickFormConversionList
        });
    }

    const pickFormConversionListQuery = useQuery({
        queryKey: ["pick-form-conversion-list", Number(params.siid), Number(params.prid)],
        queryFn: async () => await fetchPickFormConversionList(Number(params.siid), Number(params.prid))
    })

    const savePickMutationFn = (sales_item_id, pick_data) => {
        return tsMutation(`
            SavePickedItems($SalesItemID: Int!, $PickData: String!) {
                SavePickedItems(SalesItemID: $SalesItemID, PickData: $PickData){
                    Status
                    Message
                }
            }
        `,{
            SalesItemID: sales_item_id,
            PickData: pick_data
        }).then(res => {
            console.log('SavePickedItems result : ',res.data);
            return res.data.data.SavePickedItems;
        });
    }

    const savePickMutation = useMutation({
        mutationFn: async (params) => {
            return await savePickMutationFn(Number(params.SalesItemID), params.PickData);
        }
    })

    const savePick = () => {
        console.log('savePickPayload', savePickPayload);
        if(!savePickPayload.length) {
            Toast.show({
                placement: "top",
                status: "error",
                title: "Pick data is empty."
            })
        } else {
            savePickMutation.mutate({SalesItemID: Number(params.siid), PickData: JSON.stringify(savePickPayload)});
        }
    }

    React.useEffect(() => {
        if(savePickMutation.isLoading) {
            onOpen();
        }

        if(savePickMutation.isError) {
            onClose();
            Toast.show({
                title: "Error saving data.Please try again."
            })
        }

        if(savePickMutation.isSuccess && savePickMutation.data.Status) {
            onClose();
            Toast.show({
                title: "Data saved. Redirecting to order picking step two",
                status: "success",
                placement: "top"
            })

            router.replace({pathname:'/orderpicking/step_two', params: {co: params.co}});
        }

        if(savePickMutation.isSuccess && !savePickMutation.data.Status) {
            onClose();
            Toast.show({
                status: "error",
                description: savePickMutation.data.Message,
                placement: "top"
            })
        }

    }, [savePickMutation.isLoading]); // it does work is loading. investigate why it's not working with isFetched

    const ActualPick = (props) => {
        const pickDataHandler = (text) => {
            const dataKey = `${props.uom}`;

            if(text.length) {
                console.log('CONVERISON LIST FIND : ', conversionListQuery.data);
                const conversion = conversionListQuery.isSuccess && conversionListQuery.data?.find(({Symbol}) => Symbol == props.uom);
                const data = {
                    SubLocation: props.subLocation,
                    Pallet: props.pallet,
                    Qty: text,
                    UoM: props.uom,
                    QtyInOrderedUoM: (conversion?.Qty * parseInt(text))
                }

                setSavePickPayload((prevState) => {
                    const copy = [];
                    prevState.forEach((val) => {
                        if(val.UoM != dataKey) {
                            copy.push(val)
                        }
                    })
                    return [...copy, data];
                })
            } else {
                setSavePickPayload((prevState) => {
                    const copy = [];
                    prevState.forEach((val, i) => {
                        if(val.UoM != dataKey) {
                            copy.push(val)
                        }
                    })
                    return [...copy];
                })
            }
        }

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

                <Input size="xl" placeholder="Actual Pick" style={{textAlign:"center"}} onChangeText={pickDataHandler} type="number"/>
            </Box>
        )
    }

    const ActualPickMemoized = React.useCallback((props) => {
        return ActualPick(props);
    },[]);


    return (
        <>
            <AppBackNavigation goback={true} title={`CO_${params.co}`}/>
            <SpinnerModal text="Saving Data..." size="lg" isOpen={isOpen}/>
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
                        <Text fontWeight="700" fontSize="12" color="text.700">Maximum pick for this location <Text color="tertiary.700">{params.maxAllowedPick} {pickItemDataQuery.data.UoM}</Text></Text>
                    </Box>

                    {
                        pickFormConversionListQuery.isSuccess && pickFormConversionListQuery.data.map(res => {
                            return <ActualPickMemoized
                                key={res.UoM}
                                uom={res.UoM}
                                ordered={res.Ordered}
                                palletPick={res.PalletPick}
                                subLocation={params.subLocation}
                                pallet={params.pallet}
                            />
                        })
                    }
                    <Button mt="3" disabled={pickFormConversionListQuery.isLoading || pickFormConversionListQuery.isError || savePickMutation.isLoading} onPress={savePick}>Save Pick</Button>
                </Box>
            </ScrollView>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
