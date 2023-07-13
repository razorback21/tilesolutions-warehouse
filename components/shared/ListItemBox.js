import React from "react";
import {HStack, Icon, Pressable, Box } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ListItemBox = (props) => {
    return <Pressable _pressed={{
        bg: "text.50"
    }} bg="#FFFFFF"  mb={props.marginBottom} onPress={props.onPress} rounded="5" mx="3" shadow="2">
        {
            props.statusColor && <Box style={{
                position: "absolute",
                right: 0,
                width: 0,
                height: 0,
                borderTopColor: props.statusColor,
                borderTopWidth:20,
                borderTopStyle: "solid",
                borderLeftWidth: 20,
                borderLeftStyle: "solid",
                borderLeftColor: "transparent",
            }}
            ></Box>
        }

        <HStack px="4" py="2.5" alignItems="center">
            <Box w={props.showRightIcon ? "95%" : "100%"}>
                {props.content}
            </Box>
            {
                props.showRightIcon && (
                    <Pressable onPress={props.onPressRightIcon}>
                            <Icon size={props.rightIconSize} as={MaterialIcons} name={props.rightIcon} color="primary.600"/>
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
    showRightIcon: true,
    statusColor: "#fff"
}

export default ListItemBox;

