import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Icon } from "native-base"
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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        props.codeHandler(data);
    };

    const closeScanner = () => {
        setScanned(false);
        router.back();
    }

    if (hasPermission === null) {
        return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasPermission === false) {
        return <View style={styles.container}><Text>No access to camera</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.scannerName}</Text>
            <View style={{height:600, marginTop:10}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject]}
                />
                <BarcodeMask />
            </View>
            <View>
                <IconButton onPress={!props.onClose ? closeScanner : props.onClose} icon={<Icon as={FontAwesome5} name="times-circle" size="4xl"/>} borderRadius="full" _icon={{color:"#fff"}}/>
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
    },
    title: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
    }
})

AppBarCodeScanner.defaultProps = {
    'scannerName' : 'Scan',
    'onClose' : false
}
