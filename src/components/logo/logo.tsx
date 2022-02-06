import React from "react";
import { joinClassesConditionally } from "../../util/utils";
import "./logo.scss";

type LogoProps = {
    className?: string,
    upperCase?: boolean,
}

export const Logo: React.FC<LogoProps> = ({
    className,
    upperCase,
}) => {
    const toCase = (text: string) => !!upperCase ? text.toUpperCase() : text;
    const viewBox = !!upperCase ? "40 55 192 75" : "20 55 192 75";
    return <div id="logo-container" className={joinClassesConditionally([
        ["logo", true],
        [className!, !!className],
    ])}>
        <svg id="logo-svg" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            <text style={{ fill: "rgb(51, 51, 51)", fontFamily: "Abel", fontSize: "52px", fontWeight: 700, letterSpacing: "4.9px", whiteSpace: "pre" }}>
                <tspan id="logo-tri" x="38.033" y="106.332">
                    {toCase("tri")}
                </tspan>
                <tspan id="logo-ko">
                    {toCase("ko")}
                </tspan>
                <tspan id="logo-l">
                    {toCase("l")}
                </tspan>
                <tspan id="logo-o">
                    {toCase("o")}
                </tspan>
            </text>
            <text id="logo-bracket" style={{ fontFamily: "Abel", fontSize: "52px", fontWeight: 700, whiteSpace: "pre" }} transform="matrix(0, 1.022663, -1, 0, 343.420685, -58.742149)" x="166.467" y="198.327">)</text>
        </svg>

        {/* <svg id="logo-svg" viewBox="37.639 55.549 161.427 73.319" xmlns="http://www.w3.org/2000/svg">
            <text style={{ fill: "rgb(51, 51, 51)", fontFamily: "Abel", fontSize: "52px", fontWeight: 700, letterSpacing: "4.9px", whiteSpace: "pre" }}><tspan x="38.033" y="106.332">tri</tspan><tspan style={{ fill: "rgb(251, 197, 95)" }}>ko</tspan><tspan style={{ fill: "rgb(149, 92, 255)" }}>l</tspan><tspan style={{ fill: "rgb(106, 213, 255)" }}>o</tspan></text>
            <text style={{ fill: "rgb(51, 51, 51)", fontFamily: "Abel", fontSize: "52px", fontWeight: 700, whiteSpace: "pre" }} x="166.467" y="198.327">{")"}</text>
            <path d="M 180.71115112304688 183.14341735839844 Q 180.71115112304688 187.35826110839844 179.89865112304688 191.01451110839844 Q 179.08615112304688 194.67076110839844 177.63888549804688 197.84458923339844 Q 176.19161987304688 201.01841735839844 174.19845581054688 203.72251892089844 Q 172.20529174804688 206.42662048339844 169.84396362304688 208.73716735839844 L 168.01583862304688 206.90904235839844 Q 170.12326049804688 204.75083923339844 171.87521362304688 202.13560485839844 Q 173.62716674804688 199.52037048339844 174.89669799804688 196.51158142089844 Q 176.16622924804688 193.50279235839844 176.87716674804688 190.15122985839844 Q 177.58810424804688 186.79966735839844 177.58810424804688 183.14341735839844 Q 177.58810424804688 179.48716735839844 176.87716674804688 176.13560485839844 Q 176.16622924804688 172.78404235839844 174.89669799804688 169.77525329589844 Q 173.62716674804688 166.76646423339844 171.87521362304688 164.15122985839844 Q 170.12326049804688 161.53599548339844 168.01583862304688 159.37779235839844 L 169.84396362304688 157.54966735839844 Q 172.20529174804688 159.86021423339844 174.19845581054688 162.56431579589844 Q 176.19161987304688 165.26841735839844 177.63888549804688 168.42955017089844 Q 179.08615112304688 171.59068298339844 179.89865112304688 175.24693298339844 Q 180.71115112304688 178.90318298339844 180.71115112304688 183.14341735839844 Z" transform="matrix(0, 1, -1, 0, 343.4206848144531, -54.96952819824219)" />
        </svg> */}
        {/* <b id="logo-tri">TRI</b><b id="logo-ko">KO</b><b id="logo-l">L</b><b id="logo-o">O</b> */}
    </div >
}