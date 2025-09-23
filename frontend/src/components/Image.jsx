import React, { useEffect, useState } from "react";

const ImageComponent = ({ src, width, height , className}) => {
    const [currentSrc, setCurrentSrc] = useState(`https://placehold.co/${width}x${height}?text=Loading`)
     useEffect(()=>{
        const img = new Image();
        img.src = src;
        img.onload = ()=>{
            setCurrentSrc(src)
        }
        return () => {
            img.onload = null;
        }
     },[src])
  return <img className={` ${className}`} src={currentSrc} width={width} height={height} />;
};

export default ImageComponent;
