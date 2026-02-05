import { useState } from "react";
import { Text, View } from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomInput } from "./CustomInput";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pcs, setPcs] = useState("");
  
  return (
    <View className="bg-white p-2 gap-3">
      <Text className="font-bold text-2xl mb-3">กรอกข้อมูลสินค้า</Text>
      <CustomInput
        label="ชื่อสินค้า"
        value={name}
        placeholder="กรอกชื่อสินค้า"
        onChangeText={setName}
      />
      <CustomInput
        label="ราคา"
        value={price}
        placeholder="ราคาสินค้า"
        onChangeText={setPrice}
      />
      <CustomInput
        label="จำนวน"
        value={pcs}
        placeholder="กรอกชื่อสินค้า"
        onChangeText={setPcs}
      />
      <CustomButton
        title="สั่งซื้อ"
        variant="primary"
        size="md"
        onPress={() => alert("สั่งซื้อสินค้าสำเร็จ")}
      />
    </View>
  );
};
