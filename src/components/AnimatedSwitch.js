import React from "react";
import { Switch } from "react-router-dom";
import posed, { PoseGroup } from "react-pose";

const RoutesContainer = posed.div({
  enter: {
    opacity: 1,
    delay: 300,
    beforeChildren: true
  },
  exit: { opacity: 0 }
});

export const AnimatedSwitch = ({ history, location, children, ...rest }) => {
  return (
    <PoseGroup>
      <RoutesContainer key={location.key} >
        <Switch location={location} {...rest}>
          {children}
        </Switch>
      </RoutesContainer>
    </PoseGroup>
  );
};

export default AnimatedSwitch;
