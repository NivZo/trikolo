import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FadeProps = {
    durationFactor?: number,
}

export const Fade: React.FC<FadeProps> = ({
    children,
    durationFactor,
}) => {
    return <AnimatePresence exitBeforeEnter >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 * (durationFactor ? durationFactor : 1) }}
        >
            {children}
        </motion.div>
    </AnimatePresence>
}