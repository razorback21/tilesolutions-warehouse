import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, Pressable, VStack, Stack, HStack, Icon} from "native-base";
import AppNavigation from "../../shared/AppNavigation";
import AppStyles from "../../../AppStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default (props) => {
    console.log(props.navigation)
    const navigation = props.navigation;
    const navigate = navigation.navigate;

    const IconActionButton = (props) => {
        return (
            <Pressable onPress={props.onPress} flexBasis="48%" p="2" bg="muted.50" rounded="4" shadow="3" _pressed={{
                bg: "white"
            }}>
                <Stack direction="row" >
                    <VStack justifyContent="center">
                        <Icon name={props.icon} as={props.as} size="lg" color="primary.600"/>
                    </VStack>
                    <Box ml="2">
                        <Text color="primary.500" fontSize="11">{props.category}</Text>
                        <Heading fontSize="14" color="primary.800">{props.title}</Heading>
                    </Box>
                </Stack>
            </Pressable>
        );
    }

    return (
        <>
            <AppNavigation navigation={props.navigation}/>
            <Box style={styles.topContainer}>
                <Heading size="md" mb="5" color="tertiary.700">Dashboard</Heading>
                <HStack  flexWrap="wrap" space="2" justifyContent="space-between" mb="3">
                    <IconActionButton onPress={() => navigate('Order Picking')} icon="hand-paper" as={FontAwesome5} category="Warehouse" title="Order Picking"/>
                    <IconActionButton icon="local-shipping" as={MaterialIcons} category="Warehouse" title="Order Shipping"/>
                </HStack>
                <HStack flexWrap="wrap" space="2" justifyContent="space-between" mb="3">
                    <IconActionButton icon="search" as={FontAwesome5} category="Warehouse" title="Sub-loc. Search"/>
                    <IconActionButton icon="settings-sharp" as={Ionicons} category="Warehouse" title="Inventory Opt."/>
                </HStack>
            </Box>
        </>
    )
}

const styles = StyleSheet.create({
    ...AppStyles
})
