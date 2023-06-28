import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";

export const navLinks = [
  {
    id: 1,
    text: "Home",
    url: "/",
    isProtected: false,
  },
  {
    id: 2,
    text: "About",
    url: "/about",
    isProtected: false,
  },
  {
    id: 3,
    text: "Products",
    url: "/products",
    isProtected: false,
  },
  {
    id: 4,
    text: "Orders",
    url: "/orders",
    isProtected: true,
  },
];

export const ourServices = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const productListTypes = { GRID: "GRID", LIST: "LIST" };

export const productSortTypes = {
  PRICE_LOW_TO_HIGH: "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW: "PRICE_HIGH_TO_LOW",
  NAME_A_TO_Z: "NAME_A_TO_Z",
  NAME_Z_TO_A: "NAME_Z_TO_A",
};

export const alertTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};
