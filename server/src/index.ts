import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Chemin vers le fichier JSON de stockage des valeurs d'ail
const garlicFilePath = path.join(__dirname, 'garlicValues.json');

// Fonction pour lire les valeurs du fichier
const readGarlicValues = (): number[] => {
  if (!fs.existsSync(garlicFilePath)) {
    fs.writeFileSync(garlicFilePath, JSON.stringify([])); // Créer le fichier s'il n'existe pas
  }
  const data = fs.readFileSync(garlicFilePath, 'utf8');
  return JSON.parse(data);
};

// Fonction pour écrire les valeurs dans le fichier
const writeGarlicValues = (values: number[]) => {
  fs.writeFileSync(garlicFilePath, JSON.stringify(values, null, 2));
};

// Endpoint pour soumettre une nouvelle valeur
app.post("/submit", (req, res) => {
  const { value } = req.body;
  if (typeof value === "number" && value >= 0 && value <= 100) {
    const garlicValues = readGarlicValues();
    garlicValues.push(value);
    writeGarlicValues(garlicValues);
    res.status(200).json({ message: "Valeur enregistrée." });
  } else {
    res.status(400).json({ error: "Valeur invalide." });
  }
});

// Endpoint pour obtenir la moyenne actuelle
app.get("/average", (_req, res) => {
  const garlicValues = readGarlicValues();
  const total = garlicValues.reduce((acc, val) => acc + val, 0);
  const average = garlicValues.length > 0 ? total / garlicValues.length : 0;
  res.json({ average: Math.round(average) });
});

app.listen(port, () => {
  console.log(`Aillomètre backend lancé sur http://localhost:${port}`);
});
