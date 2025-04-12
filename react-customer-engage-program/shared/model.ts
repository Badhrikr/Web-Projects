import { CustomerUpdateType, LeadTrackerAction, LeadUpdateType } from "../modules/sales/enums";
import { ApplicationRoles, LeadType } from "./enums";

type ApplicationTheme = "light" | "dark";

interface CommonModel {
  className?: string;
}

interface UserSSO {
  acr: string;
  aud: string;
  auth_time: number;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number
  iss: string;
  jti: string;
  name: string;
  nonce: string;
  preferred_username: string;
  realm_access: { roles: Array<string> };
  resource_access: Record<string, Record<string, Array<string>>>;
  scope: string;
  session_state: string;
  sid: string;
  sub: string;
  typ: string;
}

interface NotificationObject {
  id: string;
  message: string;
  createdDate: string;
  action: LeadType | LeadTrackerAction | CustomerUpdateType | "Conversation";
  role: ApplicationRoles;
  detailId: string;
}

interface PersonalInfo {
  organisationName: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  contactNumber: string;
}

interface Address {
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  country: string;
  zipCode: string;
}

interface BasicUserInfo {
  firstName: string;
  lastName: string;
  emailAddress: string
}

export type NotificationType = LeadType | LeadTrackerAction | LeadUpdateType | CustomerUpdateType;

export type {
  ApplicationTheme,
  CommonModel,
  UserSSO,
  NotificationObject,
  PersonalInfo,
  Address,
  BasicUserInfo
};

