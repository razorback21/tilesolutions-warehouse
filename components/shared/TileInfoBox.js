import {Box, Text} from "native-base";
import React from "react";

const TileInfoBox = (props) => {
    return(
        <Box w="27%" py="2" justifyContent="center" alignItems="center" borderWidth="2" borderColor="text.400" bg="text.50" rounded="4">
            <Text fontWeight="700" fontSize="24" color="primary.600">{props.title}</Text>
            <Text color="tertiary.700" fontWeight="700">{props.subTitle}</Text>
        </Box>
    )
}

export default TileInfoBox;
