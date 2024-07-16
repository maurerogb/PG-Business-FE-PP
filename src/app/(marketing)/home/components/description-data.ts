import phone from "../../../../assets/img/home-SME/phone.png";
import pos from "../../../../assets/img/home-SME/pos.png";
import person from "../../../../assets/img/home-SME/person.png";

type DescriptionDataType = {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  linkText: string;
  link: string;
  img: any;
  direction: string;
};

export const DescriptionData: DescriptionDataType[] = [
  {
    id: 0,
    title: "Online checkout",
    subtitle: "for small and medium business",
    text: "Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment transactions, and I'll be glad .Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment tran.",
    linkText: "Learn More",
    link: "/",
    img: phone,
    direction: "",
  },
  {
    id: 1,
    title: "POS systems",
    subtitle: "for small and medium business",
    text: "Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment transactions, and I'll be glad .Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment tran.",
    linkText: "Learn More",
    link: "/",
    img: pos,
    direction: "reverse",
  },
  {
    id: 2,
    title: "Payment links",
    subtitle:
      "Sell online without a website Create a payment link with just few clicks.",
    text: "Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment transactions, and I'll be glad .Pay access Certainly! I can provide you with information about payment transactions. or question you have regarding payment tran.",
    linkText: "Learn More",
    link: "/",
    img: person,
    direction: "",
  },
];
