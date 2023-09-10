import { useCallback, useRef } from "react";
import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import Config from "../../assets/particlesjs-config.json"

const Topper = () => {
    // const particlesInit = useCallback(async engine => {
    //     console.log(engine);
    //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    //     // starting from v2 you can add only the features you need reducing the bundle size
    //     //await loadFull(engine);
    //     await loadSlim(engine);
    // }, []);

    // const particlesLoaded = useCallback(async container => {
    //     await console.log(container);
    // }, []);

    // const containerRef = useRef(null);

    // return (
    //     <div ref={containerRef} className="opacity-20">
    //         <Particles
    //             id="tsparticles"
    //             init={particlesInit}
    //             loaded={particlesLoaded}
    //             options={Config}
    //             container={containerRef}
    //             className="w-32 h-32"
    //             width="50"
    //             height="50"
    //         />
    //     </div>
    // );
    return <></>
};

export default Topper;
