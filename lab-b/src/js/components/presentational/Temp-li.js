import React from "react";
import PropTypes from "prop-types";
const Templi = ({ day, main, max, min }) => (    
    <li>
        <h5>{day}</h5>
        <div>{main}</div>
        <p><span>{max}</span>°C</p>
        <p><span>{min}</span>°C</p>       
    </li>
);
Templi.propTypes = {
    day: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired
};
export default Templi;