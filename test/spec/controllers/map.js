'use strict';

describe('Controller: MapctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('cineApp'));

  var MapctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapctrlCtrl = $controller('MapctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
