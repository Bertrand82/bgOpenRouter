import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRouterChatJson } from './open-router-chat-json';

describe('OpenRouterChatJson', () => {
  let component: OpenRouterChatJson;
  let fixture: ComponentFixture<OpenRouterChatJson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenRouterChatJson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenRouterChatJson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
