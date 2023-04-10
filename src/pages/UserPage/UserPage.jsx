import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../components/Menu/use-dimensions";
import { MenuToggle } from "../../components/Menu/MenuToggle";
import { Navigation } from "../../components/Menu/Navigation";
import styles from "./UserPage.module.css";
import Header from "../../components/Header/Header";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const UserPage = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div className="background" variants={sidebar} />
          <Navigation />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
        <div className={styles.wrapper}>
          <p>sdkgfhadfkgadfgadfgdfg</p>
        </div>
      </div>
    </>
  );
};

export default UserPage;
