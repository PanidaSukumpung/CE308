import { Provider } from "react-redux";
import { store } from "./redux/store";
import CounterScreen from "./screens/CounterScreen";
import CartScreen from "./screens/CartScreen";
import TodoScreen from "./screens/TodoScreen";

export default function Index() {
  return (
    <Provider store={store}>
      <TodoScreen />
    </Provider>
  );
}
