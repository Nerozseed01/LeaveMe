import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../Screens/Blog/Feed";
import PostDetailScreen from "../Screens/Blog/PostDetailScreen";
import CreatePost from "../Screens/Blog/CreatePost";

const Stack = createNativeStackNavigator();

export default function StackGroupBlog() {
    return (
        <Stack.Navigator initialRouteName="Blog" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="BlogMain" component={Feed} />
            <Stack.Screen name="Details" component={PostDetailScreen} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
        </Stack.Navigator>
    );
}