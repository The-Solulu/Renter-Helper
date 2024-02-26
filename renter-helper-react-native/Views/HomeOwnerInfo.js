import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function HomeOwnerInfo({ setIsSignedOn }) {
  const questions = [
    { key: 'fullName', question: 'Full Name' },
    { key: 'address', question: 'Address' },
    { key: 'email', question: 'Email' },
    { key: 'phoneNumber', question: 'Phone Number' },
    { key: 'propertyType', question: 'Property Type' },
    { key: 'propertySize', question: 'Property Size' },
  ];

  const [answers, setAnswers] = React.useState({});

  const handleInputChange = (key, text) => {
    const updatedAnswers = { ...answers, [key]: text };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log('Answers:', answers);
    setIsSignedOn(true);
    // You can save the answers to a database or perform any other action here
  };

  return (
    <View style={styles.container}>
      {questions.map(({ key, question }) => (
        <View key={key} style={styles.questionContainer}>
          <Text style={styles.title}>{question}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${question}`}
            onChangeText={(text) => handleInputChange(key, text)}
            value={answers[key]}
          />
        </View>
      ))}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EAF6FF', // Light blue background color
  },
  questionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF', // White input background color
  },
});

export default HomeOwnerInfo;
