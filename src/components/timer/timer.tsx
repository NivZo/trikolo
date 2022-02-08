import React from "react";
import "./timer.scss";

type TimerProps = {
    isActive: boolean,
    stopwatch?: {
        seconds: number,
        onFinish: (secondsLeft: number) => void,
    }
}

const msToTimeString = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export const Timer: React.FC<TimerProps> = ({
    isActive,
    stopwatch,
}) => {
    const isStopwatch = !!stopwatch
    const [time, setTime] = React.useState(isStopwatch ? stopwatch.seconds : 0);
    const interval = React.useRef<NodeJS.Timeout>();
    const timeout = React.useRef<NodeJS.Timeout>();

    React.useEffect(
        () => {
            if (isActive) {
                setTime(isStopwatch ? stopwatch.seconds : 0);
                interval.current = setInterval(isStopwatch ?
                    () => {
                        setTime(curr => curr - 1);
                        timeout.current = setTimeout(
                            () => {
                                setTime(0);
                                if (!!interval.current) {
                                    clearInterval(interval.current);
                                }
                                stopwatch.onFinish(time);
                            },
                            stopwatch.seconds * 1000,
                        );
                    } :
                    () => setTime(curr => curr + 1),
                    1000,
                );
            } else if (!!interval.current) {
                clearInterval(interval.current);
                if (isStopwatch && !!timeout.current) {
                    clearTimeout(timeout.current)
                    stopwatch.onFinish(time)
                }
            }
        },
        [isActive],
    );

    return <div id="timer">
        {msToTimeString(time)}
    </div>
}