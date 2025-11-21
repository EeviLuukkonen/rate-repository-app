import Text from './Text';
import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { formStyles } from './SignIn';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
    .optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const review = {
      ownerName: values.ownerName,
      repositoryName: values.repositoryName,
      rating: parseInt(values.rating, 10),
      text: values.text,
    };

    console.log('Submitting review:', review);
    
    try {
      const result = await createReview(
        { variables: { review } }
      );
      navigate(`/${result.data.createReview.repositoryId}`);
    } catch (e) {
      console.error('Error creating review:', e);
      console.error('graphQLErrors:', e.graphQLErrors);
      console.error('networkError:', e.networkError && e.networkError.result);
    }
  };
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
 
  return (
    <View style={formStyles.container}>
      <View style={[
        formStyles.inputField,
        formik.touched.ownerName && formik.errors.ownerName && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
        />
      </View>
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={formStyles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <View style={[
        formStyles.inputField,
        formik.touched.repositoryName && formik.errors.repositoryName && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
        />
      </View>
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={formStyles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <View style={[
        formStyles.inputField,
        formik.touched.rating && formik.errors.rating && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          keyboardType="numeric"
        />
      </View>
      {formik.touched.rating && formik.errors.rating && (
        <Text style={formStyles.errorText}>{formik.errors.rating}</Text>
      )}

      <View style={[
        formStyles.inputField,
        formik.touched.text && formik.errors.text && formStyles.inputError
      ]}>
        <TextInput
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          multiline
        />
      </View>
      {formik.touched.text && formik.errors.text && (
        <Text style={formStyles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={formStyles.button}>
        <Text style={formStyles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;