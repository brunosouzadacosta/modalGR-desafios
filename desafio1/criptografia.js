const bcrypt = require('bcrypt');
const crypto = require('crypto');
const argon2 = require('argon2');

const senhaOriginal = "#modalGR#GPTW#top#maiorEmpresaTecnologia#baixadaSantista";

function criptografarComBcrypt(senha, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });
}

function descriptografarComBcrypt(senha, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(senha, hash, (err, result) => {
      if (err) return reject(err);
      if (result) {
        resolve(senha);
      } else {
        reject(new Error('Senha incorreta'));
      }
    });
  });
}

function criptografarComPBKDF2(senha, salt) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, newSalt) => {
      if (err) return reject(err);

      salt = newSalt.toString('hex');
      crypto.pbkdf2(senha, salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) return reject(err);
        resolve({ salt, derivedKey: derivedKey.toString('hex') });
      });
    });
  });
}

async function descriptografarComPBKDF2(senha, salt, derivedKey) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(senha, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) return reject(err);
      if (key.toString('hex') === derivedKey) {
        resolve(senha);
      } else {
        reject(new Error('Senha incorreta'));
      }
    });
  });
}

async function criptografarComArgon2(senha) {
  try {
    const senhaCifrada = await argon2.hash(senha);
    return senhaCifrada;
  } catch (error) {
    throw error;
  }
}

async function descriptografarComArgon2(senha, senhaCifrada) {
  try {
    const verificado = await argon2.verify(senhaCifrada, senha);
    if (verificado) {
      return senha;
    } else {
      throw new Error('Senha incorreta');
    }
  } catch (error) {
    throw error;
  }
}


async function testarMetodosCriptografia() {
  const saltRounds = 10;
  const senhaCifradaBcrypt = await criptografarComBcrypt(senhaOriginal, saltRounds);
  console.log("Senha Cifrada com Bcrypt:", senhaCifradaBcrypt);

  const senhaCorretaBcrypt = await descriptografarComBcrypt(senhaOriginal, senhaCifradaBcrypt);
  console.log("Senha Correta (Bcrypt):", senhaCorretaBcrypt);

  const senhaCifradaPBKDF2 = await criptografarComPBKDF2(senhaOriginal);
  console.log("Senha Cifrada com PBKDF2:", senhaCifradaPBKDF2.salt, senhaCifradaPBKDF2.derivedKey);
  
  const senhaCorretaPBKDF2 = await descriptografarComPBKDF2(senhaOriginal, senhaCifradaPBKDF2.salt, senhaCifradaPBKDF2.derivedKey);
  console.log("Senha Correta (PBKDF2):", senhaCorretaPBKDF2);  

  const senhaCifradaArgon2 = await criptografarComArgon2(senhaOriginal);
  console.log("Senha Cifrada com Argon2:", senhaCifradaArgon2);

  const senhaCorretaArgon2 = await descriptografarComArgon2(senhaOriginal, senhaCifradaArgon2);
  console.log("Senha Correta (Argon2):", senhaCorretaArgon2);
}

testarMetodosCriptografia();


















