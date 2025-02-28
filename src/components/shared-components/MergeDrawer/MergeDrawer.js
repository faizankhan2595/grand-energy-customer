import React from 'react'
import ReactDOM from 'react-dom'

// import component ?
import Drawer from 'react-modern-drawer'

//import styles ?
import 'react-modern-drawer/dist/index.css'

const MergeDrawer = (props) => {

   const {isOpen , onClose , direction , zIndex , size} = props;

    return (
        <>
            
            <Drawer open={isOpen} onClose={onClose} direction={direction} zIndex={zIndex} size={size}>
                {props.children};
            </Drawer>
        </>
    )
}

export default MergeDrawer