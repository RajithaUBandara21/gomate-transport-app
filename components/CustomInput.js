// components/CustomInput.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

const CustomInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor: colors.input, borderColor: colors.border }]}>
        <Feather name={icon} size={20} color={colors.subtext} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.subtext}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
});

export default CustomInput;