import React from 'react';
import AppBarCodeScanner from "../../components/shared/AppBarCodeScanner";
import ModalMessage from "../../components/shared/ModalMessage";
import {useDisclose} from "native-base";
import useApi from "../../hooks/useApi";
import {useRouter} from 'expo-router';

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

    const verifyOrder = (co_number) => {
        return tsQuery(
            `VerifyOrderForPicking($CONumber: String!) {
                    VerifyOrderForPicking(CONumber: $CONumber) 
            }`,
            {
                CONumber: co_number
            }).then(res => {
            return res.data.data.VerifyOrderForPicking;
        })
    }

    const viewOrderForPicking = (co_number) => {
        if(!co_number || co_number === '') {
            onOpen();
            setModalTitle('Error');
            setModalMessage('Order confirmation field is required. Please enter a value.');
        } else {
            verifyOrder(co_number.toString()).then(valid => {
                if(valid) {
                    router.push({pathname: '/orderpicking/step_two', params: {co: co_number}});
                } else {
                    onOpen();
                    setModalTitle('Error');
                    setModalMessage('CO number is not valid. Try again.')
                }
            });
        }
    }

    const codeHandler = (data) => {
        viewOrderForPicking(data);
        console.log('Scanned : ', data);
    };

    return  (<>
        <ModalMessage isOpen={isOpen} onClose={onClose} title={modalTitle} message={modalMessage}/>
        <AppBarCodeScanner scannerName="Scan Order Confirmation" codeHandler={codeHandler}/>
    </>)
}
