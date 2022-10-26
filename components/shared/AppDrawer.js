import { Box, Center, Heading, HStack, Icon, Pressable, Text, VStack } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AppDrawerContent = (props) => {

    const navigate = props.navigation.navigate;

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
                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Dashboard')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Dashboard</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Picking Step One')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Picking Step One</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Picking Step Two')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Picking Step Two</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Picking Step Three')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Picking Step Three</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Actual Picking')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Actual Picking</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }} onPress={() => navigate('Picked Item Information')}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Picked Item Information</Text>
                    </HStack>
                </Pressable>

                <Pressable mb="2" py="1.5" pl="10" _pressed={{
                    bg: "muted.50"
                }}>
                    <HStack alignItems="center" space="3">
                        <Icon size="lg" color="muted.500"  name="logout" as={MaterialIcons}/>
                        <Text color="secondary.900" fontSize="16">Logout</Text>
                    </HStack>
                </Pressable>
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
