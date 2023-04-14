import { Message } from "./message";
import { UserType } from "./user";

export type Room = {
  id: number;
  latestMessage: Message;
  otherUser: UserType;
};
