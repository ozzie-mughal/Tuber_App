// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "SENT": "SENT",
  "DELIVERED": "DELIVERED",
  "READ": "READ"
};

const { UserRole, User, Message, ChatRoom, Voucher, ChatRoomUser } = initSchema(schema);

export {
  UserRole,
  User,
  Message,
  ChatRoom,
  Voucher,
  ChatRoomUser,
  MessageStatus
};