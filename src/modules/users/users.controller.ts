import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../../role/ roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Role } from '../../role/role.enum';
import { RolesGuard } from '../../guards/roles.guard';
import { User } from '../../entities/User';
import { UserDto } from '../../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // @Get()
  // findByRole(@Query('role') role: string): Promise<UserDto[] |null> {
  //   return this.usersService.findByRole(role);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findByEmail(@Param('id') id: string): Promise<User | null> {
    console.log(3);
    return this.usersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch(':id')
  update(@Param('id') id: number, @Body() userData: any) {
    return this.usersService.update(id, userData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // @Get('/test')
  // findByRole(): Promise<User[] | null> {
  //   return this.usersService.findByRole();
  // }
}
