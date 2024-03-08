
import { useEffect, useState } from "react";

import lobitos from './..\\Images\\Sections\\lobitos.svg';
import exploradores from './..\\Images\\Sections\\exploradores.svg';
import pioneiros from './..\\Images\\Sections\\pioneiros.svg';
import caminheiros from './..\\Images\\Sections\\caminheiros.svg';
import chefes from './..\\Images\\Sections\\chefes.svg';

export const SectionIcon: React.FC<{ section : number}> = (props) => {
    const [icon, setIcon] = useState<string>();

    useEffect(() => {
        switch(props.section){
            case 1:
                setIcon(lobitos);    
                break;
            case 2:
                setIcon(exploradores);   
                break;
            case 3:
                setIcon(pioneiros);    
                break;
            case 4:
                setIcon(caminheiros);    
                break;
            case 5:
                setIcon(chefes);    
                break;
        }
    }, [props]);
    
    return (
        /*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8"/>
        </svg>*/
        <img src={icon} alt="" className="mr-10" width="16" height="16"/>               
    )
}