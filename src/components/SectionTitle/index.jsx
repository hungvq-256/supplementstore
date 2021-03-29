import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
SectionTitle.propTypes = {
    text: PropTypes.string,
};

function SectionTitle({ text }) {
    return (
        <>
            <h2 className="sectiontitle">{text}</h2>
        </>
    );
}

export default SectionTitle;