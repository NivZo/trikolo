import React from "react";
import { joinClassesConditionally } from "../../util/utils";
import "./tactileButton.scss";

type TactileButtonProps = {
    className?: string,
    onClick?: () => void,
}

export const TactileButton: React.FC<TactileButtonProps> = ({
    className,
    onClick,
    children,
}) => {
    return <div
        className={joinClassesConditionally([
            ["tactile-button", true],
            ["unselectable-text", true],
            [className!, !!className],
        ])}
        onClick={onClick}>{children}</div>;
}