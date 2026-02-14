import React from "react";
import { Pressable, Text, View } from "react-native";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}

export default function RadioButton({
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <View className="mb-4">
      <Text className="font-medium mb-2">{label}</Text>

      <View className="flex-row gap-6">
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className="flex-row items-center"
          >
            <View
              className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${
                value === opt.value ? "border-blue-600" : "border-gray-400"
              }`}
            >
              {value === opt.value && (
                <View className="w-3 h-3 bg-blue-600 rounded-full" />
              )}
            </View>
            <Text>{opt.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
