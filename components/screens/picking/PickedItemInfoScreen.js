import React from "react";
import { StyleSheet } from 'react-native';
import {Box, Text, Heading, ScrollView, HStack, IconButton, Icon, Flex} from "native-base";
import AppNavigation from "../../shared/AppNavigation";
import AppStyles  from "../../../AppStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default () => {

    return (
        <>
            <AppNavigation />
             <Box style={styles.topContainer}>
                    <Heading size="md" color="tertiary.700" >Picked Item Information</Heading>
                    <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
                        <Text fontSize="12">
                            Item Code : <Text fontWeight="700">MP.001.0150</Text>
                        </Text>
                        <Text fontSize="12">
                            Description : UltraFlex 1 Polymer Modified Grey 50 lbs
                        </Text>
                    </Box>

                    <HStack justifyContent="center" space="5" mt="4">
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">83</Text>
                            <Text color="tertiary.700" fontWeight="700">Ordered</Text>
                        </Box>
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">0</Text>
                            <Text color="tertiary.700" fontWeight="700">Remaining</Text>
                        </Box>
                        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="#D9D9D9" rounded="4">
                            <Text fontWeight="700" fontSize="24">PC</Text>
                            <Text color="tertiary.700" fontWeight="700">UoM</Text>
                        </Box>
                    </HStack>

                    <Text fontSize="12" fontWeight="700" my="4">QUANTITY PICKED</Text>

                    <HStack alignItems="center" rounded="4" bg="white" px="4" py="1" h="90" shadow="5" mb="1">
                        <Box>
                            <Text fontWeight="300" fontSize="12" pr="10">
                                19 PC at BRUNEL,R19.S03 by DEFAULT ADMIN on Oct 13,2022 1:56 AM
                            </Text>
                        </Box>
                        <Box>
                            <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                <IconButton icon={<Icon size="md" as={MaterialIcons} name="more-vert" color="primary.600"/>} _pressed={{
                                    bg: "text.100"
                                }}/>
                            </Flex>
                        </Box>
                    </HStack>

                     <HStack alignItems="center" rounded="4" bg="white" px="4" py="1" h="90" shadow="5" mb="1">
                         <Box>
                             <Text fontWeight="300" fontSize="12" pr="10">
                                 19 PC at BRUNEL,R19.S03 by DEFAULT ADMIN on Oct 13,2022 1:56 AM
                             </Text>
                         </Box>
                         <Box>
                             <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                 <IconButton icon={<Icon size="md" as={MaterialIcons} name="more-vert" color="primary.600"/>} _pressed={{
                                     bg: "text.100"
                                 }}/>
                             </Flex>
                         </Box>
                     </HStack>

                </Box>
        </>
    )
}

const styles= StyleSheet.create({
    ...AppStyles
})
