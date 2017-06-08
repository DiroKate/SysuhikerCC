import React from 'react';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';

function Avatar(props) {
  const { custom } = props;
  const { ...rest } = props;

  if (custom) {
    delete rest.email;
    delete rest.md5;
    delete rest.rating;
    delete rest.default;
    delete rest.protocol;
    delete rest.custom;
    return (
      <img
        src={props.path}
        alt="User Avatar"
        style={props.style}
        height={props.size}
        width={props.size}
        {...rest}
      />
    );
  } else {
    delete rest.custom;
    delete rest.path;
    return (
      <Gravatar {...rest} />
    );
  }
}
Avatar.PropTypes = {
  email: PropTypes.string,
  md5: PropTypes.string,
  size: PropTypes.number,
  rating: PropTypes.string,
  default: PropTypes.string,
  className: PropTypes.string,
  protocol: PropTypes.string,
  style: PropTypes.object,
  path: PropTypes.string,
  custom: PropTypes.bool,
};
Avatar.defaultProps = {
  size: 50,
  rating: 'g',
  default: 'monsterid',
  protocol: '//',
  path: '',
  custom: false,
};
export default Avatar;
