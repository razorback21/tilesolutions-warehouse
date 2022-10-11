import { Box, HStack, IconButton, Icon, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

export default () => (
    <>
        <Box safeAreaTop bg="primary.500"/>
        <HStack bg="primary.500" px="1" pt="0" pb="2" justifyContent="space-between" w="100%">
           <HStack alignItems="center">
                <IconButton icon={<Icon as={Ionicons} name='md-menu' size='5'/>} _icon={{color:"white"}}  />
                <Text color="white" fontSize="20" fontWeight="bold">
                    Tile Solutions
                </Text>
            </HStack>
            <HStack>
                <IconButton icon={<Icon as={Ionicons} name='md-ellipsis-vertical' size='5'/>} _icon={{color:"white"}}  />
            </HStack>
        </HStack>
    </>
)
