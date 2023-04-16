import { MessageType } from "./message";
import { UserType } from "./user";

export type RoomPreviewType = {
  id: number;
  latestMessage: MessageType;
  otherUser: UserType;
};

export type Room = {
  id: number;
  messages: MessageType[];
  otherUser: UserType;
};
