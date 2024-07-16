import nav1 from "../../../assets/img/nav/nav1.png";
import nav2 from "../../../assets/img/nav/nav2.png";
import nav3 from "../../../assets/img/nav/nav3.png";
import nav4 from "../../../assets/img/nav/nav4.png";
import universal from "../../../assets/img/nav/universal.png";

interface SolutionItem {
  id?: number;
  img?: any;
  title?: string;
  text?: string;
}

interface SolutionData {
  enterprise: SolutionItem[];
  sme: SolutionItem[];
}

type DevelopersData = {
  id?: number;
  img?: any;
  title?: string;
  text?: string;
};

export const solutionData: SolutionData = {
  enterprise: [
    {
      id: 0,
      img: nav1,
      title: "Accept online payment",
      text: "Easy payment online",
    },
    {
      id: 1,
      img: nav2,
      title: "Withdrawer",
      text: "Easy payment online",
    },
    {
      id: 2,
      img: nav3,
      title: "Pos System",
      text: "Easy payment online",
    },
    {
      id: 3,
      img: nav4,
      title: "Marchant ID",
      text: "Easy payment online",
    },
  ],
  sme: [
    {
      id: 0,
      img: nav1,
      title: "Online Checkout",
      text: "For small businesses to add our checkout to their websites",
    },
    {
      id: 1,
      img: nav2,
      title: "Payment links",
      text: "Sell online without a website Create a payment link with just a few clicks.",
    },
    {
      id: 2,
      img: nav3,
      title: "Pos System",
      text: "Sell online without a website Create a payment link with just a few clicks.",
    },
  ],
};
export const developersData: DevelopersData[] = [
  {
    id: 0,
    img: universal,
    title: "API documentation",
    text: "For small businesses to add our checkout to their websites",
  },
  {
    id: 1,
    img: universal,
    title: "API reference",
    text: "Sell online without a website Create a payment link with just a few clicks.",
  },
];
export const companysData: DevelopersData[] = [
  {
    id: 0,
    img: universal,
    title: "Careers",
    text: "For small businesses to add our checkout to their websites",
  },
  {
    id: 1,
    img: universal,
    title: "About Us",
    text: "Sell online without a website Create a payment link with just a few clicks.",
  },
  {
    id: 2,
    img: universal,
    title: "Press and media resources",
    text: "Sell online without a website Create a payment link with just a few clicks.",
  },
];
