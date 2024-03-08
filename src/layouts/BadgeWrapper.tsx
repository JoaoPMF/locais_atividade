import { useEffect, useState } from "react";

export const BadgeWrapper: React.FC<{isSmallScreen : boolean, setSelected : any, map_position : string, local: any, widthRatio: number, heightRatio: number, hiddenWidth: number, hiddenHeight: number, isSelected : boolean}> = (props) => {

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    //reposition badges
    useEffect(() => {
        const mapPosition = props.map_position.split(';');

        setTop((+mapPosition[1] * props.heightRatio) - props.hiddenHeight);
        setLeft((+mapPosition[0] * props.widthRatio) - props.hiddenWidth);

    }, [props.widthRatio, props.heightRatio, props.hiddenWidth, props.hiddenHeight, props.map_position]);

    function handleClick() {
        props.setSelected(props.local);
    }

    return (
        <div className="d-flex justify-content-center align-items-center" onClick={handleClick} style={{position:`absolute`, top:`${top}px`, left:`${left}px`, transformOrigin:`-50% -50%`}}>
            <div className={`map-point ${(props.isSelected ? `map-point-selected`: ``)}`}></div>
        </div>
    )
}