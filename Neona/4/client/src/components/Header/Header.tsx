import { ReactElement, FC } from "react";
import  styles from './header.module.css';

const Header:FC<any> = () : ReactElement =>{
    const handleAdd = () =>{

    }
    
    const handleRefresh = () =>{
    
    }
    
    const handleRemoveAll = () =>{
    
    }
    
    return(
        <div className={styles.header}>
            <div onClick={() => handleAdd()}>+</div>
            <div onClick={() => handleRefresh()}>refresh</div>
            <div onClick={() => handleRemoveAll()}>remove all</div>
        </div>
    )
}
//{data}

export default Header;