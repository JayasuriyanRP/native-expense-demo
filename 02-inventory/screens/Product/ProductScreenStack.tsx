import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "./ProductScreen";
import ProductDetailedViewScreen from "./ProductDetailedViewScreen";
import NewProductScreen from "./NewProductScreen";

const ProductStack = createNativeStackNavigator();

const ProductScreenStack = () => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#DDDDDD",
        },
        headerTitleAlign: "center",
      }}
    >
      <ProductStack.Screen name="Products" component={ProductScreen} />
      <ProductStack.Screen name="Info" component={ProductDetailedViewScreen} />
      <ProductStack.Screen name="AddProduct" component={NewProductScreen} />
    </ProductStack.Navigator>
  );
};

export default ProductScreenStack;

export type ProductStackParamList = {
  Products: undefined;
  Info: undefined;
  AddProduct: undefined;
};
