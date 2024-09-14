import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function Header() {
  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="header"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="header-subtitle" variants={itemVariants}>
        <h1>👋 Hi Brainiac,</h1>
        <FaUserAlt className="user-icon" />
      </motion.div>
      <motion.div className="header-title" variants={itemVariants}>
        <h1>Welcome to Brain-Buster Quiz!</h1>
      </motion.div>
    </motion.div>
  );
}

export default Header;
