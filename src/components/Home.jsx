import { GiPodiumWinner } from "react-icons/gi";

function Home() {
  return (
    <div className="home">
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
    </div>
  );
}

export default Home;
