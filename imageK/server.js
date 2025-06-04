require('dotenv').config();
const cors = require('cors');
const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'+ req.params.galID+'/')
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalname = file.originalname.replace(' ', '_');
        const name = originalname.substring(0, originalname.lastIndexOf('.'));
        const ext = originalname.substring(originalname.lastIndexOf('.'));
        cb(null, name + '-' + timestamp + ext);
    }
});
  
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

// GET all galeries
app.get('/galleries', (req, res) => {
    pool.query('SELECT * FROM galleries', (err, results)=>{
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }
        res.status(200).json(results);
    })
});

// POST new gallery
app.post('/galleries', (req, res)=>{
    let { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Hiányzó adat!'});
    }
    pool.query(`INSERT INTO galleries VALUES(null, ?)`, [name], (err, results) => {
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }

        let dir = path.join(__dirname, 'uploads', results.insertId.toString());
        fs.mkdirSync(dir);

        res.status(200).json(results);
    });
});

// DELETE gallery
app.delete('/galleries/:id', (req, res)=>{
    let id = req.params.id;
    if (!id){
        return res.status(400).json({ message: 'Hiányzó adat!'});
    }
    pool.query(`DELETE FROM galleries WHERE ID=?`, [id], (err, results)=>{
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }

        let dir = path.join(__dirname, 'uploads', id.toString());
        fs.rmSync(dir, {recursive: true, force: true});

        res.status(200).json(results);
    });
});

// GET all image from gallery by id
app.get('/images/:galID', (req, res)=>{
    let galID = req.params.galID;
    if (!galID){
        return res.status(400).json({ message: 'Hiányzó adat!'});
    }
    pool.query(`SELECT * FROM images WHERE galeryID=?`, [galID], (err, results)=>{
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }
        res.status(200).json(results);
    });
});

// POST new image to gallery by id
app.post('/images/:galID', (req, res)=>{
    let galID = req.params.galID;
    let { filename, path} = req.body;
    if (!galID || !filename || !path){
        return res.status(400).json({ message: 'Hiányzó adat!'});
    }
    pool.query(`INSERT INTO images VALUES(null, ?, ?, ?)`, [galID, filename, path], (err, results)=>{
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }
        res.status(200).json(results);
    });
});

// DELETE image from gallery
app.delete('/images/:imgID', (req, res)=>{
    let imgID = req.params.imgID;
    if (!imgID){
        return res.status(400).json({ message: 'Hiányzó adat!'});
    }   
    pool.query(`DELETE FROM images WHERE ID=?`, [imgID], (err, results)=>{
        if (err){
            return res.status(500).json({ message: 'Hiba történt!'});
        }
        res.status(200).json(results);
    });
});

// UPLOAD image
app.post('/upload/:galID', upload.single('file'), (req, res)=>{
    if (!req.file){
        return res.status(500).json({message: 'Hiba történt a feltöltéskor!'});
    }
    res.status(200).json({message: 'Sikeres képfeltöltés!', file: req.file });
});

// DELETE image
app.delete('/file/:galID/:filename', (req, res)=>{
    const galID = req.params.galID;
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', galID, filename);
    
    if (!fs.existsSync(filePath)){
        return res.status(400).json({ message: 'A fájl nem található!' });
    }

    fs.unlink(filePath, (err)=>{
        if (err){
            console.log(err);
            return res.status(500).json({ message: 'Hiba történt a fájl törlésekor!' });
        }
        res.status(200).json({ message: 'A fájl törölve lett!' });
    });
});

app.listen(process.env.PORT, ()=>{
    console.log('Server: http://localhost:'+process.env.PORT);
});