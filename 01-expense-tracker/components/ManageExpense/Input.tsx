import { GlobalStyles } from "../../constants/styles";
import { ViewStyle } from "react-native";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleSheet,
  TextStyle,
} from "react-native";

interface InputProps {
  label: string;
  textInputConfig: TextInputProps;
  style?: ViewStyle;
  isValid?: boolean;
}
const Input: React.FC<InputProps> = ({
  label,
  textInputConfig,
  style,
  isValid,
}) => {
  var inputStyle: TextStyle[] = [styles.textInput];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[inputStyle, !isValid && styles.invalidInputHighlight]}
          {...textInputConfig}
        />
        {!isValid && <Text style={styles.errorLabel}>{label} is invalid</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 15,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidInputHighlight: {
    backgroundColor: GlobalStyles.colors.error50,
    borderWidth: 1,
  },
  errorLabel: {
    color: "red",
    fontSize: 15,
  },
});
export default Input;
