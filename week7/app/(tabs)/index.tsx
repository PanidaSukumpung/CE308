import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const features = [
    { icon: "rocket", title: "เริ่มต้นใช้งาน", color: "#4F46E5" },
    { icon: "stats-chart", title: "สถิติ", color: "#059669" },
    { icon: "notifications", title: "แจ้งเตือน", color: "#DC2626" },
    { icon: "settings", title: "ตั้งค่า", color: "#7C3AED" },
  ];
  const products = [
    {
      id: "1",
      name: "iPhone 15",
      price: "32,900",
      description:
        "Powerful smartphone with great camera and smooth performance",
    },
    {
      id: "2",
      name: "iPad Air",
      price: "23,900",
      description: "Lightweight tablet for work",
    },
    {
      id: "3",
      name: "Macbook",
      price: "40,900",
      description: "High-performance laptop",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            router.push({
              pathname: "/product/[id]",
              params: {
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
              },
            });
          }}
          style={styles.productCard}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.price}>฿{item.price}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  productCard: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#d8d8d8",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  price: {
    color: "#ff6200",
    marginTop: 5,
    fontSize: 12,
  },
});
