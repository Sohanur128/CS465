import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtInterceptor } from '../utils/jwt-interceptor';
import { AuthService } from '../services/authentication';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getToken']);

    TestBed.configureTestingModule({
      providers: [
        JwtInterceptor,
        { provide: AuthService, useValue: spy }
      ]
    });

    interceptor = TestBed.inject(JwtInterceptor);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
