import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';
export const adminRoleGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userRole: string | undefined = userService.user()?.role;
  const adminPermission = 'ADMIN';
  if (userService.user() && userRole === adminPermission) return true

  return router.navigate(['access-denied'])
};
