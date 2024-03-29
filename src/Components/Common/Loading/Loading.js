import React from 'react';
import './Loading.css';
import PropTypes from 'prop-types';

const Loading = ({width,height}) => {
    return (
        <div className="Loading" style={{width,height}} />
    )
};

Loading.defaultProps = {
    width: "28px",
    height: "28px"
}

Loading.prototype = {
    width: PropTypes.string,
    height: PropTypes.string
}
export default Loading;