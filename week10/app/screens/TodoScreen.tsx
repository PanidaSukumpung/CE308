import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addTodo,
  toggleTodo,
  removeTodo,
} from "../redux/work2/todoSlice";

export default function TodoScreen() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todo);

  const [text, setText] = useState("");

  // เพิ่มงาน
  const handleAdd = () => {
    if (!text) return;

    dispatch(
      addTodo({
        id: Date.now().toString(),
        text: text,
        completed: false,
      })
    );

    setText("");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Todo List</Text>

      {/* input */}
      <TextInput
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          padding: 8,
          marginVertical: 10,
        }}
      />

      <Button title="เพิ่มงาน" onPress={handleAdd} />

      {/* list */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            {/* ✅ กดเพื่อ toggle */}
            <Pressable onPress={() => dispatch(toggleTodo(item.id))}>
              <Text
                style={{
                  textDecorationLine: item.completed
                    ? "line-through"
                    : "none",
                }}
              >
                {item.text}
              </Text>
            </Pressable>

            <Button
              title="ลบ"
              onPress={() => dispatch(removeTodo(item.id))}
            />
          </View>
        )}
      />

      {/* จำนวนงาน */}
      <Text style={{ marginTop: 20 }}>
        จำนวนงานทั้งหมด: {todos.length}
      </Text>
    </View>
  );
}