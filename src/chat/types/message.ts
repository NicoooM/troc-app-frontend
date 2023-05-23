import { UserType } from "../../app/types/user";

export type CreateMessage = {
  content: string;
  receiver: number;
};

export type MessageType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  sender: UserType;
};
