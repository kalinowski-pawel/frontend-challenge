export type NewUser = {
  name: string;
  job: string;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export type Users = {
  users: User[];
}
