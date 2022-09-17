import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TextInput,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import IconButton from "../UI/IconButton";
import DatePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface DatePickerInputProps {
  label: string;
  textInputConfig: TextInputProps;
  style?: ViewStyle;
  isValid?: boolean;
  onValueChange: (date: string) => void;
}

const DatePickerInput: FC<DatePickerInputProps> = ({
  label,
  textInputConfig,
  style,
  isValid,
  onValueChange,
}) => {
  var inputStyle: TextStyle[] = [styles.textInput];
  const [show, setShow] = useState(false);

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  function handleDateSelection(event: DateTimePickerEvent, date?: Date) {
    setShow(false);
    onValueChange(
      date?.toISOString().slice(0, 10) || new Date().toISOString().slice(0, 10)
    );
  }
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TextInput
            style={[inputStyle, !isValid && styles.invalidInputHighlight]}
            {...textInputConfig}
            editable={false}
          />
          <IconButton
            iconName={"calendar"}
            size={25}
            color={GlobalStyles.colors.primary50}
            onPress={() => {
              setShow(true);
            }}
          ></IconButton>
          {show && (
            <DatePicker
              value={new Date(textInputConfig.value || "")}
              mode={"date"}
              display={"calendar"}
              onChange={handleDateSelection.bind(this)}
              style={styles.datePickerStyle}
            />
          )}
        </View>
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
  datePickerStyle: {
    backgroundColor: GlobalStyles.colors.primary500,
    color: GlobalStyles.colors.primary400,
  },
});

export default DatePickerInput;
