import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Stockage en mémoire (à remplacer par une vraie base si besoin)
const garlicValues: number[] = [];

// Endpoint pour soumettre une nouvelle valeur
app.post("/submit", (req, res) => {
  const { value } = req.body;
  if (typeof value === "number" && value >= 0 && value <= 100) {
    garlicValues.push(value);
    res.status(200).json({ message: "Valeur enregistrée." });
  } else {
    res.status(400).json({ error: "Valeur invalide." });
  }
});

// Endpoint pour obtenir la moyenne actuelle
app.get("/average", (_req, res) => {
  const total = garlicValues.reduce((acc, val) => acc + val, 0);
  const average = garlicValues.length > 0 ? total / garlicValues.length : 0;
  res.json({ average: Math.round(average) });
});

app.listen(port, () => {
  console.log(`Aillomètre backend lancé sur http://localhost:${port}`);
});
