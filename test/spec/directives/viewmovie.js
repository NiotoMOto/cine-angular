'use strict';

describe('Directive: viewMovie', function () {

  // load the directive's module
  beforeEach(module('cineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<view-movie></view-movie>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the viewMovie directive');
  }));
});
