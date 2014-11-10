'use strict';

describe('Service: imdbService', function () {

  // load the service's module
  beforeEach(module('cineApp'));

  // instantiate service
  var imdbService;
  beforeEach(inject(function (_imdbService_) {
    imdbService = _imdbService_;
  }));

  it('should do something', function () {
    expect(!!imdbService).toBe(true);
  });

});
