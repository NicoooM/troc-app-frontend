import io from "socket.io-client";
import { getTokenFromCookie } from "./authorizations";

const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", {
  extraHeaders: {
    token: getTokenFromCookie(),
  },
});

export default socket;
