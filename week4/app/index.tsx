import { Text } from "react-native";
import { CenteredView } from "./component/CenteredView";
import type { Item } from "./component/ItemList";
import { ItemList } from "./component/ItemList";
import { ProductForm } from "./component/ProductForm";
import "./global.css";
export default function Index() {
  const data: Item[] = [
    {
      id: "1",
      title: "Apple",
      price: 1000,
      pcs: 3,
      btnSize: "sm",
      btnColor: "primary",
    },
    {
      id: "2",
      title: "Banana",
      price: 2000,
      pcs: 5,
      btnSize: "md",
      btnColor: "secondary",
    },
    {
      id: "3",
      title: "Mango",
      price: 1500,
      pcs: 9,
      btnSize: "lg",
      btnColor: "danger",
    },
  ];
  return (
    <CenteredView backgroundColor="bg-blue-100">
      <Text className="text-blue-600 font-bold">Hello NativeWind</Text>
      <ItemList items={data} />
      <ProductForm />
    </CenteredView>
  );
}
