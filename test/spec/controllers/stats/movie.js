'use strict';

describe('Controller: StatsMovieCtrl', function () {

  // load the controller's module
  beforeEach(module('cineApp'));

  var StatsMovieCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StatsMovieCtrl = $controller('StatsMovieCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
