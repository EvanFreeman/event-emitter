const EventEmitter = function() {
  function EventEmitter() {
  };

  function prepareEvent(name) {
    if (!this._events) {
      this._events = {};
    }

    if (!this._events[name]) {
      this._events[name] = [];
    }

    return this._events[name]
  }

  EventEmitter.prototype.off = function(name, callback, scope) {
    const events = prepareEvent.call(this, name);

    if (callback) {
      for (let i = events.length - 1; i >= 0; i--) {
        var eventCallback = events[i].callback;
        var scp = events[i].scope;

        if (eventCallback === callback && scp === scope) {
          events.splice(i, 1);
        }
      }
    } else {
      delete this._events[name];
    }

    return this;
  }

  EventEmitter.prototype.on = function(name, callback, scope) {
    prepareEvent.call(this, name).push({ 
      callback: callback, 
      scope: scope 
    });

    return this;
  }

  EventEmitter.prototype.emit = function(name) {
    const args = Array.prototype.slice.call(arguments, 1);
    const events = prepareEvent.call(this, name).slice();

    for (let i = 0, length = events.length; i < length; i++) {
      const callback = events[i].callback;
      const scope = events[i].scope || this;
      callback.apply(scope, args);
    }

    return this;
  }

  return EventEmitter;
}();
