import { Text, TextInput, View } from "react-native";
type CustomInputProp = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
};

export const CustomInput = ({
  label,
  value,
  placeholder,
  onChangeText,
}: CustomInputProp) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        className="bg-gray-200 rounded-xl p-2 border shadow-md"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
    </View>
  );
};
