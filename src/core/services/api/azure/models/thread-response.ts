export type ThreadResponse = {
  value: Thread[];
  count: number;
};

export type Thread = {
  id: string;
  comments: Comment[];
  identities: Identity[];
  publisedDate: string;
  lastUpdatedDate: string;
  status: ThreadStatus;
};

type Identity = {
  id: string;
  displayName: string;
  descriptor: string;
};

type Comment = {
  author: Identity;
  commentType: CommentType;
  content: string;
  id: string;
  isDeleted: boolean;
  usersLiked: Identity[];
  publishedDate: string;
  lastUpdatedDate: string;
  parentCommentId: number;
  lastContentUpdatedDate: string;
};

export enum ThreadStatus {
  Active = "active",
  ByDesign = "byDesign",
  Closed = "closed",
  Fixed = "fixed",
  Pending = "pending",
  Unknown = "unknown",
  WontFix = "wontFix",
}

export enum CommentType {
  System = "system",
  Text = "text",
  CodeChange = "codeChange",
  Unknown = "unknown",
}
