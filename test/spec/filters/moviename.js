'use strict';

describe('Filter: movieName', function () {

  // load the filter's module
  beforeEach(module('cineApp'));

  // initialize a new instance of the filter before each test
  var movieName;
  beforeEach(inject(function ($filter) {
    movieName = $filter('movieName');
  }));

  it('should return the input prefixed with "movieName filter:"', function () {
    var text = 'angularjs';
    expect(movieName(text)).toBe('movieName filter: ' + text);
  });

});
