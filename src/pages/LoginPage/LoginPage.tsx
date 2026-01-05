import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginPage: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Placeholder for actual login logic
    console.log('Attempting to log in');
    // Navigate to the main application page (e.g., TabNavigator or FeedScreen)
    // Assuming 'TabNavigator' is the name of the main navigation component
    // navigation.navigate('TabNavigator'); 
    // Since we don't have the exact main route name, let's navigate back or to a placeholder if needed.
  };

  const handleForgotPassword = () => {
    // Navigate to Forgot Password screen
    // navigation.navigate('ForgotPassword'); 
    console.log('Forgot password pressed');
  };

  const handleCreateNewAccount = () => {
    // Navigate to Registration screen
    // navigation.navigate('RegisterScreen'); 
    console.log('Create new account pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="facebook" size={80} color="#1877F2" />
        <Text style={styles.appName}>facebook</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="رقم الهاتف أو البريد الإلكتروني"
          placeholderTextColor="#606770"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="كلمة السر"
          placeholderTextColor="#606770"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>نسيت كلمة السر؟</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>أو</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateNewAccount}>
          <Text style={styles.createAccountButtonText}>إنشاء حساب جديد</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.languageSelector}>
          <Text style={styles.languageText}>العربية</Text>
          <Text style={[styles.languageText, { color: '#90949c' }]}>English (US)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1877F2',
    marginTop: 10,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'right', // For RTL support (Arabic)
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#1877F2',
    fontSize: 14,
    marginBottom: 30,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#dadde1',
  },
  orText: {
    color: '#606770',
    fontSize: 14,
    marginHorizontal: 10,
  },
  createAccountButton: {
    width: '70%',
    backgroundColor: '#42b72a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  languageText: {
    fontSize: 12,
    marginHorizontal: 10,
    color: '#1877F2',
  }
});

export default LoginPage;