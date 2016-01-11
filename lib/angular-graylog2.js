(function() {
  "use strict";

  var module = angular.module('angular-graylog2', []);

  module.constant('Graylog2LEVELS', {
    "DEBUG": 0,
    "INFO": 1,
    "WARN": 2,
    "ERROR": 3,
    "FATAL": 4,
    "UNKNOWN": 5
  });

  module.provider('Graylog2', function() {
    var options = {
      uri: 'http://localhost:12201/gelf',
      level: 1, // DEFAULT: INFO
      facility: 'angular-gaylog2',
      host: 'localhost'
    };

    /**
     * Specify the options.
     * @param newOptions
     */
    this.options = function(newOptions) {
      _.assign(options, newOptions);
    };

    this.$get = ['$http', function($http) {
      var instance = {};
      var profilers = {};

      instance.log = function(level, message, data) {
        if (typeof(level) === "string") {
          data = message;
          message = level;
          level = options.level;
        }
        var logData = {
          version: '1.1',
          host: options.host,
          timestamp: new Date(),
          level: level,
          short_message: message
        };
        _.forOwn(data, function(value, key) {
          if (key.match(/^[\w\.\-]*$/)) {
            logData['_' + key] = value;
          }
        });
        delete logData._id;
        return $http.post(options.uri, logData);
      };

      var methods = ['debug', 'info', 'warn', 'error', 'fatal'];
      methods.forEach(function(method, index) {
        instance[method] = function() {
          Array.prototype.unshift.call(arguments, index);
          return instance.log.apply(instance.log, arguments);
        };
      });

      instance.profile = function(id) {
        var now = Date.now(),
          then, args,
          msg, meta;

        if (profilers[id]) {
          then = profilers[id];
          delete profilers[id];

          // Support variable arguments: msg, data
          args = Array.prototype.slice.call(arguments);
          meta = typeof args[args.length] === 'object' ? args.pop() : {};
          msg = args.length === 1 ? id: args[1];

          // Set the duration property of the metadata
          meta.durationMs = now - then;
          instance.info(msg, meta);
        } else {
          profilers[id] = now;
        }
      };

      return instance;
    }];

  });

})();
