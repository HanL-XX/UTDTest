// authentication.controller.ts
import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {AuthenticationService, Credentials} from '../services/authentication.service';

export class AuthenticationController {
  constructor(
    @inject('services.AuthenticationService') // Sử dụng tên binding của AuthenticationService
    public authService: AuthenticationService,
  ) {}

  @post('/login')
  async login(@requestBody() credentials: Credentials): Promise<{token?: string}> {
    const token = await this.authService.authenticate(credentials.username, credentials.password);
    return {token};
  }
}
