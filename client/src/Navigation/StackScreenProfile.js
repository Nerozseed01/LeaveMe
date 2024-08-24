import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
import UpdateInterest from "./../Screens/UpdateInterest";
import SelectInteres from './../Screens/ScreensWelcome/SelectInteres';

const Stack = createNativeStackNavigator();

export default function StackGroupProfile() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="ProfileMain" component={Profile} />
            <Stack.Screen name="UpdateInterest" component={UpdateInterest} options={({route}) => ({
                params: {interesesUser: route.params.intereses, userId: route.params.idUser,}
            })}/>
            <Stack.Screen name="SelectInteres" component={SelectInteres} />
        </Stack.Navigator>
    );
}