import { Router } from "express";

const main = Router();

main.get("/", (req, res) => {
    res.send(`Home Page via route export 🎉`);
});

export { main };
