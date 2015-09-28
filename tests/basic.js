let expect = require('chai').expect,
    secret = require('../index')

describe('secret', function() {
  it('provides new secret data', function() {
    let my_secret = secret.create_secret_data("secret pork");

    expect(my_secret).to.be.a('Object');
    expect(my_secret.data).to.equal("secret pork");
  });

  it('provides basic encryption', function() {
    let encryptor = secret.create_encryptor({
      key_split: 1
    });
    expect(encryptor).to.be.a('Object');

    expect(encryptor.secret_string()).to.be.a('string');

    let my_secret = secret.create_secret_data("secret pork");
    let encrypted = encryptor.encrypt(my_secret, 2);
    expect(encrypted).to.be.a('Array');
    expect(encrypted.length).to.equal(2);

    let decryptor = secret.create_decryptor({
      secrets: encryptor.secrets()
    });
    expect(decryptor).to.be.a('Object');

    console.log(encryptor.secrets());
    console.log(encrypted);

    let decrypted = decryptor.decrypt(encrypted);
    expect(decrypted).to.be.equal('secret pork');
  });
});
