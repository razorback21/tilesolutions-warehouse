import React from 'react';
import NfcManager, {NfcTech,  Ndef } from 'react-native-nfc-manager';

const useNFC =  () => {
    let [started, setStarted ]= React.useState(false);
    let [isDeviceSupported, setIsDeviceSupported]=  React.useState(false);
    let [scanning, setScanning]=  React.useState(false);
    let [data, setData] =  React.useState(false);

    const initialize = async () => {
        setIsDeviceSupported(await NfcManager.isSupported());
        if(isDeviceSupported && !started.current) {
            await NfcManager.start();
            setStarted(true);
        }
    }

    const scanTag = async () => {
        setScanning(true);
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();

            tag.then((tag) => {
                let payload = tag.ndefMessage[0].payload;
                try {
                    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                        data = Ndef.text.decodePayload(payload)
                    }
                } catch (e) {
                    console.log(e);
                }

            }).catch((err) => console.warn('error getting tag: ', err));
        } catch (ex) {
            console.log('NFC Error!', ex);
        } finally {
            stopScan();
        }
    }

    const stopScan = async () => {
        if(started) {
            await NfcManager.cancelTechnologyRequest();
            setStarted(false);
            setScanning(false);
        }
    }

    return {
        NfcManager,
        initialize,
        started,
        isDeviceSupported,
        scanTag,
        stopScan,
        scanning
    }
}

export default useNFC;
