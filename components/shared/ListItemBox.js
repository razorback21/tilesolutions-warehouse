import React from "react";
import {HStack, Stack, Icon, Flex, Pressable } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ListItemBox = (props) => {
    return <Pressable _pressed={{
        bg: "text.50"
    }} bg="#FFFFFF"  mb={props.marginBottom} onPress={props.onPress} rounded="5" mx="3" shadow="2">
        <HStack px="4" py="2.5" alignItems="center">
            <Stack w={props.showRightIcon ? "95%" : "100%"}>
                {props.content}
            </Stack>
            {
                props.showRightIcon && (
                    <Pressable onPress={props.onPressRightIcon}>
                        <Stack h="100%" direction="row">
                            <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                <Icon size={props.rightIconSize} as={MaterialIcons} name={props.rightIcon} color="primary.600"/>
                            </Flex>
                        </Stack>
                    </Pressable>
                )
            }

        </HStack>
    </Pressable>
}

ListItemBox.defaultProps = {
    marginBottom: 2,
    rightIcon: "arrow-forward-ios",
    rightIconSize: "sm",
    showRightIcon: true
}

export default ListItemBox;

