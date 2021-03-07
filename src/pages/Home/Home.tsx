import React, { useContext } from 'react';
import GridLayout from 'react-grid-layout';
import "./Home.scss"

import CodeEditor from '../../components/CodeEditor/CodeEditor';
import FileTree from '../../components/FileTree/FileTree';
import NavBar from '../../components/NavBar/NavBar'
import TestBuilder from '../../components/TestSuite/TestBuilder/TestBuilder'


const Home = () => {
    return (
        <div className='home-border'>
        <NavBar></NavBar>
        <div className='grid-border'>
        <GridLayout className="layout" cols={3} rowHeight={25} width={1800}>
        <div 
        key="a" 
        data-grid={{
          x: 0, 
          y: 0, 
          w: 1, 
          h: 18, 
          static: true,
        }}>
          <FileTree/>
        </div>
        <div 
        key="b" 
        data-grid={{
          x: 1, 
          y: 0, 
          w: 1, 
          h: 18, 
          static: true,
        }}>
          <TestBuilder/>
        </div>
        <div 
        key="c" 
        data-grid={{
          x: 2, 
          y: 0, 
          w: 1, 
          h: 18.5,
          minW: 1, 
          maxW: 1,
          static: true,
        }}>
          <CodeEditor/>
        </div>
      </GridLayout>
      </div>
      </div>
    )
}


export default Home
