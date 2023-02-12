import { Router } from "express";

const main = Router();

main.get("/", (req, res) => {
  res.render('home', { meessage: 'Bulma ⚡️'});
});

export { main };
