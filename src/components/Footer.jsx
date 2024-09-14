import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.div
      className="footer"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2>Brain-Buster Quiz By Angela &copy; 2024</h2>
    </motion.div>
  );
}

export default Footer;
