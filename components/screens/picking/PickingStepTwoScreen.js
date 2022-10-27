import React from "react";
import { StyleSheet } from 'react-native';
import { Box, Text, Heading, ScrollView, HStack, Center, Fab, Icon, useDisclose, Actionsheet } from "native-base";
import ListItemBox from "../../shared/ListItemBox";
import AppStyles  from "../../../AppStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppBackNavigation from "../../shared/AppBackNavigation";
import TileInfoBox from "../../shared/TileInfoBox";

export default (props) => {
    const ItemContent = () => {
        return (
            <>
                <Box mb="1">
                    <HStack space="5">
                        <Text fontWeight="700" fontSize="12" color="primary.600">R19.013</Text>
                    </HStack>
                </Box>
                <Box mb="1">
                    <Text fontWeight="400" fontSize="12" color="text.600">PalletID: 0000000000108334</Text>
                    <Text fontWeight="400" fontSize="12" color="text.600">Shade: W2-074-041922</Text>
                </Box>
                <Box>
                    <HStack space="7">
                        <Text fontWeight="400" fontSize="12" color="text.600">Quantity : 5</Text>
                        <Text fontWeight="400" fontSize="12" color="text.600">Available: 5</Text>
                    </HStack>
                </Box>
            </>
        );
    }

    function ActionSheet() {
        const { isOpen, onOpen, onClose } = useDisclose();

        return (
            <Center>
                <Fab
                    onPress={onOpen}
                    placement="bottom-right"
                    colorScheme="blue"
                    size="sm"
                    icon={<Icon name="md-ellipsis-vertical" as={Ionicons} />}
                />
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} size="6" name="qr-code-scanner" />} _pressed={{
                            bg: "text.100"
                        }}>
                            Scan QR code
                        </Actionsheet.Item>
                        <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="nfc" size="6" />} _pressed={{
                            bg: "text.100"
                        }}>
                            Scan NFC tag
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Center>
        );

    }

    return (
        <>
            <AppBackNavigation navigation={props.navigation} />
            <ActionSheet />
            <ScrollView>
                <Box style={styles.topContainerNoFlex}>
                    <Text color="text.500" fontSize="12">STEP 2</Text>
                    <Heading size="md" color="tertiary.700" >Choose Pallet</Heading>
                    <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
                        <Text fontSize="12">
                            Item Code : <Text fontWeight="700">MP.001.0150</Text>
                        </Text>
                        <Text fontSize="12">
                            Description : UltraFlex 1 Polymer Modified Grey 50 lbs
                        </Text>
                    </Box>

                    <HStack justifyContent="center" space="5" mt="4">
                        <TileInfoBox title="83" subTitle="Ordered"/>
                        <TileInfoBox title="83" subTitle="Remaining"/>
                        <TileInfoBox title="PC" subTitle="UoM"/>
                       </HStack>

                    <Center mt="4">
                        <Text fontWeight="700" color="text.700" fontSize="12">Available at below Sub-locations</Text>
                    </Center>
                </Box>
                <Box style={styles.contentContainer}>
                    <Box style={styles.innerBox} bg={"tertiary.200"}>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                        <ListItemBox content={<ItemContent />}/>
                    </Box>
                </Box>
            </ScrollView>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
