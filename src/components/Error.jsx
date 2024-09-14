import { motion } from "framer-motion";

function Error() {
  // Animation variants for the entire error container
  const containerVariants = {
    hidden: { opacity: 0, y: -20 }, // Start off-screen (above)
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2, // Stagger the appearance of child elements
      },
    },
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Start below with no opacity
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="error-msg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="error-icon" variants={itemVariants}>
        <span role="img" aria-label="explosion">
          💥
        </span>
      </motion.div>
      <motion.h2 variants={itemVariants}>Something went wrong 💣</motion.h2>
      <motion.p variants={itemVariants}>
        Oops! We encountered an issue while retrieving quiz data. Please try
        again later. If the problem persists, kindly reach out to our support
        team for assistance.
      </motion.p>
      <motion.button
        className="retry-btn"
        onClick={() => window.location.reload()}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Retry
      </motion.button>
    </motion.div>
  );
}

export default Error;
