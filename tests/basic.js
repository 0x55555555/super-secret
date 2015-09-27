var expect = require('chai').expect,
    secret = require('../index')

describe('secret', function() {
  before(function(){
    // The before() callback gets run before all tests in the suite. Do one-time setup here.
  });
  beforeEach(function(){
    // The beforeEach() callback gets run before each test in the suite.
  });

  it('provides new secrets', function() {
    let my_secret = secret.create();

    expect(my_secret).to.be.a('Object');
  });

  after(function() {
  	// after() is run after all your tests have completed. Do teardown here.
  });
});
