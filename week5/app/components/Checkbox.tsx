import { Pressable, Text, View } from "react-native";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  touched?: boolean;
}

export default function Checkbox({
  checked,
  onChange,
  error,
  touched,
}: Props) {
  return (
    <View className="mb-4">
      <Pressable
        onPress={() => onChange(!checked)}
        className="flex-row items-center"
      >
        <View
          className={`
            w-5 h-5 border-2 rounded mr-3 items-center justify-center
            ${checked ? "bg-blue-600 border-blue-600" : "border-gray-400"}
          `}
        >
          {checked && <Text className="text-white text-xs">✓</Text>}
        </View>

        <Text className="text-gray-700">
          ฉันยอมรับข้อกำหนดและเงื่อนไข
        </Text>
      </Pressable>

      {touched && error && (
        <Text className="text-red-500 text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
