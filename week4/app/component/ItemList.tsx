import { FlatList, Text, View } from "react-native";
import { CustomButton } from "./CustomButton";

export type Item = {
  id: string;
  title: string;
  price: number;
  pcs: number;
  btnSize?: "sm" | "md" | "lg";
  btnColor?: "primary" | "secondary" | "danger";
};

export type ItemListProp = {
  items: Item[];
};

export const ItemList = ({ items }: ItemListProp) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4 bg-gray-100 m-1 rounded-lg items-start">
          <Text className="text-4xl font-bold">ชื่อสินค้า: {item.title}</Text>
          <Text className="text-base font-bold text-gray-500">
            ราคา: {item.price}
          </Text>
          <Text className="text-base font-bold text-gray-500">
            จำนวน: {item.pcs}
          </Text>
          <CustomButton
            variant={item.btnColor ?? "primary"}
            title="สั่งซื้อ"
            size={item.btnSize ?? "sm"}
            onPress={() => alert("สั่งซื้อแล้ว")}
          />
        </View>
      )}
    />
  );
};
