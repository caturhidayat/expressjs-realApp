import { Router } from "express";

const main = Router();

const users = [
    {
        username: "Catur Hidayat",
        role: "dev"
    },
    {
        username: "Rina Pratiwi",
        role: "CS"
    }
]

main.get("/", async (req, res) => {
    res.render('index', {users: users});
});

export { main };
