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
    console.log(socket.id)
    if (socket.handshake.query?.token) {
      const verifiedUser = jwtHelpers.verifyToken(
        socket.handshake.query?.token as string,
        configs.jwt.access_token as string,
      );
      onlineUsersByEmail.set(verifiedUser.email, { userId: verifiedUser.userId, socketId: socket.id });
      onlineUsersBySocket.set(socket.id, { userId: verifiedUser.userId, socketId: socket.id });
      console.log(verifiedUser.email, { userId: verifiedUser.userId, socketId: socket.id })
    }

    socket.on("online-user", ({ email }) => {
      const userStatus = onlineUsersByEmail.get(email);
      socket.emit("online-user", userStatus);
      socket.to(userStatus?.socketId as string).emit("online-user", userStatus);
    });

    socket.on("send-message", ({ email, message }) => {
      const userStatus = onlineUsersByEmail.get(email);
      const senderInfo = onlineUsersBySocket.get(socket?.id);

      const newMessage: Message = {
        senderId: senderInfo?.userId as string,
        receiverId: userStatus?.userId as string,
        message: message
      }
      messages.push(newMessage);
      socket.emit("send-message", messages);
      socket.to(userStatus?.socketId as string).emit("send-message", messages);
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
