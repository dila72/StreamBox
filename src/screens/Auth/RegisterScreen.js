import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, ScrollView, Platform, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { registerUser, clearError } from '../../store/authSlice';
import { validateField, registerSchema } from '../../utils/validation';
import { useTheme } from '../../hooks/useTheme';

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const colors = theme.colors;

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', username: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
      dispatch(clearError());
    }
  }, [error]);

  const handleInputChange = async (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    
    // For confirmPassword, validate with the full form context including password
    if (field === 'confirmPassword') {
      try {
        await registerSchema.validateAt('confirmPassword', updatedFormData);
        setErrors({ ...errors, confirmPassword: '' });
      } catch (err) {
        setErrors({ ...errors, confirmPassword: err.message });
      }
    } else {
      // For other fields, validate individually
      const fieldValidation = await validateField(registerSchema, field, value);
      setErrors({ ...errors, [field]: fieldValidation.error });
      
      // If password changes and confirmPassword has a value, revalidate confirmPassword
      if (field === 'password' && updatedFormData.confirmPassword) {
        try {
          await registerSchema.validateAt('confirmPassword', updatedFormData);
          setErrors((prev) => ({ ...prev, [field]: fieldValidation.error, confirmPassword: '' }));
        } catch (err) {
          setErrors((prev) => ({ ...prev, [field]: fieldValidation.error, confirmPassword: err.message }));
        }
      }
    }
  };

  const handleRegister = async () => {
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(registerUser(formData));
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const renderInput = (field, placeholder, icon, secureTextEntry = false, showToggle = false) => (
    <View style={styles.inputContainer}>
      <View style={[styles.inputWrapper, { backgroundColor: colors.card, borderColor: colors.border }, errors[field] && styles.inputError]}>
        <Feather name={icon} size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          secureTextEntry={secureTextEntry && (field === 'password' ? !showPassword : !showConfirmPassword)}
          autoCapitalize={field === 'email' || field === 'username' ? 'none' : 'words'}
        />
        {showToggle && (
          <TouchableOpacity onPress={() => field === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}>
            <Feather name={(field === 'password' ? showPassword : showConfirmPassword) ? 'eye-off' : 'eye'} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {errors[field] && <Text style={[styles.errorText, { color: colors.error }]}>{errors[field]}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.background }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Feather name="user-plus" size={50} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Join StreamBox Today</Text>
        </View>

        <View style={styles.form}>
          {renderInput('firstName', 'First Name', 'user')}
          {renderInput('lastName', 'Last Name', 'user')}
          {renderInput('email', 'Email', 'mail')}
          {renderInput('username', 'Username', 'at-sign')}
          {renderInput('password', 'Password', 'lock', true, true)}
          {renderInput('confirmPassword', 'Confirm Password', 'lock', true, true)}

          <TouchableOpacity style={[styles.registerButton, { backgroundColor: colors.primary }]} onPress={handleRegister} disabled={isLoading}>
            <Text style={styles.buttonText}>{isLoading ? 'Creating Account...' : 'Register'}</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 16 },
  subtitle: { fontSize: 14, marginTop: 8 },
  form: { width: '100%' },
  inputContainer: { marginBottom: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  input: { flex: 1, marginLeft: 12, fontSize: 16 },
  inputError: { borderColor: '#ef4444' },
  errorText: { fontSize: 11, marginTop: 4, marginLeft: 4 },
  registerButton: { borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { fontSize: 14 },
  loginLink: { fontSize: 14, fontWeight: '600' },
});