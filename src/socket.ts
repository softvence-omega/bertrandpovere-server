// socket.ts
import { Server, Socket } from "socket.io";
import { configs } from "./app/configs";
import { jwtHelpers } from "./app/utils/JWT";

type SocketInfo = {
  userId: string,
  socketId: string
}
type Message = {
  senderId: string,
  receiverId: string,
  message: string
}
const messages: Message[] = []
// Map of accountId => socketId
export const onlineUsersByEmail = new Map<string, SocketInfo>();
export const onlineUsersBySocket = new Map<string, SocketInfo>();


let io: Server;

export function setupSocket(_io: Server) {
  io = _io;

  io.on("connection", (socket: Socket) => {
    if ((socket?.handshake?.query?.token as string)?.length > 0) {
      const verifiedUser = jwtHelpers?.verifyToken(
        socket?.handshake?.query?.token as string,
        configs.jwt.access_token as string,
      );
      onlineUsersByEmail.set(verifiedUser.email, { userId: verifiedUser.userId, socketId: socket.id });
      onlineUsersBySocket.set(socket.id, { userId: verifiedUser.userId, socketId: socket.id });
    }

    socket.on("online-user", ({ email }) => {
      const userStatus = onlineUsersByEmail.get(email);
      socket.emit("online-user", userStatus);
      socket.to(userStatus?.socketId as string).emit("online-user", userStatus);
    });


    // Handle disconnect
    socket.on("disconnect", () => {
    });
  });
}

/**
 * Getter to use io in other files
 */
export function getIO() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}
