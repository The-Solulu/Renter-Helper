import AsyncStorage from '@react-native-async-storage/async-storage';

const Status = {
    Fail: 0,
    Success: 1,
}

class HomeOwner {
    constructor(address, price, bedrooms, bathrooms, petPolicy, smokingPolicy, availability, leaseLength, imageUrl) {
        this.address = address;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.petPolicy = petPolicy;
        this.smokingPolicy = smokingPolicy;
        this.availability = availability;
        this.leaseLength = leaseLength;
        this.imageUrl = imageUrl;
    }
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