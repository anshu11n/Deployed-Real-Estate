import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import paymentRoute from "./routes/payment.route.js";
import bookRoute from "./routes/book.route.js"



const app = express();

app.use(cors({ 
  origin: ["http://localhost:5173", "https://deployed-real-estate.onrender.com"],
  credentials: true, 
  methods: 'GET,HEAD,PATCH,PUT,POST,DELETE', 
  allowedHeaders: 'Content-Type,Authorization' 
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/book", bookRoute);


app.listen(8800, () => {
  console.log("Server is running!");
});
