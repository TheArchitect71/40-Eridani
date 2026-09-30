import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
describe('AppComponent', () => {
  it('restores saved authentication during initialization', () => {
    const auth = jasmine.createSpyObj<AuthService>('AuthService', ['autoAuthUser']);
    const app = new AppComponent(auth);
    app.ngOnInit();
    expect(auth.autoAuthUser).toHaveBeenCalledTimes(1);
  });
});
