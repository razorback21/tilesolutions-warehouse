import React from 'react';
import NfcManager, {NfcEvents, NfcTech,  Ndef } from 'react-native-nfc-manager';

const useNFC =  () => {
    let started = false;
    let deviceSupport = false;
    let reading = false;
    let data = null;

    const initialize = async () => {
        deviceSupport = await NfcManager.isSupported()
        if(deviceSupport && !started) {
            NfcManager.start();
            started = true;
        }
    }

    const readTag = async () => {
        reading = true;
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
        }catch (ex) {
            console.log('NFC Error!', ex);
        } finally {
            stopScan();
        }
    }

    const stopScan = () => {
        if(started) {
            NfcManager.cancelTechnologyRequest();
        }
    }

    return {
        started,
        deviceSupport,
        initialize,
        NfcManager,
        stopScan
    }
}

export default useNFC;
