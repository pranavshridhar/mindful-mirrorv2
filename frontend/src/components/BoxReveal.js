// src/components/BoxReveal.js
import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor = "#000",   // Default box color
  duration = 0.7,      // Default duration for animation
  delay = 0.3,         // Default delay before animation starts
}) => {
  const ref = useRef();
  const mainControls = useAnimation();

  useEffect(() => {
    // Start the animation on component mount
    mainControls.start("visible");
  }, [mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      {/* Content to reveal */}
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration, delay, ease: "easeInOut" }}
      >
        {children}
      </motion.div>

      {/* Sliding box effect */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: boxColor,
        }}
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        transition={{ duration, delay, ease: "easeInOut" }}
      />
    </div>
  );
};

BoxReveal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOf(["fit-content", "100%"]),
  boxColor: PropTypes.string,
  duration: PropTypes.number,
  delay: PropTypes.number,
};
