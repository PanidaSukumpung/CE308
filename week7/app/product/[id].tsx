import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function ProductScreen() {
  const { id, name, price, description } = useLocalSearchParams();

  return (
    <View>
      <View style={styles.imageContainer}>
        <Text style={styles.imagePlaceholder}>Product image</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.price}>฿{price}</Text>
        <Text style={styles.label}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#f9661c",
    marginTop: 10,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: "#a1a1a1",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
  },
  imageContainer: {
    height: 280,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  imagePlaceholder: {
    color: "#939292",
  },
});
