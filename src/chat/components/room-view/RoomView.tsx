import { Room } from "@/src/types/room";
import styles from "./RoomView.module.scss";

type Props = {
  currentRoom: Room;
};

const RoomView = ({ currentRoom }: Props) => {
  console.log(currentRoom);
  return <h3>Room View</h3>;
};

export default RoomView;
