import { User } from "./User";

export interface UserUpdate extends User {
  user: {
    id: string;
  };
}
