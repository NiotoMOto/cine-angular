'use strict';

describe('Controller: HistoriqueCtrl', function () {

  // load the controller's module
  beforeEach(module('cineApp'));

  var HistoriqueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HistoriqueCtrl = $controller('HistoriqueCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
