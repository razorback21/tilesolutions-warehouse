import {Spinner, Modal, VStack, Center, Text} from 'native-base';

const SpinnerModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} closeOnOverlayClick={false}>
            <VStack bg="white" p="7px" rounded="7px">
                <Center>
                    <Spinner size={props.size} color={props.color}/>
                </Center>
                <Center>
                    <Text>{props.text}</Text>
                </Center>
            </VStack>
        </Modal>
    )
}

export default SpinnerModal;

SpinnerModal.defaultProps = {
    size: 'md',
    color: 'primary.500',
    text: 'Loading...'
}