import formidable from 'formidable';
import fs from 'fs';
import mimeDb from 'mime-db';
import { v4 as uuidv4 } from 'uuid';
export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  console.log('post');
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const fileName = await saveFile(files.file);
    return res.status(201).send({ file: fileName });
  });
};

const saveFile = async (file) => {
  console.log(file.filepath);
  const data = fs.readFileSync(file.filepath);
  const genFileName = `${uuidv4()}.${mimeDb[file.mimetype].extensions[0]}`;
  fs.writeFileSync(`./public/${genFileName}`, data);
  await fs.unlinkSync(file.filepath);
  return genFileName;
};

export default (req, res) => {
  req.method === 'POST' ? post(req, res) : req.method === 'PUT' ? console.log('PUT') : req.method === 'DELETE' ? console.log('DELETE') : req.method === 'GET' ? console.log('GET') : res.status(404).send('');
};
