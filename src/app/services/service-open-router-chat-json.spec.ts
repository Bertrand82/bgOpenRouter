import { TestBed } from '@angular/core/testing';

import { ServiceOpenRouterChatJson } from './service-open-router-chat-json';

describe('ServiceOpenRouterChatJson', () => {
  let service: ServiceOpenRouterChatJson;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceOpenRouterChatJson);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
