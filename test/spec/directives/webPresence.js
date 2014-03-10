'use strict';

describe('Directive: webPresence', function () {

  // load the directive's module
  beforeEach(module('personyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<web-presence></web-presence>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the webPresence directive');
  }));
});
