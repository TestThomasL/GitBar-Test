export type Attendee = {
  name: string;
  avatarUrl: string;
  vote?: Vote;
};

export enum Vote {
  NoVote = "NoVote",
  Approved = "Approved",
  WaitingFor = "WaitingFor",
  Rejected = "Rejected",
}
