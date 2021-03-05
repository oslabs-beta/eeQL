import React, { useContext } from 'react';
import GridLayout from 'react-grid-layout';
import "../Home/Home.scss"

import CodeEditor from '../CodeEditor/CodeEditor';
import FileTree from '../FileTree/FileTree';
import FileUpload from '../FileUpload/FileUpload';



const Home = () => {
    return (
        <GridLayout className="layout" cols={3} rowHeight={30} width={1200}>
        <div 
        key="a" 
        data-grid={{
          x: 0, 
          y: 0, 
          w: 1, 
          h: 2, 
          static: false
        }}>
          <FileUpload/>
        </div>
        <div 
        key="b" 
        data-grid={{
          x: 1, 
          y: 0, 
          w: 3, 
          h: 2, 
          minW: 2, 
          maxW: 4,
          static: false
        }}>
          <FileTree/>
        </div>
        <div 
        key="c" 
        data-grid={{
          x: 4, 
          y: 0, 
          w: 1, 
          h: 2,
          minW: 1, 
          maxW: 1,
          static: false
        }}>
          <CodeEditor/>
        </div>
      </GridLayout>
    )
}


export default Home