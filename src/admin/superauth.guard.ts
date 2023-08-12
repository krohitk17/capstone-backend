import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AdminService } from './admin.service';

@Injectable()
export class SuperAuthGuard implements CanActivate {
  constructor(private adminService: AdminService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin = await this.adminService.getAdmin(request.username);
    return admin.isSuper;
  }
}
