'use strict';

describe('Directive: editDate', function () {

  // load the directive's module
  beforeEach(module('cineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<edit-date></edit-date>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the editDate directive');
  }));
});
