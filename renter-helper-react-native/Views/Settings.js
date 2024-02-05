import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [accountType, setAccountType] = useState('homeowner'); // 'homeowner' or 'renter'
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [bio, setBio] = useState("About Me...");
    const [tempBio, setTempBio] = useState(bio);
    const [homeInfo, setHomeInfo] = useState({
        address: '1',
        price: '2',
        bedrooms: '3',
        bathrooms: '4',
        petPolicy: '5',
        smokingPolicy: '6',
        availability: '7',
        leaseLength: '8',
        images: [] // Assuming this would be an array of image URIs
    });
    const [renterInfo, setRenterInfo] = useState({
        name: '',
        age: '',
        pronouns: '',
        noiseLevel: '',
        peopleFrequency: '',
        pets: '',
        smoking: '',
        tidiness: '',
        sleepingSchedule: '',
        bio: '',
        profilePictures: [] // Assuming this would be an URI
    });

    const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);
    const toggleEditProfile = () => {
        setIsEditingProfile(!isEditingProfile);
        setTempBio(bio); // Reset tempBio to current bio when starting to edit
    };

    const saveProfile = () => {
        setBio(tempBio);
        setIsEditingProfile(false);
    };
    
    const handleHomeInfoChange = (name, value) => {
        setHomeInfo({ ...homeInfo, [name]: value });
    };
    const handleRenterInfoChange = (name, value) => {
        setRenterInfo({ ...renterInfo, [name]: value });
    };

    const pickImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
        });
    
        if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            if (uri) {
                setHomeInfo({ ...homeInfo, images: [...homeInfo.images, uri] });
            }
        }
    };

    const ImagesDisplay = () => {
        if (homeInfo.images.length === 0) {
            return <Text>No images yet :(</Text>;
        }
    
        return homeInfo.images.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: imageUri }} style={styles.image} />
            </View>
        ));
    };

    const HomeownerForm = () => (
        <>
            {/* Include other fields like price, bedrooms, bathrooms, etc. */}
            <View style={styles.imagesSection}>
                <Text style={styles.sectionTitle}>Home Images:</Text>
                <ImagesDisplay />
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Add Image</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text>Address:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.address}
                    onChangeText={(value) => handleHomeInfoChange('address', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Price:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.price}
                    onChangeText={(value) => handleHomeInfoChange('price', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Bedrooms:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.bedrooms}
                    onChangeText={(value) => handleHomeInfoChange('bedrooms', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Bathrooms:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.bathrooms}
                    onChangeText={(value) => handleHomeInfoChange('bathrooms', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Pet Policy:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.petPolicy}
                    onChangeText={(value) => handleHomeInfoChange('petPolicy', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Smoking Policy:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.smokingPolicy}
                    onChangeText={(value) => handleHomeInfoChange('smokingPolicy', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Availability:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.availability}
                    onChangeText={(value) => handleHomeInfoChange('Availability', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Lease Length:</Text>
                <TextInput
                    style={styles.input}
                    value={homeInfo.leaseLength}
                    onChangeText={(value) => handleHomeInfoChange('leaseLength', value)}
                />
            </View>
            {/* Add other homeowner-specific input fields here */}
        </>
    );

    const RenterForm = () => (
        <>
            {/* Include other fields like age, pronouns, noise level, etc. */}
            <View style={styles.inputContainer}>
                <Text>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={renterInfo.name}
                    onChangeText={(value) => handleRenterInfoChange('name', value)}
                />
            </View>
            {/* Add other renter-specific input fields here */}
        </>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <TouchableOpacity style={styles.button} onPress={toggleEditProfile}>
                    <Text style={styles.buttonText}>{isEditingProfile ? 'Close' : 'Edit Profile'}</Text>
                </TouchableOpacity>

                {isEditingProfile && (
                    <>
                        {accountType === 'homeowner' && <HomeownerForm />}
                        {accountType === 'renter' && <RenterForm />}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTempBio}
                                value={tempBio}
                                multiline
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={saveProfile}>
                            <Text style={styles.buttonText}>Save Info</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notification Settings</Text>
                <View style={styles.switchRow}>
                    <Text style={styles.switchText}>Enable Notifications</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={notificationsEnabled}
                    />
                </View>
            </View>

            {/* Additional settings sections can be added here */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    switchText: {
        fontSize: 16,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    input: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "#fe5166",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    imagesSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageContainer: {
        width: '30%', // Adjust the size as needed
        aspectRatio: 1, // Keep the aspect ratio of the images
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export { Settings };
