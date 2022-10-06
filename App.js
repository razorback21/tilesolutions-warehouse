import React from "react";

import {
  NativeBaseProvider,
  extendTheme,
  VStack,
  FormControl,
  Input,
  Button,
  Text
} from "native-base";



import AppTheme from "./AppTheme";

export default function App() {
  // extend the theme
  const theme = extendTheme(AppTheme);

  return (
    <NativeBaseProvider theme={theme}>
      <VStack width="90%" mx="3" maxW="300px" safeAreaTop>
        <FormControl>
          <FormControl.Label _text={{
            bold: true
          }}>Name</FormControl.Label>

          <Input placeholder="John"/>
        </FormControl>

        <Button mt="5">
          Submit
        </Button>
      </VStack>
    </NativeBaseProvider>
  );
}


