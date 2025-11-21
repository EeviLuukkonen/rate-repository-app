import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

export const formStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15, // space inside the box
  },
  inputField: {
    borderRadius: 3, // round corners
    padding: 10, // space inside the box
    marginTop: 15, // space outside the box
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginTop: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 3,
    alignItems: 'center', // center text horizontally
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character long')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={formStyles.container}>

      <View style={[
        formStyles.inputField,
        formik.touched.username && formik.errors.username && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
      </View>
      {formik.touched.username && formik.errors.username && (
        <Text style={formStyles.errorText}>{formik.errors.username}</Text>
      )}

      <View style={[
        formStyles.inputField,
        formik.touched.password && formik.errors.password && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={formStyles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={formStyles.button}>
        <Text style={formStyles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;