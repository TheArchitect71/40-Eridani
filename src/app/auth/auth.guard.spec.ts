import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
describe('AuthGuard', () => {
  it('redirects guests to the actual login route', () => {
    const auth = jasmine.createSpyObj<AuthService>('AuthService', ['getIsAuth']);
    const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    auth.getIsAuth.and.returnValue(false);
    expect(new AuthGuard(auth, router).canActivate(null, null)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
  it('allows authenticated users', () => {
    const auth = jasmine.createSpyObj<AuthService>('AuthService', ['getIsAuth']);
    const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    auth.getIsAuth.and.returnValue(true);
    expect(new AuthGuard(auth, router).canActivate(null, null)).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
