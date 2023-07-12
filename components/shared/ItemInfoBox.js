import {Box, Text} from "native-base";

export default (props) => {
    return <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
            <Text fontSize="12">
                Item Code : <Text fontWeight="700">{props.data.ProductCode}</Text>
            </Text>
            <Text fontSize="12">
                Description : {props.data.ProductDescription}
            </Text>
        </Box>
}
