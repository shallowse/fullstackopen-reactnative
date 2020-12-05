import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.KEY = `${this.namespace}:accessToken`;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(this.KEY);

    return accessToken ? JSON.parse(accessToken) : '';
  }

  // Default beaviour is to always overwrite
  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      this.KEY,
      JSON.stringify(accessToken),
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.KEY);
  }
}

export default AuthStorage;