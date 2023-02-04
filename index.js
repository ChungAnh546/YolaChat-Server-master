const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const roomRoutes = require("./routes/room");
const friendRoutes = require("./routes/friend");
const requestFriendRoutes = require("./routes/requestFriend");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/room/", roomRoutes);
app.use("/api/friend/", friendRoutes);
app.use("/api/requestFriend/", requestFriendRoutes);

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();
global.addUser = new Map();
io.on("connection", (socket) => {
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        // console.log("Co nguoi online");
        onlineUsers.set(userId, socket.id);
    });

    socket.on("unfriend", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("un-friend", {
                data: data.to,
            });
        }
    });

    socket.on("add-into-list-friend", (data) => {
        console.log("add-into-list-friend");
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("list-friend-add-into", {
                data: data.to,
            });
        }
    });

    socket.on("reject-request-add-friend", (data) => {
        console.log("reject-request-add-friend");
        // console.log(data.to);
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log(sendUserSocket);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("add-friend-reject-request", {
                currentPhoneNumber: data.currentPhoneNumber,
            });
        }
    });

    socket.on("send-request-add-friend", (data) => {
        console.log("request-add-friend");
        console.log(data.response);
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("add-friend-request", {
                requestFriend: data.response,
            });
        }
    });

    socket.on("deleted-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-deleted", {
                id: data.id,
                to: data.to,
                from: data.from,
                deletedFromSelf: data.deletedFromSelf,
                deletedToAll: data.deletedToAll,
            });
        }
        if (data.to.length > 2) {
            for (let i = 0; i < data.to.length; i++) {
                const sendUserSocket = onlineUsers.get(data.to[i]);

                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-deleted", {
                        id: data.id,
                        to: data.to,
                        from: data.from,
                        deletedFromSelf: data.deletedFromSelf,
                        deletedToAll: data.deletedToAll,
                    });
                }
            }
        }
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        // console.log("Sender socket " + sendUserSocket);

        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", {
                id: data.id,
                msg: data.msg,
                react: data.react,
                namesend: data.namesend,
                avatarImage: data.avatarImage,
                files: data.files,
                image: data.image,
                deleteFromSelf: data.deleteFromSelf,
                deleteToAll: data.deleteToAll,
            });
        }

        if (data.to.length > 2) {
            for (let i = 0; i < data.to.length; i++) {
                const sendUserSocket = onlineUsers.get(data.to[i]);

                if (sendUserSocket) {
                    socket.to(sendUserSocket).emit("msg-recieve", {
                        image: data.image,
                        id: data.id,
                        msg: data.msg,
                        react: data.react,
                        namesend: data.namesend,
                        avatarImage: data.avatarImage,
                        files: data.files,
                    });
                }
            }
        }
    });
});
