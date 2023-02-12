import { Router } from "express";

const main = Router();

main.get("/", (req, res) => {
  res.render('index', { meessage: 'Bulma ⚡️'});
});

export { main };
