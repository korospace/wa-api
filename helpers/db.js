const { Client } = require('pg');

const client = new Client({
  connectionString: "postgresql://postgres:REPFSL4r1E8ogKoFsNuz@containers-us-west-161.railway.app:7846/railway",
  ssl: {
    rejectUnauthorized: false
  }
});
// const client = new Client({
//     user: 'postgres',
//     host: 'containers-us-west-179.railway.app',
//     database: 'railway',
//     password: '9IACAxka0YC2sjZKdlOW',
//     port: 7943,
// });

client.connect();

const readSession = async () => {
  try {
    const res = await client.query('SELECT * FROM wa_sessions ORDER BY id DESC LIMIT 1');
    if (res.rows.length) return res.rows[0].session;
    return '';
  } catch (err) {
    throw err;
  }
}

const saveSession = (session) => {
  client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
    if (err) {
      console.error('Failed to save session!', err);
    } else {
      console.log('Session saved!');
    }
  });
}

const removeSession = () => {
  client.query('DELETE FROM wa_sessions', (err, results) => {
    if (err) {
      console.error('Failed to remove session!', err);
    } else {
      console.log('Session deleted!');
    }
  });
}

module.exports = {
  readSession,
  saveSession,
  removeSession
}
