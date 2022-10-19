import React from "react";
import { StyleSheet, View } from 'react-native';
import {Box, Text, Heading, ScrollView, HStack, Stack, Icon, Flex, Spacer } from "native-base";
import AppNavigation from "../shared/AppNavigation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default () => {

    const scanNFCTag = () => {
        console.warn('scanning NFC tag');
    }

    const scanQRCode = () => {
        console.warn('scanning QR Code');
    }

    const orderReceived = () => {
        console.warn('Goto order received');
    }

    return (
        <>
            <AppNavigation />
            <Box style={styles.topContainer}>
                <Text color="tertiary.500" fontSize="12">STEP 1</Text>
                <Heading size="md" color="tertiary.700">Picking order for pickup</Heading>

                <Text my="2" fontSize="12">
                    Written by: Philiipine{"\n"}
                    Sold to: JS Renovations{"\n"}
                    For C.O: <Text fontWeight="700">000183381</Text>
                </Text>
            </Box>
            <Box style={styles.contentContainer}>
                <Box style={styles.innerBox} bg={"tertiary.200"}>
                    <ScrollView>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                                <Stack w="95%">
                                    <Box mb="1">
                                        <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                    </Box>
                                    <Box mb="1">
                                        <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                    </Box>
                                    <Box>
                                        <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                    </Box>
                                </Stack>
                                <Stack h="100%" direction="row">
                                    <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                    </Flex>
                                </Stack>
                            </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                        <HStack bg="#FFFFFF" p="4" mb="2" h="120">
                            <Stack w="95%">
                                <Box mb="1">
                                    <Text fontWeight="700" fontSize="12">AA.911.2424</Text>
                                </Box>
                                <Box mb="1">
                                    <Text fontWeight="300" fontSize="12">La Marca Statuarietto Polished Rectified Glazed Porcelain 24" x 24"</Text>
                                </Box>
                                <Box>
                                    <Text fontWeight="300" fontSize="12">Order Qty : <Text fontWeight="700">83 PC</Text></Text>
                                </Box>
                            </Stack>
                            <Stack h="100%" direction="row">
                                <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
                                    <Icon size="md" as={MaterialIcons} name="arrow-forward-ios" color="primary.600"/>
                                </Flex>
                            </Stack>
                        </HStack>
                    </ScrollView>
                </Box>
            </Box>
        </>
    )
}

const styles= StyleSheet.create({
    topContainer: {
        backgroundColor: "#E7E7E9",
        paddingTop: 35,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15
    },
    contentContainer: {
        backgroundColor: "#FFFFFF",
        flex:1,
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom:10
    },
    innerBox: {
        flex:1,
        padding:8
    }
})
