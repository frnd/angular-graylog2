"use strict";

describe('angular-gaylog2', function() {
  var $httpBackend, requestHandler, Graylog2LEVELS, Graylog2;

  // Initialization of the AngularJS application before each test case
  beforeEach(module('angular-gaylog2'));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    requestHandler = $httpBackend.when('PUT', 'http://localhost:12201/gelf').respond({});
    Graylog2LEVELS = $injector.get('Graylog2LEVELS');
    Graylog2 = $injector.get('Graylog2');
  }));

  describe('Graylog2_LEVELS', function() {
    it('should define the available levels as constants',  function() {
      assert.ok(Graylog2LEVELS, "Level constants not available");
      assert.equal(Graylog2LEVELS.DEBUG, 0, "DEBUG constant has incorrect value");
      assert.equal(Graylog2LEVELS.INFO, 1, "INFO constant has incorrect value");
      assert.equal(Graylog2LEVELS.WARN, 2, "WARN constant has incorrect value");
      assert.equal(Graylog2LEVELS.ERROR, 3, "ERROR constant has incorrect value");
      assert.equal(Graylog2LEVELS.FATAL, 4, "FATAL constant has incorrect value");
      assert.equal(Graylog2LEVELS.UNKNOWN, 5, "UNKNOWN constant has incorrect value");
    });
  });

  describe('Graylog2', function() {
    describe('Logging', function() {
      it('should have a method to log',  function() {
        assert.ok(Graylog2.log, "Method to log not available not available");
      });
      it('should have a method to log debug',  function() {
        assert.ok(Graylog2.debug, "Method to log not available not available");
      });
      it('should have a method to log info',  function() {
        assert.ok(Graylog2.info, "Method to log not available not available");
      });
      it('should have a method to log warn',  function() {
        assert.ok(Graylog2.warn, "Method to log not available not available");
      });
      it('should have a method to log fatal',  function() {
        assert.ok(Graylog2.fatal, "Method to log not available not available");
      });
      it('should send a request to server on log',  function() {
        $httpBackend.expectPOST('http://localhost:12202/gelf');
        Graylog2.log(Graylog2LEVELS.INFO, "TEST", {
          property: "TEST_DATA"
        });
        $httpBackend.flush();
      });
    });

    describe('Profiling', function() {
      it('should have a method to profile',  function() {
        assert.ok(Graylog2.profile, "Method to profile not available not available");
      });
      it('should have a send profiling time as info', function(){
        $httpBackend.expectPUT('http://localhost:12201/gelf');
        Graylog2.profile('test');
        Graylog2.profile('test');
        $httpBackend.flush();
      });
    });
  });
});
