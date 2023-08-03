import React from 'react';
import AppBarCodeScanner from "../../components/shared/AppBarCodeScanner";
import ModalMessage from "../../components/shared/ModalMessage";
import {useDisclose} from "native-base";
import useApi from "../../hooks/useApi";
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useQuery} from "@tanstack/react-query";
import {fetchPickItemData} from "../../queries/orderpicking_queries";

export default (props) => {
    const [modalTitle, setModalTitle ] = React.useState('Message');
    const [modalMessage, setModalMessage ] = React.useState('');

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const {tsQuery} = useApi();
    const router = useRouter();
    const pallets = React.useRef([]);
    const params = useLocalSearchParams();

    const gotoActualPicking = (item) => {
        router.push({
            pathname: "/orderpicking/step_three_actual_picking",
            params: {
                siid: item.SaleItemID,
                subLocation: item.SubLocation,
                prid: item.PurchaseReceivedID,
                pallet: item.FormattedPalletID,
                co: params.co,
                maxAllowedPick: item.MaxAllowedPick,
            }
        });
    }

    const pickItemDataQuery = useQuery({
        queryKey: ["pick-item-data", params.siid],
        queryFn: async() => await fetchPickItemData(Number(params.siid))
    })

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
                    MaxAllowedPick
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

    if(itemPalletsInfoQuery.isFetched) {
        pallets.value = itemPalletsInfoQuery.data;
    }

    const codeHandler = (data) => {
        const pallet = pallets.value.filter((item) => {
            if(item.FormattedPalletID == data) {
                return true;
            }

            return false;
        });

        if(!pallet.length) {
            onOpen();
            setModalTitle('Error');
            setModalMessage("Invalid pallet")
            setResetScanner(true);
            return false;
        }

        gotoActualPicking(pallet[0]);
    };

    return  (<>
        <ModalMessage isOpen={isOpen} onClose={onClose} title={modalTitle} message={modalMessage}/>
        <AppBarCodeScanner scannerName="Scan Pallet#" codeHandler={codeHandler} />
    </>)
}
