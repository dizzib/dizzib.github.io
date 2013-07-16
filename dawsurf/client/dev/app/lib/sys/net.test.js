(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['./net'], function(f) {
    var MockSocket;
    module('sys/net');
    MockSocket = (function() {

      function MockSocket() {
        this.send = __bind(this.send, this);

      }

      MockSocket.prototype.readyState = void 0;

      MockSocket.prototype.readyStates = {
        connecting: 0,
        open: 1,
        closing: 2,
        closed: 3
      };

      MockSocket.prototype.send = function(msg) {
        return this.buffer = msg;
      };

      return MockSocket;

    })();
    test('socket.onopen, should raise on_connect', function() {
      var connected;
      f._ws = new MockSocket;
      connected = false;
      f.on_connect = function() {
        return connected = true;
      };
      f._init();
      f._ws.readyState = f._ws.readyStates['open'];
      f._ws.onopen();
      return ok(connected);
    });
    test('socket.onmessage, should raise on_command', function() {
      var cmd;
      f._ws = new MockSocket;
      cmd = void 0;
      f.on_command = function(c) {
        return cmd = c;
      };
      f._init();
      f._ws.onmessage({
        data: 'TA {"foo":"1","bar":"baz"}'
      });
      ok(cmd != null);
      equal(cmd[0], 'TA');
      equal(cmd[1].foo, 1);
      return equal(cmd[1].bar, 'baz');
    });
    test('socket.onclose, when open socket, should raise on_disconnect', function() {
      var disconnected;
      f._ws = new MockSocket;
      disconnected = false;
      f.on_disconnect = function() {
        return disconnected = true;
      };
      f._init();
      f._ws.readyState = f._ws.readyStates['open'];
      f._ws.onopen();
      f._ws.readyState = f._ws.readyStates['closed'];
      f._ws.onclose();
      return ok(disconnected);
    });
    test('socket.onclose, when connect fails, should raise on_error', function() {
      var error;
      f._ws = new MockSocket;
      error = false;
      f.on_error = function() {
        return error = true;
      };
      f._init();
      f._ws.readyState = f._ws.readyStates['closed'];
      f._ws.onclose();
      return ok(error);
    });
    test('trigger before _init, should throw exception', function() {
      f._ws = void 0;
      return raises(function() {
        return f.trigger([
          'foo', {
            bar: 1
          }
        ]);
      });
    });
    test('trigger, should send and raise on_trigger', function() {
      var cmd, on_trigger_cmd;
      f._ws = new MockSocket;
      on_trigger_cmd = void 0;
      f.on_trigger = function(cmd) {
        return on_trigger_cmd = cmd;
      };
      f._init();
      f.trigger(cmd = [
        'foo', {
          bar: 1
        }
      ]);
      equal(f._ws.buffer, 'foo {"bar":1}');
      return equal(on_trigger_cmd, cmd);
    });
    test('_pack with invalid opcode, should throw exception', function() {
      raises(function() {
        return f._pack([null, {}]);
      });
      return raises(function() {
        return f._pack(['', {}]);
      });
    });
    test('_pack with valid opcode without object, should return message without payload', function() {
      equal(f._pack(['foo']), 'foo');
      return equal(f._pack(['foo', null]), 'foo');
    });
    test('_pack with valid opcode and empty object, should return full message', function() {
      return equal(f._pack(['foo', {}]), 'foo {}');
    });
    test('_pack with valid opcode and object, should return full message', function() {
      return equal(f._pack([
        'foo', {
          bar: 1,
          baz: 'two three'
        }
      ]), 'foo {"bar":1,"baz":"two three"}');
    });
    test('_unpack malformed message, should throw exception', function() {
      raises(function() {
        return f._unpack('foo');
      });
      return raises(function() {
        return f._unpack('foo {} baz');
      });
    });
    return test('_unpack valid message, should return opcode and object', function() {
      var object, opcode, _ref;
      _ref = f._unpack('TA {"foo":"1","bar":"baz boo"}'), opcode = _ref[0], object = _ref[1];
      equal(opcode, 'TA');
      equal(object.foo, 1);
      return equal(object.bar, 'baz boo');
    });
  });

}).call(this);
