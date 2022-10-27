import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}



type UserRoleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VoucherMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserRole {
  readonly id: string;
  readonly username: string;
  readonly roleType: string;
  readonly org: string;
  readonly year?: string;
  readonly subjects?: (string | null)[];
  readonly voucherApplied?: string;
  readonly User?: User;
  readonly partnerCentre?: string;
  readonly availabilities?: (string | null)[];
  readonly rating?: number;
  readonly asks?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly userRoleUserId?: string;
  constructor(init: ModelInit<UserRole, UserRoleMetaData>);
  static copyOf(source: UserRole, mutator: (draft: MutableModel<UserRole, UserRoleMetaData>) => MutableModel<UserRole, UserRoleMetaData> | void): UserRole;
}

export declare class User {
  readonly id: string;
  readonly givenName: string;
  readonly Messages?: (Message | null)[];
  readonly chatrooms?: (ChatRoomUser | null)[];
  readonly familyName: string;
  readonly avatarImage?: string;
  readonly lastOnlineAt?: number;
  readonly UserRole?: UserRole;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Message {
  readonly id: string;
  readonly content?: string;
  readonly userID: string;
  readonly chatroomID: string;
  readonly image?: string;
  readonly audio?: string;
  readonly status?: MessageStatus | keyof typeof MessageStatus;
  readonly replyToMessageID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly LastMessage?: Message;
  readonly Messages?: (Message | null)[];
  readonly ChatRoomUsers?: (ChatRoomUser | null)[];
  readonly topic?: string;
  readonly active?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomLastMessageId?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Voucher {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly active: boolean;
  readonly value?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Voucher, VoucherMetaData>);
  static copyOf(source: Voucher, mutator: (draft: MutableModel<Voucher, VoucherMetaData>) => MutableModel<Voucher, VoucherMetaData> | void): Voucher;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}