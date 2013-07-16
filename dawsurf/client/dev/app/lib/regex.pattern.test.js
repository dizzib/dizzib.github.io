(function() {

  define(['lib/regex.pattern'], function(rp) {
    module('regex.pattern');
    test('hostname', function() {
      ok(new RegExp(rp.HOSTNAME).test('FOO'));
      ok(new RegExp(rp.HOSTNAME).test('FOO123'));
      ok(new RegExp(rp.HOSTNAME).test('foo-bar'));
      ok(new RegExp(rp.HOSTNAME).test('foo.bar.baz'));
      ok(!new RegExp(rp.HOSTNAME).test('g>'));
      return ok(!new RegExp(rp.HOSTNAME).test('garbage_29$%#<>'));
    });
    test('ip address', function() {
      ok(new RegExp(rp.IPADDRESS).test('255.255.255.0'));
      ok(!new RegExp(rp.IPADDRESS).test('2'));
      ok(!new RegExp(rp.IPADDRESS).test('2.'));
      ok(!new RegExp(rp.IPADDRESS).test('255.2550'));
      ok(!new RegExp(rp.IPADDRESS).test('255.255.255.255.255'));
      ok(!new RegExp(rp.IPADDRESS).test('255.255.255.'));
      ok(!new RegExp(rp.IPADDRESS).test('111.222.333.444'));
      return ok(!new RegExp(rp.IPADDRESS).test('g>'));
    });
    return test('endpoint', function() {
      ok(new RegExp(rp.ENDPOINT).test('foo-bar'));
      ok(new RegExp(rp.ENDPOINT).test('255.255.255.100'));
      return ok(!new RegExp(rp.ENDPOINT).test('g>'));
    });
  });

}).call(this);
