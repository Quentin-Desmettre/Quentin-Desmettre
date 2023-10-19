import { useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Config from "../../assets/particlesjs-config.json"
import MountTransition from "../../components/common/MountTransition";

const Topper = () => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const containerRef = useRef(null);

    return (
        <MountTransition styleFrom={"opacity-0"} duration="duration-[1800ms]">
            <div ref={containerRef} className="relative flex flex-row items-center justify-center w-screen h-screen">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={Config}
                    container={containerRef}
                    className="w-full h-full absolute top-0 left-0 z-0 opacity-90"
                />
                <MountTransition styleFrom={"opacity-0 transform translate-y-20"} duration="duration-[1800ms]">
                    <div className="text-white flex flex-col mb-32">
                        <span className="text-4xl font-bold">
                            Quentin Desmettre
                        </span>
                        <span className="ml-1 mt-1">
                            Developpeur FullStack & Mobile
                        </span>
                    </div>
                </MountTransition>
            </div>
        </MountTransition>
    );
};

export default Topper;
