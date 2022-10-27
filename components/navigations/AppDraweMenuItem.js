import {HStack, Icon, Pressable, Text} from "native-base";

const AppDrawerMenuItem = (props) =>{
    return (
        <Pressable mb="2" py="1.5" pl="5" _pressed={{
            bg: "muted.50"
        }} onPress={props.onPress}>
            <HStack alignItems="center" space="5">
                <Icon size="lg" color="muted.500"  name={props.iconName} as={props.iconAs}/>
                <Text color="secondary.900" fontSize="14">{props.name}</Text>
            </HStack>
        </Pressable>
    );
}

export default AppDrawerMenuItem;
