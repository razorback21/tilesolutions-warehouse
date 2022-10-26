import { useNavigation, useRoute } from "@react-navigation/native";

const useGoTo = (routeName) => {
    const navigation = useNavigation();
    const navigate = navigation.navigate;
    //console.log(navigation.getCurrentRoute().name);
    const currentRoute = navigation.getCurrentRoute().name;
    if(currentRoute !== routeName)
        navigate(routeName);
}

export default useGoTo

