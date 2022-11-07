import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DashboardScreen from "../screens/picking/DashboardScreen";
import OrderPickingHomeScreen from "../screens/picking/OrderPickingHomeScreen";
import OrderReceivedScreen from "../screens/picking/OrderReceivedScreen";
import PickingStepOneScreen from "../screens/picking/PickingStepOneScreen";
import PickingStepTwoScreen from "../screens/picking/PickingStepTwoScreen";
import PickingStepThreeScreen from "../screens/picking/PickingStepThreeScreen";
import ActualPickingScreen from "../screens/picking/ActualPickingScreen";
import PickedItemInfoScreen from "../screens/picking/PickedItemInfoScreen";


const DashboardStackNav= () => {
    const StackNav = createNativeStackNavigator();
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false,
        }} >
            <StackNav.Screen name="Dashboard" component={DashboardScreen} />
            <StackNav.Screen name="OrderPicking" component={OrderPickingHomeScreen} />
            <StackNav.Screen name="OrderReceived" component={OrderReceivedScreen} />
            <StackNav.Screen name="PickingStepOne" component={PickingStepOneScreen} />
            <StackNav.Screen name="PickingStepTwo" component={PickingStepTwoScreen} />
            <StackNav.Screen name="PickingStepThree" component={PickingStepThreeScreen} />
            <StackNav.Screen name="ActualPicking" component={ActualPickingScreen} />
            <StackNav.Screen name="PickedItemInformation" component={PickedItemInfoScreen} />

        </StackNav.Navigator>
    );
}

export default DashboardStackNav;
