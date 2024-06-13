import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Layout} from 'antd';
import MyHeader from '../../components/MyHeader/MyHeader';
import CardRules from '../../components/CardRules/CardRules';
import { RootState } from '../../store/store';

import './MyLayout.css';

const {Content} = Layout;

export type Props = {
  children: React.ReactNode
}

const MyLayout = ({children}:Props) => (
    
      <Layout className="layout">
        <MyHeader></MyHeader>
        <Content className='layout_content'>
          {children}   
        </Content>
      </Layout>
  );



export default MyLayout;
