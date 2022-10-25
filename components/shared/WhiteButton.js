import {Button, Icon, Stack, Text} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";


export default (props) => {
    return (
        <>
            <Button onPress={props.handler} variant="whiteButton" leftIcon={<Icon as={MaterialIcons} name={props.icon} size="md" color="text.500"/>} mb={props.mb} mt={props.mt}>
                <Stack direction="row" >
                    <Text w="80%" fontSize="14" ml="1">{props.title}</Text>
                    <Icon position="absolute" right="-55" top="1.5" size="xs" as={MaterialIcons} name="arrow-forward-ios" color="primary.500"/>
                </Stack>
            </Button>
        </>
    )
}
