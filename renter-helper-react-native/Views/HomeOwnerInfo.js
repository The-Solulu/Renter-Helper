import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function HomeOwnerInfo() {
  const questions = [
    { key: 'fullName', question: 'Full Name' },
    { key: 'address', question: 'Address' },
    { key: 'email', question: 'Email' },
    { key: 'phoneNumber', question: 'Phone Number' },
    { key: 'propertyType', question: 'Property Type' },
    { key: 'propertySize', question: 'Property Size' },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save the answers
      console.log('Answers:', answers);
      // You can save the answers to a database or perform any other action here
    }
  };

  const handleInputChange = (text) => {
    const updatedAnswers = { ...answers, [questions[currentQuestionIndex].key]: text };
    setAnswers(updatedAnswers);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questions[currentQuestionIndex].question}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter ${questions[currentQuestionIndex].question}`}
        onChangeText={handleInputChange}
        value={answers[questions[currentQuestionIndex].key]}
      />
      <Button
        title={currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        onPress={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default HomeOwnerInfo;
