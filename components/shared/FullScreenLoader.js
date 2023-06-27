import {Spinner, VStack, Center, Text, Box} from 'native-base';

const FullScreenLoader = (props) => {
    return (
        <VStack justifyContent="center" alignItems="center" width="100%" height="100%">
                <Box>
                    <Center>
                        <Spinner size={props.size} color={props.color}/>
                    </Center>
                    <Center>
                        <Text>{props.text}</Text>
                    </Center>
                </Box>
        </VStack>
    )
}

export default FullScreenLoader;

FullScreenLoader.defaultProps = {
    size: 'md',
    color: 'primary.500',
    text: 'Loading...'
}