import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import ReactLink from 'react-router/lib/Link';

class Link extends Component {
  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ])
  }

  render() {
    const { to, children, className, ...props } = this.props;
    return (
      <ReactLink to={to} className={cx(className || [])} {...props}>
        { children }
      </ReactLink>
    );
  }
}

export default Link;
