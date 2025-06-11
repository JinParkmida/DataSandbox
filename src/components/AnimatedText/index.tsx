import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import classnames from "classnames";

// Word wrapper
const Wrapper = (props: {children: ReactNode | null }) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span className="word-wrapper">{props.children}</span>;
};

// Map API "type" values to JSX tag names
const tagMap: any = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
};

interface AnimatedCharactersProps {
  type: string,
  text: string
}
// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
const AnimatedCharacters = (props: AnimatedCharactersProps) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: props.type === "paragraph" ? 0.2 : 0.75 }
    }
  };

  //  Split each word of props.text into an array
  const splitWords: any = props.text.split(" ");

  // Create storage array
  const words: any[] = [];

  // Push each word into words array
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0");
  });

  // Get the tag name from tagMap
  const Tag = tagMap[props.type];

  return (
    <Tag className={classnames({
      'text-2xl 2xl:text-3xl mb-2': props.type === "heading1",
      'text-lg font-light': props.type === "paragraph",
    })}>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element: string, index: number) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block"
                  }}
                  key={index}
                >
                  <motion.span
                    style={{ display: "inline-block" }}
                    variants={item}
                  >
                    {element}
                  </motion.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
      {/* {} */}
    </Tag>
  );
};

export default AnimatedCharacters;
