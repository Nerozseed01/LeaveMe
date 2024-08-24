import React from 'react';
import AppNavigation from './src/Navigation/AppNavigaton.js';
import { NativeWindStyleSheet } from "nativewind";


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <AppNavigation />
  );
}




