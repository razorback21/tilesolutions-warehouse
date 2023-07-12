import TileInfoBox from "./TileInfoBox";
import {Box, HStack, Text} from "native-base";
import ItemInfoBox from "./ItemInfoBox";

const PickItemBoxes = ({data}) => {

     return  (
        <>
            <ItemInfoBox data={data}/>
            <HStack justifyContent="center" space="5" mt="4">
                <TileInfoBox title={`${data.Ordered}`} subTitle="Ordered"/>
                <TileInfoBox title={`${data.RemainingToBePick}`} subTitle="Remaining"/>
                <TileInfoBox title={`${data.UoM}`} subTitle="UoM"/>
            </HStack>
        </>
    )
}

export default PickItemBoxes;

PickItemBoxes.defaultProps = {

}
