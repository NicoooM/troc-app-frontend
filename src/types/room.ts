import { Message } from "./message";
import { UserType } from "./user";

export type RoomPreviewType = {
  id: number;
  latestMessage: Message;
  otherUser: UserType;
};

export type Room = {
  id: number;
  messages: Message[];
  otherUser: UserType;
};
