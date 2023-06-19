import {Modal} from 'native-base'
import React from "react";

const ModalMessage = (props) => {
    return (
        <Modal {...props}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontSize="4xl" fontWeight="bold">
                    {props.title}
                </Modal.Header>
                <Modal.Body>
                    {props.message}
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}

export default ModalMessage;