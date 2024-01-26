import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";

function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [showDistanceInMiles, setShowDistanceInMiles] = useState(true);
    const [bio, setBio] = useState("About Me...");

    const toggleSwitch = () =>
        setNotificationsEnabled((previousState) => !previousState);
    const toggleDistanceUnit = () =>
        setShowDistanceInMiles((previousState) => !previousState);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setBio}
                value={bio}
                multiline
            />
            </View>
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
        </View>
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
});

export { Settings };
