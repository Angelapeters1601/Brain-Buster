import { GiPodiumWinner } from "react-icons/gi";
import { motion } from "framer-motion";

function Home() {
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="home"
      initial="hidden"
      animate="visible"
      variants={slideInFromLeft}
    >
      <p>
        Unleash your inner genius and challenge your mind with our thrilling
        quiz app designed to test your knowledge across a range of exciting
        topics.
      </p>
      <br />
      <p>
        Break your limits, and see if you’ve got what it takes to be the
        ultimate Brain-Buster champion
        <GiPodiumWinner className="winner-icon" />
      </p>
    </motion.div>
  );
}

export default Home;
