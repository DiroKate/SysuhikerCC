import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './LocalIcon.less';

const LocalIcon = ({ type, colorful, className }) => {
  const propsClassName = className;
  const csSvg = ClassNames({
    'colorful-icon': true,
  }, {
    [`${propsClassName}`]: className !== undefined,
  });

  if (colorful) {
    return (
      <svg className={csSvg} aria-hidden="true">
        <use xlinkHref={`#sysuhikericon-${type}`} />
      </svg>
    );
  }

  const csFont = ClassNames({
    sysuhiker: true,
  }, {
    [`sysuhikericon-${type}`]: true,
  }, {
    [`${propsClassName}`]: className !== undefined,
  });
  return <i className={csFont} />;
};

LocalIcon.propTypes = {
  type: PropTypes.string.isRequired,
  colorful: PropTypes.bool,
};
LocalIcon.defaultProps = {
  colorful: false,
};

export default LocalIcon;
