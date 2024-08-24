import React from "react";
import { AuthProvider } from "../context/authContext";
import AppNavigationDecision from "./appNavigationDesicion";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingTop: 10,
      }}
      text2NumberOfLines={0}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: 'bold',
        flex: 1,
        flexWrap: 'wrap',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingTop: 10,
      }}
      text2NumberOfLines={0}
    />
  ),
};

export default function AppNavigation() {
  return (
    <AuthProvider>
      <AppNavigationDecision />
      <Toast
        config={toastConfig}
        position="top"
        topOffset={50}
        bottomOffset={40}
      />
    </AuthProvider>
  );
}