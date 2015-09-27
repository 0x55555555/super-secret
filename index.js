let crypto = require('crypto');

class SecretData
{
  constructor(data)
  {
    this.data = data;
  }
}

class CryptBase
{
  constructor(options)
  {
    if (options.secrets) {
      this._secrets = options.secrets;
    }
    else if (options.key_split) {
      this._secrets = [];
      for (var i = 0; i < options.key_split; ++i) {
        this._secrets.push(crypto.randomBytes(64).toString('hex'));
      }
    }
  }

  secrets()
  {
    return this._secrets;
  }

  secret_string()
  {
    return this.secrets().join("");
  }

  algorithm()
  {
    return 'aes-256-ctr';
  }

}

class Encryptor extends CryptBase
{
  constructor(options)
  {
    super(options);
  }

  encrypt(secret, segments)
  {
    let cipher = crypto.createCipher(this.algorithm(), this.secret_string());
    let crypted = cipher.update(secret.data, 'utf8', 'hex');
    crypted += cipher.final('hex');

    let output = [];
    let count = crypted.length / segments;
    if (count < 1) {
      throw "Invalid segment count";
    }
    for (var i = 0; i < segments; ++i) {
      let start = i * count;
      let end = (i != segments-1) ? start + count : crypted.length;
      output.push(crypted.substring(start, end));
    }
    return output;
  }
}

class Decryptor extends CryptBase
{
  constructor(options)
  {
    super(options);
  }

  decrypt(enc_secret)
  {
    let secret_input = enc_secret.join("");
    var decipher = crypto.createDecipher(this.algorithm(), this.secret_string())
    var dec = decipher.update(secret_input, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}

module.exports = {
  create_secret_data: function(value) {
    return new SecretData(value);
  },

  create_encryptor: function(options) {
    return new Encryptor(options);
  },

  create_decryptor: function(options) {
    return new Decryptor(options);
  }
}
