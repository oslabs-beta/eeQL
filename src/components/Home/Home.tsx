import React, { useContext } from 'react';
import GridLayout from 'react-grid-layout';
import "../Home/Home.scss"

import CodeEditor from '../CodeEditor/CodeEditor';
import FileTree from '../FileTree/FileTree';
import FileUpload from '../FileUpload/FileUpload';



const Home = () => {
    return (
        <GridLayout className="layout" cols={3} rowHeight={770} width={1200}>
        <div 
        key="b" 
        data-grid={{
          x: 0, 
          y: 1, 
          w: 1, 
          h: 1, 
          static: false,

        }}>
          <FileTree/>
        </div>
        <div 
        key="c" 
        data-grid={{
          x: 2, 
          y: 2, 
          w: 1, 
          h: 1,
          static: false,

        }}>
          <CodeEditor/>
        </div>
      </GridLayout>
    )
}


export default Home