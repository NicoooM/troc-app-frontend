import { getRequest } from "../utils/useApi";

export const getAllRooms = async (): Promise<any> => {
  const response = await getRequest("/rooms");
  return response.data;
};

export const getOneRoom = async (id: number): Promise<any> => {
  const response = await getRequest(`/rooms/one/?receiverId=${id}`);
  return response.data;
};
