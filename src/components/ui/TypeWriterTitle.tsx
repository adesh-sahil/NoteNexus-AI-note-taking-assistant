"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("seamless note-taking.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("organize thoughts.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("supercharged productivity with ease.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
