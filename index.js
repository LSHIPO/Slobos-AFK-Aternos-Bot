const mineflayer = require('mineflayer');
const fs = require('fs');

// Carica le impostazioni dal file settings.json
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

console.log(`[Bot] Tentativo di connessione a ${settings.server.ip}:${settings.server.port}...`);

const bot = mineflayer.createBot({
  host: settings.server.ip,
  port: settings.server.port,
  username: settings.bot_account.username,
  auth: settings.bot_account.type === 'Offline' ? 'offline' : 'microsoft',
  version: false,             // Disattiva il controllo del testo "26.2"
  protocolVersion: 776        // FORZA IL PROTOCOLLO DELLA VERSIONE 26.2
});

bot.on('login', () => {
  console.log(`[Bot] Connesso con successo al server in versione 26.2!`);
});

bot.on('end', (reason) => {
  console.log(`[Bot] Disconnesso. Motivo: ${reason}. Riconnessione in corso...`);
});

bot.on('error', (err) => {
  console.log(`[Bot] Errore riscontrato: ${err.message}`);
});

