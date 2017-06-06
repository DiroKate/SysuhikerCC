import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './LocalIcon.less';

const LocalIcon = ({ type, colorful, className }) => {
  const propsClassName = className;

  const cs = ClassNames(
    { 'colorful-icon': true },
    { [`${propsClassName}`]: className !== undefined },
  );

  if (colorful) {
    return (
      <svg className={cs} aria-hidden="true">
        <use xlinkHref={`#sysuhikericon-${type}`} />
      </svg>
    );
  }
  return <i className={`sysuhiker sysuhikericon-${type}`} />;
};

LocalIcon.propTypes = {
  type: PropTypes.string,
  colorful: PropTypes.bool,
};

export default LocalIcon;
