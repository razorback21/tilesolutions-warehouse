import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Icon, VStack, Center } from "native-base"
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from 'expo-router';

const AppBarCodeScanner = (props) => {
    const router = useRouter();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    let count = 0;
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log('SCANNED DATA : ', data);
        (async () => {
            props.codeHandler(data);
        })().then(() => {
            setScanned(false);
        })
    };

    const closeScanner = () => {
        setScanned(false);
        router.back();
    }

    const closeHandler = () => {
        setScanned(false);
        props.onClose();
    }

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
    }

    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            <VStack>
                <Center>
                    <Text color="#ffffff" fontSize={21} mb={1}>{props.scannerName}</Text>
                    {props.caption !== '' && <Text color="white" fontSize={14}>{props.caption}</Text>}
                </Center>
            </VStack>
            <View style={{height:600, marginTop:10}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject]}
                />
                <BarcodeMask />
            </View>
            <View>
                <IconButton onPress={!props.onClose ? closeScanner : closeHandler} icon={<Icon as={FontAwesome5} name="times-circle" size="4xl"/>} borderRadius="full" _icon={{color:"#fff"}}/>
            </View>
        </View>
    );
}

export default AppBarCodeScanner;

const styles = StyleSheet.create({
    container : {
        backgroundColor:"#000",
        flex: 1,
        color: "#fff",
        flexDirection:"column",
        justifyContent: "center"
    }
})

AppBarCodeScanner.defaultProps = {
    'scannerName' : 'Scan',
    'onClose' : false,
    'caption': ''
}
