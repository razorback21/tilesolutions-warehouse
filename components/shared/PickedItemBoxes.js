import TileInfoBox from "./TileInfoBox";
import {Box, HStack, Text} from "native-base";

export default ({data}) => {

     return  (
        <>
            <Box p="4" mt="5" bg="muted.50" rounded="4" shadow="5">
                <Text fontSize="12">
                    Item Code : <Text fontWeight="700">{data.ProductCode}</Text>
                </Text>
                <Text fontSize="12">
                    Description : {data.ProductDescription}
                </Text>
            </Box>
            <HStack justifyContent="center" space="5" mt="4">
                <TileInfoBox title={`${data.Ordered}`} subTitle="Ordered"/>
                <TileInfoBox title={`${data.RemainingToBePick}`} subTitle="Remaining"/>
                <TileInfoBox title={`${data.UoM}`} subTitle="UoM"/>
            </HStack>
        </>
    )
}