import React from "react";
import {HStack, Stack, Icon, Flex, Pressable } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ListItemBox = (props) => {
    return <Pressable _pressed={{
        bg: "text.50"
    }} bg="#FFFFFF"  mb={props.marginBottom} onPress={props.onPress} rounded="5" mx="2">
        <HStack p="4" h={props.h} alignItems="center">
            <Stack w="95%">
                {props.content}
            </Stack>
            <Stack h="100%" direction="row">
                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                    <Icon size="sm" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                </Flex>
            </Stack>
        </HStack>
    </Pressable>
}

ListItemBox.defaultProps = {
    h: 120,
    marginBottom: 2
}

export default ListItemBox;

