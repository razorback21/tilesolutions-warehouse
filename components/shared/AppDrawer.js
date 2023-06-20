import { Box, Center, Heading, HStack, Text, VStack } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppDraweMenuItem from "./AppDraweMenuItem";
import useAuth from "../../hooks/useAuth";
import {useRouter} from "expo-router";

const AppDrawerContent = (props) => {
    const router = useRouter();
    const {appLogout} = useAuth();

    return (
        <VStack>
            <Box h="180" bg="primary.600" justifyContent="center" justifyItems="center" pt="5" overflow="hidden">
                <Box rounded="full" bg="primary.700" style={{position:"absolute"}} left="-75" top="-35" w="330" h="300">

                </Box>
                <HStack alignItems="center" justifyContent="center" space="3" mr="5">
                    <Box rounded="full" borderColor="muted.300" borderWidth="3" w="70" h="70">
                        <Heading size="xl" color="muted.300" alignSelf="center" pt="2.5">
                            JD
                        </Heading>
                    </Box>
                    <Text color="muted.300" fontSize="12">johndoe@gmail.com</Text>
                </HStack>
            </Box>
            <Box py="2" bg="tertiary.200" shadow="2" mt="0.5">
                <Center><Text fontSize="10">Version 1.0.0</Text></Center>
            </Box>
            <VStack pt="7" >
                <AppDraweMenuItem iconName="home" iconAs={MaterialIcons} name="Dashboard" onPress={() => router.push('/')}/>
                <AppDraweMenuItem iconName="logout" iconAs={MaterialIcons} name="Logout" onPress={appLogout}/>
            </VStack>
        </VStack>
    )
}

export default (props) => {
    return (
        <Box>
            <AppDrawerContent {...props} />
        </Box>
    )
}
