const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
process.loadEnvFile();

const MONGO_ACCESS= process.env.VITE_MONGO_ACCESS;
const MONGO_USER = process.env.VITE_MONGO_USER;
const MONGO_PWD = process.env.VITE_MONGO_PWD;
const MONGO_HOST = process.env.VITE_MONGO_HOST;
const MONGO_PORT = process.env.VITE_MONGO_PORT;
const MONGO_DB = process.env.VITE_MONGO_DB_NAME;

const MONGO_URI = `${MONGO_ACCESS}${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

const dataDir = __dirname;

fs.readdirSync(dataDir).forEach(file => {
  if (path.extname(file) === '.json') {
    const collection = path.basename(file, '.json');
    const command = `mongoimport --uri="${MONGO_URI}" --collection ${collection} --file "${path.join(dataDir, file)}" --jsonArray`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
});