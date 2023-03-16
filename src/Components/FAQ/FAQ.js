import "../../Styles/FAQ.scss";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useRef } from "react";

const faqQuestions = [
  [
    "De ce e Robert atat de prost?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra  maecenas accumsan lacus vel facilisis.",
  ],
  [
    "What will the payment reflect as on my credit card statement?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra  maecenas accumsan lacus vel facilisis.",
  ],
  [
    "Why am I unable to deposit funds via credit card on your website?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra  maecenas accumsan lacus vel facilisis.",
  ],
  [
    "Am I allowed to withdraw my deposit?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra  maecenas accumsan lacus vel facilisis.",
  ],
  [
    "Which payment methods are accepted by Rifa Lottos?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra  maecenas accumsan lacus vel facilisis.",
  ],
];

const questionVariants = {
  closed: {
    height: "0px",
  },
  open: {
    height: "fit-content",
  },
};

function FAQCard(props) {
  const questionControls = useAnimation();
  const [isOpen, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("click", (event) => {
      if (event.target != ref.current && event.target.className == "faq-card") {
        questionControls.start("closed");
        setOpen(false);
      }
    });
  }, [props]);

  return (
    <motion.div
      className="faq-card"
      id={"CARD" + props.index}
      onClick={() => {
        if (isOpen) {
          questionControls.start("closed");
        } else {
          questionControls.start("open");
        }
        setOpen(!isOpen);
      }}
      ref={ref}
    >
      <p className="question">{props.question}</p>
      <motion.div
        variants={questionVariants}
        initial={"closed"}
        animate={questionControls}
        className="wrapper"
      >
        <p className="answer">{props.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <motion.div
      className="faq-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="faq-title-wrapper">
        <h2>Tu ai întrebări</h2>
        <h1>NOI AVEM RĂSPUNSURI</h1>
        <p>
          Dacă nu ai găsit răspunsul la întrebarea ta, nu ezita să ne trimiți un
          email!
        </p>
      </div>
      {faqQuestions.map((question, index) => {
        return (
          <FAQCard
            question={question[0]}
            answer={question[1]}
            key={index}
            index={index}
          ></FAQCard>
        );
      })}
    </motion.div>
  );
}
