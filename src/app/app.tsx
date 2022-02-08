import React from "react";
import { AppContextProvider, Page } from "../components/context/appContext";
import { Fade } from "../components/fade/fade";
import { Logo } from "../components/logo/logo";
import GameScreen from "../screens/gameScreen/gameScreen";
import { HomeScreen } from "../screens/homeScreen/homeScreen";
import { TutorialScreen } from "../screens/tutorialScreen/tutorialScreen";
import { useToggle } from "../util/hooks";
import { joinClassesConditionally } from "../util/utils";
import "../assets/fonts/Abel-Regular.ttf";
import "./app.scss";
import { LevelSelectionScreen } from "../screens/levelSelectionScreen/levelSelectionScreen";
import ChallengeScreen from "../screens/challengeScreen/challengeScreen";
import ScoreScreen from "../screens/scoreScreen/scoreScreen";

const getPage = (page: Page): JSX.Element => {
    switch (page) {
        case "home":
            return <HomeScreen />;
        case "tutorial":
            return <TutorialScreen />;
        case "level-selection":
            return <LevelSelectionScreen />;
        case "game-easy":
            return <GameScreen height={3} width={3} />;
        case "game-medium":
            return <GameScreen height={5} width={5} />;
        case "game-hard":
            return <GameScreen height={7} width={7} />;
        case "challenge":
            return <ChallengeScreen height={5} width={5} />;
        case "challenge-score":
            return <ScoreScreen />
    }
}

const lowLogoPages = ["home", "tutorial", "level-selection"];

export const App: React.FC = () => {
    const [page, setPage] = React.useState<Page>("home")
    const [isDarkMode, toggleDarkMode] = useToggle(false);
    const [isMuted, toggleMute] = useToggle(false);

    return <Fade durationFactor={2}>
        <AppContextProvider value={{
            page, setPage,
            isDarkMode, toggleDarkMode,
            isMuted, toggleMute,
        }}>
            <div className={
                joinClassesConditionally([
                    ["app unselectable-text", true],
                    ["darkmode-on", isDarkMode],
                ])
            }>
                <Logo upperCase={true} className={lowLogoPages.includes(page) ? "home-logo" : undefined} />
                {getPage(page)}
            </div>
        </AppContextProvider>
    </Fade>

}