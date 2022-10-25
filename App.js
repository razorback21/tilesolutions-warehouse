import 'react-native-gesture-handler';
import React from "react";

import {
    NativeBaseProvider,
    extendTheme, VStack, Box, Text, HStack, Heading, Center, Pressable, Icon
} from "native-base";

import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppTheme from "./AppTheme";
import DashboardScreen from "./components/screens/picking/DashboardScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  const Drawer = createDrawerNavigator();


  const AppDrawerContent = (props) => {

      const navigate = props.navigation.navigate;

      const goto = (routeName) => {
          const currentRoute = props.navigation.getState().routes[0].name;
          if(currentRoute !== routeName)
              navigate(routeName);
      }

      return (
          <VStack>
              <Box h="180" bg="primary.600" justifyContent="center" justifyItems="center" pt="5" overflow="hidden">
                 <Box rounded="full" bg="primary.700" style={{position:"absolute"}} left="-75" top="-35" w="330" h="300">

                 </Box>
                 <HStack alignItems="center" justifyContent="center" space="3" mr="5">
                     <Box rounded="full" borderColor="muted.300" borderWidth="3" w="70" h="70">
                        <Heading size="xl" color="muted.300" alignSelf="center" pt="2.5">
                            JD
                        </Heading>
                     </Box>
                     <Text color="muted.300" fontSize="12">johndoe@gmail.com</Text>
                 </HStack>
              </Box>
              <Box py="2" bg="tertiary.200" shadow="2" mt="0.5">
                  <Center><Text fontSize="10">Version 1.0.0</Text></Center>
              </Box>
              <VStack pt="7" >
                  <Pressable mb="2" py="1.5" pl="10" _pressed={{
                      bg: "muted.50"
                  }} onPress={() => goto('Dashboard')}>
                      <HStack alignItems="center" space="3">
                          <Icon size="lg" color="muted.500"  name="home" as={MaterialIcons}/>
                          <Text color="secondary.900" fontSize="16">Dashboard</Text>
                      </HStack>
                  </Pressable>
                  <Pressable mb="2" py="1.5" pl="10" _pressed={{
                      bg: "muted.50"
                  }}>
                      <HStack alignItems="center" space="3">
                          <Icon size="lg" color="muted.500"  name="logout" as={MaterialIcons}/>
                          <Text color="secondary.900" fontSize="16">Logout</Text>
                      </HStack>
                  </Pressable>
              </VStack>
          </VStack>
      )
  }

  const AppDrawer = (props) => {

      return (
          <Box>
              <AppDrawerContent {...props} />
          </Box>
      )
  }



  return (
      <NavigationContainer header={false}>
        <NativeBaseProvider theme={theme}>
            <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: false,
            }} drawerContent={(props) => <AppDrawer {...props}/>}>
                <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            </Drawer.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>

  );
}


