// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '785139052881-gbjr72lnkr6ajhecf71k2m2lgj0c7j0c',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    done(null, { profile, authInfo: { accessToken, refreshToken } });
  }
  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: any,
  //   done: VerifyCallback,
  // ): Promise<any> {
  //   const { name, emails, photos } = profile;
  //   const user = {
  //     id: profile.id,
  //     email: emails[0].value,
  //     firstName: name.givenName,
  //     lastName: name.familyName,
  //     picture: photos[0].value,
  //     accessToken,
  //   };
    
  //   done(null, user);
  // }

  
}