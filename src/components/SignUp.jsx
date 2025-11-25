import { View } from "react-native"
import Text from "./Text"
import { useFormik } from "formik"
import * as yup from 'yup'
import { formStyles } from "./SignIn"
import { TextInput, Pressable } from "react-native"
import { useMutation } from "@apollo/client"
import { SIGN_UP } from "../graphql/mutations"
import { useNavigate } from "react-router-native"
import useSignIn from "../hooks/useSignIn"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must be at most 50 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  username: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [signUp] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    try {
      await signUp({ variables: { user } });
      await signIn({ username: values.username, password: values.password });
      navigate('/');
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

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

      <View style={[
        formStyles.inputField,
        formik.touched.confirmPassword && formik.errors.confirmPassword && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChangeText={formik.handleChange('confirmPassword')}
          secureTextEntry
        />
      </View>
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={formStyles.errorText}>{formik.errors.confirmPassword}</Text>
      )}

      <Pressable style={formStyles.button} onPress={formik.handleSubmit}>
        <Text style={formStyles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp;