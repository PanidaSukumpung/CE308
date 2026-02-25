import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Details Screen</Text>

      <Button title="Go Back" onPress={() => router.back()} />
      <Ionicons
        name="chevron-back"
        size={24}
        color="black"
        onPress={() => router.back()}
      />
    </View>
  );
}
