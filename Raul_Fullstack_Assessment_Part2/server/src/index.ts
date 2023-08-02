import express, { Request, Response } from "express";
const cors = require("cors");
import { DataSource, DataSourceOptions } from "typeorm";
import { Person } from "./entity/Person";
import { readFileSync } from "fs";
import { join } from "path";

const app = express();
const PORT = process.env.PORT || 3000;

let dataSource: DataSource;

const options: DataSourceOptions = JSON.parse(
  readFileSync(join(__dirname, "../ormconfig.json"), "utf8")
);
dataSource = new DataSource(options);

dataSource.connect().then(() => {
  dataSource.synchronize().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
});

app.use(express.json());
app.use(cors());

const personRepo = dataSource.getRepository(Person);

app.get("/awesome/applicant/:id", async (req: Request, res: Response) => {
  const person = await personRepo.findOneBy({
    id: parseInt(req.params.id, 10),
  });
  return res.json(person);
});

app.post("/awesome/applicant", async (req: Request, res: Response) => {
  const newPerson = personRepo.create(req.body);
  await personRepo.save(newPerson);
  return res.status(201).json(newPerson);
});

app.put("/awesome/applicant/:id", async (req: Request, res: Response) => {
  const person = await personRepo.findOneBy({
    id: parseInt(req.params.id, 10),
  });

  if (!person) return res.status(404).json({ message: "Person not found" });

  personRepo.merge(person, req.body);
  const results = await personRepo.save(person);
  return res.json(results);
});

app.delete("/awesome/applicant/:id", async (req: Request, res: Response) => {
  const person = await personRepo.findOneBy({
    id: parseInt(req.params.id, 10),
  });

  if (!person) return res.status(404).json({ message: "Person not found" });

  await personRepo.delete(person);
  return res.status(204).json({ message: "Deleted" });
});

export default app;
