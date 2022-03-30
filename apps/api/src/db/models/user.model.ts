import { Model } from "objection";

class User extends Model {
  static get tableName() {
    return 'users';
  }

  githubId: number;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;

  createdAt: Date;
  updatedAt: Date;
}

export default User