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

const getPage = (page: Page): JSX.Element => {
    switch (page) {
        case "home":
            return <HomeScreen />;
        case "tutorial":
            return <TutorialScreen />;
        case "game":
            return <GameScreen />;
    }
}

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
                <Logo />
                {getPage(page)}
            </div>
        </AppContextProvider>
    </Fade>

}