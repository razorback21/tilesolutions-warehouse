import {Button, Icon, Box, Text} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";


export default (props) => {
    return (
        <>
            <Box style={{position:"relative"}}>
                <Button onPress={props.onPress}
                        variant="whiteButton"
                        leftIcon={<Icon as={MaterialIcons} name={props.icon} size="md" color="text.500"/>}
                        mb={props.mb}
                        mt={props.mt}
                        w="100%"
                >
                    <Text w="80%" fontSize="14" ml="1" width="100%">{props.title}</Text>
                </Button>
                <Icon position="absolute" right="5" top="15px" size="xs" as={MaterialIcons} name="arrow-forward-ios" color="primary.500"/>
            </Box>

        </>
    )
}
