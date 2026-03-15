import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hotel-booking-website-mocha.vercel.app/api/v1/",
});

export default apiClient;