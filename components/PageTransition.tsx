import React from 'react';
import { motion } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
