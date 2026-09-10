"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export interface WordStyleRule {
  words: string[];
  className: string;
}

export interface WordsPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: keyof JSX.IntrinsicElements;
  rules?: WordStyleRule[];
  onComplete?: () => void;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0.1,
  stagger = 0.05,
  as: Component = "h1",
  rules = [],
  onComplete,
}) => {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : stagger,
        delayChildren: isReduced ? 0 : delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: isReduced ? 0 : 28,
      opacity: 0,
      filter: isReduced ? "none" : "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: isReduced ? 0.01 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const getWordClasses = (word: string) => {
    const cleaned = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    for (const rule of rules) {
      if (
        rule.words.some(
          (w) => w.toLowerCase() === cleaned || w.toLowerCase() === word.toLowerCase()
        )
      ) {
        return rule.className;
      }
    }
    return "";
  };

  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onAnimationComplete={onComplete}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => {
        const specialStyle = getWordClasses(word);
        return (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className={`inline-block mr-[0.26em] ${wordClassName} ${specialStyle}`}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
};

export const WordsPullUpMultiStyle: React.FC<
  WordsPullUpProps & {
    highlightWords?: string[];
    highlightClassName?: string;
  }
> = ({
  highlightWords = [],
  highlightClassName = "text-transparent bg-clip-text bg-gradient-to-r from-starlight-pure via-celestial-cyan to-[#7cfbe9]",
  ...props
}) => {
  const rules: WordStyleRule[] = [
    {
      words: highlightWords,
      className: highlightClassName,
    },
    ...(props.rules || []),
  ];

  return <WordsPullUp {...props} rules={rules} />;
};
