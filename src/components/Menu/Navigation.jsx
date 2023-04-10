import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul className="menuList" variants={variants}>
    {menu.map(({ id, text }) => (
      <MenuItem id={id} key={id} text={text} />
    ))}
  </motion.ul>
);

const menu = [
  {
    id: 0,
    text: "Menu1",
  },
  {
    id: 1,
    text: "Menu2",
  },
  {
    id: 2,
    text: "Menu3",
  },
  {
    id: 3,
    text: "Menu4",
  },
  {
    id: 4,
    text: "Menu5",
  },
];

const itemIds = [0, 1, 2, 3, 4];
