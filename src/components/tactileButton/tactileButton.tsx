import React from "react";
import { clickAudio } from "../../assets/sounds/audio";
import { joinClassesConditionally } from "../../util/utils";
import { AppContext } from "../context/appContext";
import "./tactileButton.scss";

type TactileButtonProps = {
    enabled?: boolean,
    className?: string,
    onClick?: () => void,
}

export const TactileButton: React.FC<TactileButtonProps> = ({
    enabled,
    className,
    onClick,
    children,
}) => {
    const { isMuted } = React.useContext(AppContext);
    enabled = enabled !== undefined ? enabled : true;

    return <div
        className={joinClassesConditionally([
            ["tactile-button", true],
            ["enabled", enabled],
            ["disabled", !enabled],
            [className!, !!className],
        ])}
        onMouseUp={() => {
            if (!!onClick && !!enabled) { onClick() };
            if (!isMuted) {
                clickAudio.load();
                clickAudio.play();
            }
        }}>{children}</div>;
}