import React from "react";
import './Scroll.css';

const Scroll=({children, width})=>{
    return (
        <div className={`scrollbar overflow-y-auto h-full w-[${width}]`}  id='style-1'
        >
            {children}
        </div>
    );
}

Scroll.defaultProps = {
    width: 'full'
}

export default Scroll;
