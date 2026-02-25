import express from 'express';
import cors from 'cors';
import router from "./router/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:63342",
    credentials: true
}));
app.use(router)



const PORT = Number(process.env.PORT) || 3008;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});