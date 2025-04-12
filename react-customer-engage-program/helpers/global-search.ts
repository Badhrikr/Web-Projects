import { GlobalSearchItemProps } from "../shared/components/global-search-item/model";
import { ApplicationRoles } from "../shared/enums";

const anonymousUser: Array<GlobalSearchItemProps> = [
  {
    title: "Home",
    desc: "Go to home",
    image: "/assets/home-icon.svg",
    link: "/"
  },
  {
    title: "Create Callback Request",
    desc: "Create a callback request. We will call you soon",
    image: "/assets/callback-request-icon.svg",
    link: "create-callback-request"
  },
  {
    title: "Create Demo Request",
    desc: "Create a demo request. We will connect with you soon",
    image: "/assets/demo-request-icon.svg",
    link: "create-demo-request"
  },
];

const CustomerUser: Array<GlobalSearchItemProps> = [];

const SalesPersonUser: Array<GlobalSearchItemProps> = [];

const AdminUser: Array<GlobalSearchItemProps> = [];

const DeliveryPartnerUser: Array<GlobalSearchItemProps> = [];

const getGlobalSearchList = (role: ApplicationRoles): Array<GlobalSearchItemProps> => {
  if (role === ApplicationRoles.SALES_PERSON) {
    return SalesPersonUser;
  }
  else if (role === ApplicationRoles.ADMIN) {
    return AdminUser;
  }
  else if (role === ApplicationRoles.CUSTOMER) {
    return CustomerUser;
  }
  else if (role === ApplicationRoles.DELIVERY_PARTNER) {
    return DeliveryPartnerUser;
  }
  else {
    return anonymousUser;
  }
}

export { anonymousUser, CustomerUser, SalesPersonUser, AdminUser, getGlobalSearchList };

