import axios from "axios";
import { AsyncStorage } from "react-native";
import { environment } from "./env";

const instance = axios.create({
  baseURL: environment[process.env.NODE_ENV]
});
instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
