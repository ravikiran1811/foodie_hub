import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const COUNTRY_ACCESS_KEY = 'country_access';

@Injectable()
export class CountryAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireCountryCheck = this.reflector.get<boolean>(
      COUNTRY_ACCESS_KEY,
      context.getHandler(),
    );

    if (!requireCountryCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.country) {
      throw new ForbiddenException('Country information not available');
    }

    // Additional country-based logic can be added here
    return true;
  }
}
