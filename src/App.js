import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const images = [
  "head-witch.png",
  "super-miner.png",
  "elitebarbarian.png",
  "ice-hound.png",
  "super-bowler.png",
  "head-witch.png",
  "super-bowler.png",
  "electro-titan.png",
  "super-miner.png",
  "elitebarbarian.png",
  "elitearcher.png",
  "super-wizard.png",
  "super-wizard.png",
  "electro-titan.png",
  "ice-hound.png",
  "elitearcher.png",
];

export default function App() {
  const [openCards, setOpenCards] = useState([]);
  // const [hadWin, setWin] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]);

  function handleFlip(cardIndex) {
    if (openCards.length < 3) {
      setOpenCards((prev) => [...prev, cardIndex]);
    }
    // } else {
    //   if (hadWin) {
    //     setOpenCards((prev) => [...prev, cardIndex]);
    //   } else {
    //     console.log("a");
    //   }
    // }
  }

  useEffect(
    function () {
      function checkWin() {
        if (
          images[openCards[openCards.length - 1]] ===
          images[openCards[openCards.length - 2]]
        ) {
          setMatchedCards((prev) => [
            ...prev,
            openCards[openCards.length - 1],
            openCards[openCards.length - 2],
          ]);
          setOpenCards([]);
        } else if (openCards.length === 3) {
          setTimeout(() => setOpenCards([]), 1000);
        }
      }
      if (openCards.length > 1) {
        checkWin();
      }
    },
    [openCards]
  );

  return (
    <div className="main-container">
      <motion.ul
        className="cards-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {images.map((imageName, index) => (
          <Card
            key={index}
            imageName={imageName}
            openCards={openCards}
            index={index}
            handleFlip={handleFlip}
            matchedCards={matchedCards}
          />
        ))}
      </motion.ul>
    </div>
  );
}

function Card({ imageName, openCards, index, handleFlip, matchedCards }) {
  const matched = matchedCards.includes(index);
  const isOpen = openCards.includes(index) || matched;
  return (
    <motion.li
      className={matched ? "card matched" : "card"}
      variants={item}
      onClick={() => handleFlip(index)}
    >
      {isOpen ? <FrontSide imageName={imageName} /> : <BackCard />}
    </motion.li>
  );
}

function BackCard() {
  return <img className="card-image" src="images/snowflake.png" alt="as"></img>;
}

function FrontSide({ imageName }) {
  return (
    <img className="card-image" src={`images/${imageName}`} alt="as"></img>
  );
}
