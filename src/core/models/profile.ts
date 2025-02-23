import { AccountType } from "./account";

export enum AccountState {
  Valid,
  Invalid,
  Unknown,
}

type Profile = {
  id: string;
  name: string;
  type: AccountType;
  userName?: string;
  avatarUrl?: string;
  state: AccountState;
};

export default Profile;
