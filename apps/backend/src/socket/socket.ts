import { Server } from "socket.io";

export let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://vedaai-frontend-six.vercel.app",
        /\.vercel\.app$/
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join:job", (jobId: string) => {
      socket.join(`job:${jobId}`);
      console.log(`Socket ${socket.id} joined room job:${jobId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};