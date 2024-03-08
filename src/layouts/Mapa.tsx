import mapa from './..\\Images\\coimbra.png';
import mapa_pt from './..\\Images\\portugal.png';
import mapa_eu from './..\\Images\\europe.png';
import compass from './..\\Images\\compass.png';
import filmStrip from './..\\Images\\film_strip.png';
import locations from './..\\Data\\atividades.json';
import up from './..\\Images\\chevron-up.svg';
import down from './..\\Images\\chevron-down.svg';

import { useEffect, useRef, useState } from 'react';
import { BadgeWrapper } from './BadgeWrapper';
import LocalModel from '../models/LocalModel';
import AtividadeModel from '../models/AtividadeModel';
import { LocationImage } from './LocationImage';
import { ActivityDetail } from './ActivityDetail';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

export const Mapa = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [widthRatio, setWidthRatio] = useState(0);
    const [heightRatio, setHeightRatio] = useState(0);
    const [hiddenWidth, setHiddenWidth] = useState(0);
    const [hiddenHeight, setHiddenHeight] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocalModel>();
    const [selectedLocationIndex, setSelectedLocationIndex] = useState<number>(0);
    const [selectedLocationPhotos, setSelectedLocationPhotos] = useState<any[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<LocalModel[]>([]);
    const [heightFilmStrip, setHeightFilmStrip] = useState("-100%");
    const [mapScale, setMapScale] = useState("distrital");
    const [mapSrc, setMapSource] = useState(mapa);
    const [inAnimation, setInAnimation] = useState(false);

    //calculate new map dimensions on resize
    useEffect(() => {
        function handleResize() {
            if (imageRef.current) {
                const imageRect = imageRef.current.getBoundingClientRect();
                const visibleHeight = (imageRect.width * imageRef.current.naturalHeight) / imageRef.current.naturalWidth;
                setWidthRatio(imageRect.width / imageRef.current.naturalWidth);
                setHeightRatio(visibleHeight / imageRef.current.naturalHeight);
                setHiddenWidth((imageRect.width - window.innerWidth) / 2);
                setHiddenHeight((visibleHeight - window.innerHeight) / 2);
                setIsSmallScreen(window.innerWidth < 767 ? true : false);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imageLoaded]);

    //parse locations from data file
    useEffect(() => {
        setFilteredLocations(locations.map((location) => {
            return new LocalModel(
                location.local,
                location.nivel,
                location.sede,
                location.atividades.map((atividade) => {
                    return new AtividadeModel(
                        atividade.nome,
                        atividade.seccao,
                        atividade.data,
                        atividade.noites,
                        atividade.participantes
                    )
                }),
                (location.coordenadas ? location.coordenadas : "")
            )
        }).filter((location) => location.nivel === mapScale));
    },[mapScale])

    //select first location
    useEffect(() => {
        setSelectedLocation(filteredLocations[selectedLocationIndex]);
    },[filteredLocations,selectedLocationIndex]);

    //get images for selected location and set animation variables
    useEffect(() => {
        if (!selectedLocation || !imageContainerRef.current || !progressRef.current)
            return;
        
        imageContainerRef.current.classList.remove('scroll_animation');
        imageContainerRef.current.classList.add('rewind_animation');
        progressRef.current.classList.remove('progress_animation');
        progressRef.current.classList.add('progress_rewind_animation');
        
        let tempImages: any[] = []
        const images = require.context(`./..\\..\\Images\\Locais`,true);
        if (images != null) {
            images.keys().forEach(image => {
                const imageFolderSplit = image.split("/");
                if (imageFolderSplit[1] === selectedLocation.local)
                    tempImages.push(images(image));
            });
            setSelectedLocationPhotos(tempImages);
        }

        const lastPictureHeight = 225 * tempImages.length + 84 * selectedLocation.atividades.length + 25 * tempImages.length + 25 * selectedLocation.atividades.length;
        const filmStripHeight = 10 * window.innerHeight;
        
        setHeightFilmStrip(`-${100 * (lastPictureHeight - (window.innerHeight/3)) / filmStripHeight}%`);
        
    },[selectedLocation]);

    function onImageLoad() {
        setImageLoaded(true);
    }

    function onAnimationEnd(e : any){
        if (!imageContainerRef.current || !progressRef.current || !imageRef.current)
            return;
        if (e.animationName === 'scroll') {
            imageContainerRef.current.classList.remove('scroll_animation');
            progressRef.current.classList.remove('progress_animation');
            imageContainerRef.current.classList.add('rewind_animation');
            progressRef.current.classList.add('progress_rewind_animation');
            if(selectedLocationIndex + 1 >= filteredLocations.length){
                if(mapScale === "distrital"){
                    setMapScale("nacional");
                    setMapSource(mapa_pt);
                }else if(mapScale === "nacional"){
                    setMapScale("internacional");
                    setMapSource(mapa_eu);
                }else {
                    setMapScale("distrital");
                    setMapSource(mapa);
                }
                imageRef.current.classList.add('zoom_out_animation');
                setInAnimation(true);
                setSelectedLocationIndex(0);
            } else {
                setSelectedLocationIndex(selectedLocationIndex+1);
            }
        } else {
            imageContainerRef.current.classList.remove('rewind_animation');
            progressRef.current.classList.remove('progress_rewind_animation');
            const timer = setTimeout(() => {
                if (!imageContainerRef.current || !progressRef.current)
                    return;
                imageContainerRef.current.classList.add('scroll_animation');
                progressRef.current.classList.add('progress_animation');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }

    function onMapAnimationEnd(e : any){
        if (!imageRef.current)
            return;
        if (e.animationName === 'zoom_out') {
            imageRef.current.classList.remove('zoom_out_animation');
            imageRef.current.classList.add('zoom_in_animation');
        } else {
            setInAnimation(false);
            imageRef.current.classList.remove('zoom_in_animation');
        }
    }

    function handleClickUp() {
        if (!imageRef.current)
            return;

        if(mapScale === "distrital"){
            setMapScale("nacional");
            setMapSource(mapa_pt);
        }else if(mapScale === "nacional"){
            setMapScale("internacional");
            setMapSource(mapa_eu);
        }else {
            setMapScale("distrital");
            setMapSource(mapa);
        }
        imageRef.current.classList.add('zoom_out_animation');
        setInAnimation(true);
        setSelectedLocationIndex(0);
    }

    function handleClickDown() {
        console.log("asdjansjkd");
        if (!imageRef.current)
            return;

        if(mapScale === "distrital"){
            setMapScale("internacional");
            setMapSource(mapa_eu);
        }else if(mapScale === "nacional"){
            setMapScale("distrital");
            setMapSource(mapa);
        }else {
            setMapScale("nacional");
            setMapSource(mapa_pt);
        }
        imageRef.current.classList.add('zoom_out_animation');
        setInAnimation(true);
        setSelectedLocationIndex(0);
    }
    
    return (
        <>
            <section>
                <div className="pos-rel">
                    <img className="position-absolute" alt="" src={compass} style={{top:`50px`, left:`50px`, width:`101px`, height:`103px`}}/>
                    <div className="position-absolute" style={{bottom:`50px`, left:`50px`}}>
                        <div style={{border:`1px solid #FDCC01`, height:`10px`, width:`200px`}}>
                            <div style={{backgroundColor:`#FDCC01`, height:`8px`, width:`100px`}}></div>
                            <div style={{width:`100px`, height:`8px`}}></div>
                        </div>
                        <span style={{color:`#FDCC01`}}>0</span>
                        <span style={{color:`#FDCC01`, marginLeft:`85px`}}>{mapScale === "distrital" ? 15 : mapScale === "nacional" ? 65 : 240}</span>
                        <span style={{color:`#FDCC01`, marginLeft:`75px`}}>{mapScale === "distrital" ? 30 : mapScale === "nacional" ? 130 : 480}Km</span>
                    </div>
                    <div className="position-absolute" style={{top:`${(window.innerHeight/2)-200}px`, right:`70px`}}>
                        <div style={{border:`1px solid #FDCC01`, width:`5px`, height:`400px`}}>
                            <div ref={progressRef} className="progress_animation" style={{backgroundColor:`#FDCC01`, width:`3px`, height: `0%`}}></div>
                        </div>
                    </div>
                    <div className='vstack position-absolute' style={{top:`${(window.innerHeight/2)-200}px`, left:`100px`}}>
                        <div onClick={handleClickUp}>
                            <img src={up} alt=""/>
                        </div>
                        <div onClick={handleClickDown}>
                            <img src={down} style={{color:`#FDCC01`, zIndex:`99`}} alt="" width="32" height="32"/>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center position-relative" id="container-map">
                        <img ref={imageRef} onAnimationEnd={onMapAnimationEnd} className="d-xl-flex flex-shrink-0" id="map" alt="" src={mapSrc} onLoad={onImageLoad}/>
                        <div ref={imageContainerRef} onAnimationEnd={onAnimationEnd} className="vstack position-absolute gap-4 pt-5 align-items-center" 
                            style={{
                                right:`50px`, 
                                height:`1000vh`, 
                                width:`650px`, 
                                backgroundImage:`url(${filmStrip})`, 
                                backgroundRepeat:`repeat-y`, 
                                backgroundSize:`contain`,
                                "--animation-percentage":`${heightFilmStrip}`,
                            }}>
                            <h2 style={{fontFamily:`"Homemade Apple", cursive`, color:`#FDCC01`, width:`350px`, textAlign:`center`}}>{selectedLocation?.local}</h2>
                            {
                                selectedLocation?.atividades.map((activity) => {
                                    return <ActivityDetail key={`${activity.nome}_${activity.data}_${activity.participantes}`} activityDetail={activity}/>
                                })
                            }
                            {
                                selectedLocationPhotos.map( (image) => {
                                    return <LocationImage key={image} image={image}/>
                                })
                            }
                        </div>
                        {
                            !inAnimation &&
                            filteredLocations.map((location) => {
                                return (
                                        <BadgeWrapper key={location.local} isSmallScreen={isSmallScreen} setSelected={setSelectedLocation} 
                                        map_position={location.coordenadas} local={location} widthRatio={widthRatio} heightRatio={heightRatio} 
                                        hiddenWidth={hiddenWidth} hiddenHeight={hiddenHeight} isSelected={location.local===selectedLocation?.local}/>
                                    )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    );
} 