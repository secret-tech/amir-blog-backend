import { UserRole } from '../../users/interfaces/users.interface';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;
    const user = await this.userService.findOne(+userId);

    return user.role === UserRole.admin ? true : false;
  }
}
