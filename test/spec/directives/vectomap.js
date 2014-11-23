'use strict';

describe('Directive: vectoMap', function () {

  // load the directive's module
  beforeEach(module('cineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vecto-map></vecto-map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the vectoMap directive');
  }));
});
