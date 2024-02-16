import AsyncStorage from '@react-native-async-storage/async-storage';

const Status = {
    Fail: 0,
    Success: 1,
}

/**
 * 
 * @param {string} user_id 
 * @returns {Promise<Status>}
 */
export async function save_user(user_id) {
    try {
        await AsyncStorage.setItem('user_id', value);
        return Success;
    } catch (e) {
        return Fail;
    }
}

export async function get_user() {

}