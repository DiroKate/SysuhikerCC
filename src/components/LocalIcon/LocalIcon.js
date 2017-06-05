import React from 'react';
import PropTypes from 'prop-types';
import './LocalIcon.less';

const LocalIcon = ({ type, colorful, className }) => {
  if (colorful) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: `<svg class="colorful-icon" aria-hidden="true"><use xlink:href="#sysuhikericon-${type}"></use></svg>`,
        }}
      />);
  }
  return <i className={`sysuhiker sysuhikericon-${type}`} />;
};

LocalIcon.propTypes = {
  type: PropTypes.string,
  colorful: PropTypes.bool,
};

export default LocalIcon;
