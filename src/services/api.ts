import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 100000,
});

export const extractIntent = (payload: { text: string }) =>
  apiClient.post("/motives/extract", payload);

export const performAction = (type: string, payload: unknown) =>
  apiClient.post(`/actions/${type}`, payload);

export const registerUser = (payload: { userId: string; email: string }) =>
  apiClient.post("/accounts/register", payload);
export const getGraph = () => apiClient.get("/graph");
export default apiClient;
