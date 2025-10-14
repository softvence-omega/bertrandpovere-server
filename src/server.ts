
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app";
import { configs } from "./app/configs";
import { setupSocket } from "./socket";
let io: Server;

const server = http.createServer(app);
io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    },
});

// setup socket ONCE
setupSocket(io);

async function main() {
    await mongoose.connect(configs.db_url!);
    server.listen(configs.port, () => {
        console.log(`APP NAME server app listening on port ${configs.port}`);
    });
}
main().catch(err => console.log(err));
