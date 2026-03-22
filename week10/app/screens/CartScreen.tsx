import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../redux/work1/cartSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";

const CartScreen = () => {
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (!name || !price || !amount) return;

    dispatch(
      addItem({
        id: Date.now().toString(),
        name,
        price: Number(price),
        quantity: Number(amount),
      }),
    );

    setName("");
    setPrice("");
    setAmount("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.inputBox}
      />

      <TextInput
        placeholder="จำนวน"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.inputBox}
      />
      <Button title="เพิ่มลงตะกร้า" onPress={handleAdd} />

      {items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                {item.name} x {item.quantity} ราคาต่อจำนวน {item.price}
              </Text>

              <Button
                title="ลบ"
                onPress={() => dispatch(removeItem(item.id))}
              />
            </View>
          )}
        />
      )}

      {/* 🔹 ยอดรวม */}
      <Text style={{ fontSize: 18, marginTop: 20 }}>รวม: {totalAmount}</Text>

      <Button title="ล้างตะกร้า" onPress={() => dispatch(clearCart())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  countText: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputBox: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 6,
    width: "100%",
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 10,
  },
});

export default CartScreen;
