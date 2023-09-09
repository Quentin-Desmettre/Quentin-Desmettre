import React, { useRef, useState } from 'react'
import useMount from '../../utils/useMount'

const MountTransition = ({ children, styleFrom, styleTo, duration = "duration-1000", delay="delay-0", origin="" }) => {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef()
    let { className } = children.props;

    useMount(ref, () => setIsVisible(true), () => setIsVisible(false))
    className = `${className} transition-all ease-in-out ${delay} ${duration} ${isVisible ? styleTo : styleFrom} ${origin}`
    return React.cloneElement(children, { className: className, ref: ref })
}

export default MountTransition
