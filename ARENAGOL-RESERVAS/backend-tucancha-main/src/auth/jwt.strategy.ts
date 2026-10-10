import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Club } from '../club/club.entity';
import { ClubMembership } from '../membership/entities/club_membership.entity';
import { MembershipStatus } from '../membership/enums/membership-status.enum';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || process.env.JWT_SECRET || 'JWT_SECRET_KEY',
    });
  }
  
  async validate(payload: { sub?: string; id?: string; email?: string }): Promise<User> {
    const userId = payload.sub || payload.id;
    if (!userId) {
      throw new UnauthorizedException('Token inválido: falta identificador');
    }
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.club) {
      if (user.club.status !== 'APPROVED') {
        user.club.status = 'APPROVED';
        await this.dataSource.getRepository(Club).save(user.club);
      }
    }

    return user;
  }
}
