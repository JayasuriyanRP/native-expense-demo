import { KeyboardTypeOptions, ViewStyle } from "react-native";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import { Colors } from "../../constants/styles";

interface InputProps {
  label: string;
  keyboardType: KeyboardTypeOptions;
  isSecureText: boolean;
  onUpdateValue: (updatedText: string) => void;
  value: string;
  isInvalid: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  keyboardType,
  isSecureText,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={isSecureText}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
export default Input;
