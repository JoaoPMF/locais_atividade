import { useEffect, useState } from 'react';
import noiseTexture from './..\\Images\\noise_texture.png';

export const LocationImage: React.FC<{ image: any}> = (props) => {
    const [height, setHeight] = useState(0);

    useEffect(()=> {
        const img = new Image();
        img.src = props.image;
        img.onload = () => {
            img.width = img.naturalWidth;
            img.height = img.naturalHeight;
            setHeight((img.naturalHeight*300)/img.naturalWidth);
        };
    },[props.image]);

    return (
        <div style={{
            width:`300px`,
            height:`${height}px`,
            borderRadius:`10px`,
            backgroundImage: 
            `radial-gradient(ellipse, #0000, #0007),
            linear-gradient(0deg, #9724, #9754),
            url(${noiseTexture}),
            url(${props.image})`,
            backgroundSize:`auto, auto, auto, cover`,
            backgroundRepeat:`repeat`,
            backgroundPosition:`center`,
            filter:`blur(0.03em) saturate(0.8) contrast(1.3) brightness(1.2)`
        }}/>
    )
}