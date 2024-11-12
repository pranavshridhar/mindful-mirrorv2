import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

// BoxReveal component with animation
export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor = "#ffffff", // Set default box color if needed
  duration = 0.5,
  delay = 0.25,
}) => {
  const ref = useRef();
  const mainControls = useAnimation();

  React.useEffect(() => {
    mainControls.start("visible");
  }, [mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
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
      <motion.div
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: boxColor }}
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

// WelcomeMessage component to showcase the effect
const WelcomeMessage = () => {
  return (
    <BoxReveal width="100%" boxColor="#000" duration={0.7} delay={0.3}>
      <h1 style={{ color: "#fff", textAlign: "center" }}>Welcome to Mindful Mirror</h1>
    </BoxReveal>
  );
};

export default WelcomeMessage;
