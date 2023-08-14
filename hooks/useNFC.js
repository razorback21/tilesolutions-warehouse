import React from 'react';
import NfcManager, {NfcTech,  Ndef } from 'react-native-nfc-manager';

const useNFC = () => {
    let [isNFCSupported, setIsNFCSupported]=  React.useState(false);
    let [NFCStarted, setNFCStarted ]= React.useState(false);
    let [NFCScanning, setNFCScanning]=  React.useState(false);
    let [NFCData, setNFCData] =  React.useState(false);

    const NFCInitialize = async () => {
        const supported = await NfcManager.isSupported();
        setIsNFCSupported(supported);

        if(supported && !NFCStarted) {
            await NfcManager.start();
            setNFCStarted(true);
        }
    }

    const NFCScanTag = async () => {
        setNFCScanning(true);
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();

            tag.then((tag) => {
                let payload = tag.ndefMessage[0].payload;
                try {
                    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                        setNFCData(Ndef.text.decodePayload(payload));
                    }
                } catch (e) {
                    console.log(e);
                }

            }).catch((err) => console.warn('error getting tag: ', err));
        } catch (ex) {
            console.log('NFC Error!', ex);
        } finally {
            await NFCStopScan();
        }
    }

    const NFCStopScan = async () => {
        if(NFCStarted) {
            await NfcManager.cancelTechnologyRequest();
            setNFCStarted(false);
            setNFCScanning(false);
        }
    }


    return [
        NfcManager,
        NFCInitialize,
        NFCStarted,
        isNFCSupported,
        NFCScanTag,
        NFCStopScan,
        NFCScanning,
        NFCData
    ];
}

export default useNFC;
