import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ input }) => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    const typeCharacters = async () => {
      for (let i = 0; i < input.length; i++) {
        await setOutput((prevOutput) => prevOutput + input.charAt(i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    };

    typeCharacters();
  }, [input]);

  return <span>{output}</span>;
};

export default TypingAnimation;
