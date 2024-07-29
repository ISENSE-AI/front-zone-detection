import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

//cambiar pop up por algo mas local sobre el video por ej
function Stream({ src }) {
    const videoRef = useRef(null);
    const [isDelayed, setDelayed] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const hls = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            hls.current = new Hls();
            hls.current.loadSource(src);
            hls.current.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
        }

        const checkDelay = () => {
            if (videoRef.current && videoRef.current.buffered.length > 0) {
                const livePosition = videoRef.current.duration;
                const delay = livePosition - videoRef.current.currentTime;

                
                setDelayed(delay > 4);

                /*if (delay > 15 && !showPopup) {
                    alert("El video está retrasado más de 15 segundos.");
                    //setShowPopup(true);
                } else {
                    setShowPopup(false);
                }

                if (delay > 3) {
                    videoRef.current.currentTime = livePosition;
                }*/
            } 
        };

        const interval = setInterval(checkDelay, 1000);

        return () => {
            if (hls.current) {
                hls.current.destroy();
            }
            clearInterval(interval);
        };
    }, [src, showPopup]);

    return (
        <div className="relative w-full">
            <video ref={videoRef} className="w-full h-auto aspect-video" autoPlay muted />
            
            
        </div>
    );
}

export default Stream;
