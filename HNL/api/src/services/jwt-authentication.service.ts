import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories';
import {Credentials} from '../services/authentication.service';
import { User } from '../models';
import { verify } from 'jsonwebtoken';

@bind({scope: BindingScope.TRANSIENT})
export class JwtAuthenticationService {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  async authenticate(credentials: Credentials): Promise<User> {
    // Your authentication logic here
    // Verify username and password, then return a user profile if valid

    const user = await this.userRepository.findByUsername(credentials.username);
    if (!user || user.password !== credentials.password) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }

    return user;
  }

  async verifyToken(token: string): Promise<User | undefined> {
    try {
      const decodedToken = verify(token, '123456');
      console.log(decodedToken);
      if (typeof decodedToken === 'object' && 'id' in decodedToken) {
        const user = await this.userRepository.findById(decodedToken.id);
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return undefined;
    }
  }
}
