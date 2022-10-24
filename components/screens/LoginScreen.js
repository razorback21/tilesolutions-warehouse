import { StyleSheet } from 'react-native';
import {Box, Button, Input, VStack, Text, Heading, Icon, Stack} from 'native-base';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default () => {
    return (<VStack style={styles.topContainer} justifyContent="space-between">
        <Box h="300" bg="red.00" justifyContent="center" alignItems="center">
            <Icon name="warehouse" as={FontAwesome5} color="#ffffff" size="250" style={{textShadowOffset:{width: 0, height:5}, textShadowRadius:1, textShadowColor:'rgba(0, 0, 0, 0.25)'}} position="absolute" right="0" bottom="0"/>
            <Stack mt="-100">
                <Text fontSize="13" shadow="2" style={{textShadowOffset:{width: 1, height:1}, textShadowRadius:4}} color="tertiary.600">Tile Solutions</Text>
                <Heading size="3xl" color="primary.600" letterSpacing="md" lineHeight="50" style={{textShadowOffset:{width: 1, height:1}, textShadowRadius:1}}>Warehouse</Heading>
            </Stack>
        </Box>
        <Box px="5" mt="40%">
            <Input size="sm" mb="2" placeholder="Email"/>
            <Input size="sm" mb="2" placeholder="Password" type="password"/>
            <Button>Log In</Button>
        </Box>
    </VStack>);
}

const styles = StyleSheet.create({
    topContainer: {
        paddingTop: "30%",
        backgroundColor: "#E7E7E9"
    }
});

