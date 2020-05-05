import User from '../user';
import { User as IUser } from '../../interfaces';
import Errorhandler from '../../utils/error';

class UserRepository {
  public readUserInfoByUserEmail(
    validatedEmail: string,
  ): Promise<IUser | null> {
    return User.findOne({ email: validatedEmail })
      .lean()
      .then(doc => {
        return doc;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  }

  public readPasswordByUserEmail(
    validatedEmail: string,
  ): Promise<Pick<IUser, 'pw'> | null> {
    return User.findOne({ email: validatedEmail })
      .select({ pw: 1 })
      .lean()
      .then(doc => {
        return doc;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      });
  }

  public readUserNameByUserEmail(validatedEmail: string): Promise<null | string> {
    return User.findOne({ email: validatedEmail })
      .select({ userName: 1 })
      .lean()
      .then(doc => {
        return doc === null ? null : doc.userName;
      })
      .catch(err => {
        throw new Errorhandler(500, err.name, err.message);
      })
  }

  public createUserInfo(convertedUserInfo: IUser) {
    const user = new User(convertedUserInfo);
    return user.save().catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
  }

  public deleteUserInfoByUserEmail(validatedEmail: string) {
    return User.deleteOne({ email: validatedEmail }).catch(err => {
      throw new Errorhandler(500, err.name, err.message);
    });
  }

  public updateUserInfoByUserEmail(
    validatedEmail: string,
    validatedUserInfo: IUser,
  ) {
    return User.updateOne({ email: validatedEmail }, validatedUserInfo).catch(
      err => {
        throw new Errorhandler(500, err.name, err.message);
      },
    );
  }
}

export default UserRepository;
