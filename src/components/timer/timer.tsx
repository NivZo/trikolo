import React from "react";
import "./timer.scss";

const msToTimeString = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export const Timer: React.FC = () => {
    const [time, setTime] = React.useState(0);

    React.useEffect(
        () => {
            setInterval(() => setTime(curr => curr + 1), 1000)
        },
        [],
    );
    
    return <div id="timer">
        {msToTimeString(time)}
    </div>
}