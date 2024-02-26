import React from 'react';
import { ScrollView, Button, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import {new_person_with} from '../Backend/firebase.js';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import an icon from react-native-vector-icons

function create_user_with(data) {
    const name = data["Full Name"];
    const bed_time = data["Bed Time"];
    const bio = data["Profile Bio"];
    const guests = parseInt(data["Max number of guests"]);
    const interests = data["Interests"];
    const major = "Computer Science";
    const noise = data["Noise Level"];
    const pets = data["Are you ok with pets?"];
    const pronouns = data["Pronouns"];
    const roommates = data["Roommates"];
    const smoke = data["Do you smoke?"];
    const wake_time = data["Wake Up Time"];
    const tidiness = data["Tidiness"];

    console.log(data);
    // new_person_with(name, bed_time, bio, guests, imageUri, interests, major, noise_level, pets, pronouns, roommates, smoking, wake_time, tidiness) 
    
}

function RenterInfo({ setIsSignedOn }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => setIsSignedOn(true);
//   console.log(errors);

  const handleScroll = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when scrolling
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} onTouchStart={handleScroll}>
        <Text style={styles.title}>Renter Information</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="Full Name"
              rules={{ required: true }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Pronouns"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="Pronouns"
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Profile Bio"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="Profile Bio"
            />
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Major"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="Major"
            />
          </View>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Interests"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              )}
              name="Interests"
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Bed Time"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="Bed Time"
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Wake Up Time"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="Wake Up Time"
            />
          </View>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Max number of guests"
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="Max number of guests"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Noise Level</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  <Picker.Item label="" value="" />
                  <Picker.Item label="Quiet" value="Quiet" />
                  <Picker.Item label="Conversational" value="Conversational" />
                  <Picker.Item label="Loud" value="Loud" />
                  <Picker.Item label="Very Loud" value="Very Loud" />
                </Picker>
              )}
              name="Noise Level"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Are you ok with pets?</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  <Picker.Item label="" value="" />

                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              )}
              name="Are you ok with pets?"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Do you smoke?</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  <Picker.Item label="" value="" />

                  <Picker.Item label="Yes" value="Yes" />
                  <Picker.Item label="No" value="No" />
                </Picker>
              )}
              name="Do you smoke?"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Roommates</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  <Picker.Item label="" value="" />

                  <Picker.Item label="Single" value="Single" />
                  <Picker.Item label="Double" value="Double" />
                  <Picker.Item label="Triple" value="Triple" />
                  <Picker.Item label="Quad" value="Quad" />
                </Picker>
              )}
              name="Roommates"
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Tidiness</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  style={styles.picker}
                  selectedValue={value}
                  onValueChange={value => onChange(value)}
                >
                  <Picker.Item label="" value="" />

                  <Picker.Item label="Very" value="Very" />
                  <Picker.Item label="Average" value="Average" />
                  <Picker.Item label="Fair" value="Fair" />
                  <Picker.Item label="Chaos" value="Chaos" />
                </Picker>
              )}
              name="Tidiness"
            />
          </View>

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 2,
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: '#333',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    marginBottom: 5,
    color: '#333',
    fontSize: 16,
  },
  picker: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    color: '#333',
  },
});

export default RenterInfo;
