import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import "../Styles/Layout.scss";
import { Link } from "react-router-dom";
function Menu(props) {

  const topVariants = {
    open: {
      strokeDasharray: "20 100",
      strokeDashoffset: -74,
    },
    closed: {
      strokeDasharray: "30 100",
      strokeDashoffset: 0,
    },
  };

  const bottomVariants = {
    open: {
      strokeDasharray: "20 100",
      strokeDashoffset: -74,
    },
    closed: {
      strokeDasharray: "30 100",
      strokeDashoffset: 0,
    },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.1,
        },
      },
    },
    closed: {
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.1,
        },
      },
    },
  };

  const menuControls = useAnimation();

  useEffect(() => {
    if (props.isMenuOpen) {
      menuControls.start("open");
    } else {
      menuControls.start("closed");
    }
  });

  return (
    <div className="menu-container">
      <button
        className="menu-button"
        onClick={() => {
          props.toggleMenu(!props.isMenuOpen);
        }}
      >
        <svg width="5em" height="5em" viewBox="-5 -10 60 60">
          <motion.path
            fill="transparent"
            d="M10 15 L40 15 A10 10 0 0 1 40 35 L37 35 L15 10"
            strokeLinejoin="round"
            stroke="#fff"
            strokeWidth={3}
            variants={topVariants}
            animate={menuControls}
            initial="closed"
            transition={{
              duration: 0.6,
              type: "spring",
            }}
          />
          <motion.path
            d="M10 25 L40 25 A5 5 0 0 0 40 5 L37 5 L15 30"
            strokeLinejoin="round"
            fill="transparent"
            stroke="#fff"
            strokeWidth={3}
            variants={bottomVariants}
            animate={menuControls}
            initial="closed"
            transition={{
              duration: 0.6,
              type: "spring",
            }}
          />
        </svg>
      </button>
      <AnimatePresence>
        {props.isMenuOpen ? (
          <motion.nav
            className="menu-wrapper"
            variants={menuVariants}
            animate={menuControls}
            initial="closed"
            exit="closed"
          >
            <ul>
              <li
                onClick={() => {
                  if (props.isMenuOpen) {
                    props.toggleMenu(!props.isMenuOpen);
                  }
                }}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={() => {
                  if (props.isMenuOpen) {
                    props.toggleMenu(!props.isMenuOpen);
                  }
                }}
              >
                <Link to="/contests">Concursuri</Link>
              </li>
              <li
                onClick={() => {
                  if (props.isMenuOpen) {
                    props.toggleMenu(!props.isMenuOpen);
                  }
                }}
              >
                <Link to="/winners">Câștigători</Link>
              </li>
            </ul>
          </motion.nav>
        ) : (
          ""
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
