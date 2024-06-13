import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';

import './MyCard.css'

export type Props = {
  className?: string,
  children?: React.ReactNode
}

const MyCard = ({className,children}: Props) => (
        <Card className={`layout_card ${className}`} >
          {children}
        </Card>
);

MyCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}


export default MyCard;

