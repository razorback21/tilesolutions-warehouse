import {Button, Icon, Stack, Text} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";


export default (props) => {
    return (
        <>
            <Button onPress={props.handler} variant="whiteButton" leftIcon={<Icon as={MaterialIcons} name={props.icon} size="xl" style={{color:"text.700"}}/>} mb={props.mb} mt={props.mt}>
                <Stack direction="row" >
                    <Text fontWeight="bold" w="80%" fontSize="16">{props.title}</Text>
                    <Icon position="absolute" right="-65" top="0.5" size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                </Stack>
            </Button>
        </>
    )
}
