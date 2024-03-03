// authentication.service.ts
import * as jwt from 'jsonwebtoken';
import {UserRepository} from '../repositories/user.repository';
import { repository } from '@loopback/repository';
import { User } from '../models';
import { HttpErrors } from '@loopback/rest';
import { verify } from 'jsonwebtoken';

export class AuthenticationService {

  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    ) {}
  async authenticate(username: string, password: string): Promise<string | undefined> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return undefined; 
    }

    const passwordMatched = password == user.PassWord;

    if (!passwordMatched) {
      return undefined; 
    }

    const token = this.generateToken(user);

    return token;
  }

  async verifyToken(token: string): Promise<User | undefined> {
    try {
      const decodedToken = verify(token, '123456');

      if (typeof decodedToken === 'object' && 'id' in decodedToken) {
        const user = await this.userRepository.findById(decodedToken.id);
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return undefined;
    }
  }

  private generateToken(user: User): string {
    const payload = {
      id: user.id,
      username: user.username,
    };
  
    const secretKey = '123456';
  
    const token = jwt.sign(payload, secretKey, {expiresIn: '24h'});
  
    return token;
  }
}

export interface Credentials {
  username: string;
  password: string;
}
