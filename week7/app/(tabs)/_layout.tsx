import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f15a39", // สีม่วงเข้มสำหรับไอคอนที่เลือก
        tabBarInactiveTintColor: "#9CA3AF", // สีเทาสำหรับไอคอนที่ไม่ถูกเลือก
        tabBarStyle: {
          height: Platform.OS === "ios" ? 85 : 65, // ปรับความสูงของ tab bar ตามแพลตฟอร์ม
          paddingBottom: Platform.OS === "ios" ? 25 : 10, // ปรับ padding ด้านล่างตามแพลตฟอร์ม
          paddingTop: 10, // เพิ่ม padding ด้านบน
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          shadowColor: "#55555535",
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Market",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"} // เปลี่ยนไอคอนเมื่อถูกเลือก
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"} // เปลี่ยนไอคอนเมื่อถูกเลือก
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
