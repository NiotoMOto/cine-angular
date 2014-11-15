'use strict';

describe('Controller: UsercontrollertemplateCtrl', function () {

  // load the controller's module
  beforeEach(module('cineApp'));

  var UsercontrollertemplateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsercontrollertemplateCtrl = $controller('UsercontrollertemplateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
