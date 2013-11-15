'use strict';

describe('$websocketService', function () {
  var subject, mockScope;

  beforeEach(module('omniscientApp'));
  beforeEach(function(){
    mockScope = {
      $broadcast: function(){}
    };

    inject(function($injector) {
      subject = $injector.get('$websocketService');
    });
    // inject(function($websocketService) {
    //   subject = new $websocketService(mockScope);
    // });
  });

  it('can inject the websocketService', function () {
    expect(subject).not.toBe(undefined);
  });

  // it('broadcasts message on the injected scope when onmessage(MessageEvent)', function () {
  //   console.log(subject);
  //   spyOn(mockScope, '$broadcast');
  //   // MessageEvent just needs a data property, so this acts like it.
  //   subject.onmessage({ data: '{ "some": "json" }' });
  //   expect(mockScope.$broadcast).toHaveBeenCalledWith('inbound', { some: 'json' });
  // });
});
