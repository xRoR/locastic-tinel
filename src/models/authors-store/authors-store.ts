import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { UsersApi } from '../../services/api/user-api';
import { withStoreEnv } from '../extentions/with-stote-env';
import { User, UserModel } from '../user/user';

export const AuthorsStoreModel = types
  .model('AuthorsStore')
  .props({
    users: types.optional(types.array(UserModel), [])
  })
  .extend(withStoreEnv)
  .actions((self) => ({
    saveUsers: (usersSnapshot: User[]) => {
      self.users.replace(usersSnapshot);
    }
  }))
  .actions((self) => ({
    getUsers: async () => {
      const api = new UsersApi(self.environment.api);
      const result = await api.getUsers();

      if (result.kind === 'ok') {
        self.saveUsers(result.users);
      } else {
        console.log(result.kind);
      }
    }
  }))
  .views((self) => ({
    get totalUsers() {
      return self.users.length;
    },
    showUser(id: number): User | undefined {
      return self.users.find(user => user.id === id);
    }
  }));

type AuthorsStoreType = Instance<typeof AuthorsStoreModel>;
export interface AuthorsStore extends AuthorsStoreType {}
type AuthorsStoreSnapshotType = SnapshotOut<typeof AuthorsStoreModel>;
export interface AuthorsStoreSnapshot extends AuthorsStoreSnapshotType {}
export const createAuthorsStoreDefaultModel = () => types.optional(AuthorsStoreModel, {});
