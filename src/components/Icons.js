import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const Icons = props => {
  return (
    <SvgIcon {...props}>
      <path d={props.path} />
    </SvgIcon>
  );
}

export default Icons;
