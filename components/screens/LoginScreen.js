import React, {useState, useRef} from 'react';
import { StyleSheet } from 'react-native';
import {Box, Button, Input, VStack, Text, Heading, Icon, Stack, useDisclose} from 'native-base';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ModalMessage from "../shared/ModalMessage";
import useAuth from "../../hooks/useAuth";

export default () => {
    const [appLogin, appLogout] = useAuth();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [modalTitle, setModalTitle ] = useState('Message');
    const [modalMessage, setModalMessage ] = useState('');


    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const handleEmailInput = (text) => {
        setEmailValue(text);
    }

    const handlePasswordInput = (text) => {
        setPasswordValue(text);
    }

    const error_message_handler = (error) => {
        const msg = error.toString();
        if(msg.includes('401')) {
            return {
                title: 'Access Denied',
                message: 'Invalid Credentials.'
            }
        } else {
            const result = msg.split(':');
            return {
                title: 'Error',
                message: result[1].slice(1)
            }
        }
    }

    const handleLogin = () => {
        if(!emailValue.length || !passwordValue.length) {
            setModalTitle('Error');
            setModalMessage('Email and Password field is required.');
            onOpen();
        } else {
            appLogin(emailValue, passwordValue).catch(error => {
                const msg = error_message_handler(error);
                setModalTitle(msg.title);
                setModalMessage(msg.message);

                onOpen();
                appLogout();
            });
        }

    }

    return (
        <>
        <ModalMessage isOpen={isOpen} onClose={onClose} title={modalTitle} message={modalMessage}/>
        <VStack style={styles.topContainer} justifyContent="space-between">
        <Box h="300" bg="red.00" justifyContent="center" alignItems="center">
            <Icon name="warehouse" as={FontAwesome5} color="#ffffff" size="250" style={{textShadowOffset:{width: 0, height:5}, textShadowRadius:1, textShadowColor:'rgba(0, 0, 0, 0.25)'}} position="absolute" right="0" bottom="0"/>
            <Stack mt="-100">
                <Text fontSize="13" shadow="2" style={{textShadowOffset:{width: 1, height:1}, textShadowRadius:4}} color="tertiary.600">Tile Solutions</Text>
                <Heading size="3xl" color="primary.600" letterSpacing="md" lineHeight="50" style={{textShadowOffset:{width: 1, height:1}, textShadowRadius:1}}>Warehouse</Heading>
            </Stack>
        </Box>
        <Box px="5" mt="40%" style={styles.loginBox}>
            <Input size="lg" mb="2" placeholder="Email" onChangeText={handleEmailInput} />
            <Input size="lg" mb="2" placeholder="Password" type="password" onChangeText={handlePasswordInput}/>
            <Button onPress={handleLogin}>Log In</Button>
        </Box>
    </VStack>
    </>);
}

const styles = StyleSheet.create({
    topContainer: {
        paddingTop: "30%",
        height: "100%",
        backgroundColor: "#E7E7E9",
        position: "relative",

    },
    loginBox: {
        position: "absolute",
        width: "100%",
        bottom: 40
    }
});

