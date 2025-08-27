import express from "express";
import connectDB from "./config/db.js";
import urlSchema from "./models/modelURL.js";
import { nanoid } from "nanoid";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //ini biar express bisa baca body json

//nandain kalo berhasil konek DB + show port
app.listen(PORT, () => {
  connectDB();
  console.log(`Server berjalan di port ${PORT}`);
});

//ini default route
app.get("/", (req, res) => {
  res.send("Aplikasi berjalan!");
});

//ini POST /shorten
app.post("/shorten", async (req, res) => {
  const { url: originalUrl } = req.body;

  try {
    const shortCode = nanoid(8);
    const inputDB = await urlSchema.create({
      url: originalUrl,
      shortCode: shortCode,
    });

    res.status(201).json({
      id: inputDB._id,
      url: originalUrl,
      shortCode: inputDB.shortCode,
      createdAt: inputDB.createdAt,
      updatedAt: inputDB.updatedAt,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Validasi error" });
  }
});

//GET /shorten/:shortCode
app.get("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const urlData = await urlSchema.findOne({ shortCode });
  if (urlData) {
    res.json({
      id: urlData._id,
      url: urlData.url,
      shortCode: urlData.shortCode,
      createdAt: urlData.createdAt,
      updatedAt: urlData.updatedAt,
    });
  } else {
    console.error(error);
    return res.status(404).json({ message: "shortCode salah" });
  }
});

// PUT /shorten/:shortCode
app.put("/shorten/:shortCode", async (req, res) => {
  try {
    const newUrl = req.body.url;
    if (!newUrl) {
      return res.status(400).json({ message: "URL baru wajib diisi" });
    }
    const urlData = await urlSchema.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { url: newUrl },
      { new: true }
    );
    if (!urlData) {
      return res.status(404).json({ message: "shortCode salah" });
    }
    res.json(urlData);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "shortCode salah" });
  }
});

// DELETE /shorten/:shortCode
app.delete("/shorten/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const urlData = await urlSchema.findOneAndDelete({ shortCode });
  if (!urlData) {
    return res.status(404).json({ message: "shortCode salah" });
  }
  return res.status(200).json({ message: "berhasil dihapus" }); //di-case disuruh error 204, tapi nanti responnya ngga keluar makanya pake 200
});
