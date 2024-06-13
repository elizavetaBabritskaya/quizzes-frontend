import React, {MouseEventHandler} from 'react';
import {Button} from 'antd';


import './MyButton.css';


export type Props = {
  className: string,
  children: React.ReactNode,
  onChange?: MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean,
  block?: boolean,
  type?: "primary" | "text" | "link" | "ghost" | "default" | "dashed"
}


const MyButton = ({className, children, onChange, disabled, block, type } : Props) => {
  return(
    <Button  type={type} className={`button ${disabled ? `button_disabled ${className}`  : `${className}`}`} block={block} disabled={disabled} onClick={onChange as MouseEventHandler}>
      {children}
     </Button>)
  };

export default MyButton;
