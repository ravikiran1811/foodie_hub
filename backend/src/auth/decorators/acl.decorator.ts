import { SetMetadata } from '@nestjs/common';
import { ACL_KEY, AclRequirement } from '../guards/acl.guard';
import { COUNTRY_ACCESS_KEY } from '../guards/country-access.guard';

export const RequireAcl = (category: string, action: string) =>
  SetMetadata(ACL_KEY, { category, action } as AclRequirement);

export const RequireCountryAccess = () => SetMetadata(COUNTRY_ACCESS_KEY, true);
