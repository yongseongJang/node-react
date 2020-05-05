export interface ILoginInfo {
  email: string;
  password: string;
}

export interface IUserInfo {
  userName: string;
  email: string;
  pw: string;
}

export interface IPost {
  id: string | undefined;
  title: string;
  createdBy: string;
  lastEdited: Date;
  tags: Array<string>;
  selectedTags: Array<string>;
  content: string;
}