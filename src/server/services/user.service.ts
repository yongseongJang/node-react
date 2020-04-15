import * as dotenv from 'dotenv';
import UserRepository from '../models/repositories/user.repository';
import createValidator from '../utils/validation/createValidator';
import {
  userRegistrationSchema,
  emailSchema,
} from '../utils/validation/schemas/userSchema';
import { User as IUser, LoginInfo } from '../interfaces';
import Errorhandler from '../utils/error';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const validateUserRegistrationInfo = createValidator(userRegistrationSchema);
const validateEmail = createValidator(emailSchema);

const authExpirationTime: string = '3600000'; // 3600000ms == 1h

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async readUserInfoByUserEmail(email: string): Promise<IUser | null> {
    try {
      const validatedEmail = await validateEmail(email);

      return await this.userRepository.readUserInfoByUserEmail(validatedEmail);
    } catch (err) {
      throw err;
    }
  }

  public async login(email: string, password: string): Promise<LoginInfo> {
    try {
      const validatedEmail = await validateEmail(email);

      const hash: Pick<
        IUser,
        'pw'
      > | null = await this.userRepository.readPasswordByUserEmail(
        validatedEmail,
      );

      await this.comparePasswordToHash(password, hash);

      const token = await this.getToken(email);

      return { token, authExpirationTime: Number(authExpirationTime) };
    } catch (err) {
      throw err;
    }
  }

  public async registerUserInfo(userInfo: IUser) {
    try {
      const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

      const hash: string = await this.stringPasswordToHash(
        validatedUserInfo.pw,
      );

      const convertedUserInfo = Object.assign({}, validatedUserInfo, {
        pw: hash,
      });

      await this.userRepository.createUserInfo(convertedUserInfo);
    } catch (err) {
      throw err;
    }
  }

  public async deleteUserInfoByUserEmail(email: string) {
    try {
      const validatedEmail = await validateEmail(email);

      await this.userRepository.deleteUserInfoByUserEmail(validatedEmail);
    } catch (err) {
      throw err;
    }
  }

  public async updateUserInfoByUserEmail(email: string, userInfo: IUser) {
    try {
      const validatedEmail = await validateEmail(email);

      const validatedUserInfo = await validateUserRegistrationInfo(userInfo);

      await this.userRepository.updateUserInfoByUserEmail(
        validatedEmail,
        validatedUserInfo,
      );
    } catch (err) {
      throw err;
    }
  }

  private stringPasswordToHash = (password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, 10)
        .then(hash => {
          resolve(hash);
        })
        .catch(err => {
          reject(new Errorhandler(500, err.name, err.message));
        });
    });
  };

  private comparePasswordToHash = (
    password: string,
    hash: Pick<IUser, 'pw'> | null,
  ) => {
    return new Promise((resolve, reject) => {
      if (hash !== null) {
        bcrypt
          .compare(password, hash.pw)
          .then((res: boolean) => {
            if (!res) {
              reject(
                new Errorhandler(401, 'ValidationError', 'Invalid Password'),
              );
            } else {
              resolve();
            }
          })
          .catch((err: Error) => {
            reject(new Errorhandler(500, err.name, err.message));
          });
      } else {
        reject(new Errorhandler(401, 'ValidationError', 'Invalid Email'));
      }
    });
  };

  private getToken = (email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { email },
        process.env.PRIVATEKEY,
        {
          expiresIn: authExpirationTime,
        },
        (err: Error, token: string) => {
          if (err) {
            reject(new Errorhandler(500, err.name, err.message));
          } else {
            resolve(token);
          }
        },
      );
    });
  };
}

export default UserService;
