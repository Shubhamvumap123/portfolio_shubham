"use client";

import React, { useEffect, useState } from 'react';
import { Flex, Text, Button, LetterFx, Arrow } from "@/once-ui/components";
import styles from './ModernHero.module.scss';

interface ModernHeroProps {
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaLink?: string;
}

export const ModernHero: React.FC<ModernHeroProps> = ({
    title = "Shubham Umap",
    description = "Transforming complex ideas into seamless digital experiences.",
    ctaLabel = "Execute Query",
    ctaLink = "/work"
}) => {
    const [time, setTime] = useState("");
    const [ping, setPing] = useState(24);
    const [typedText, setTypedText] = useState("");
    const fullText = description;

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
            setPing(Math.floor(Math.random() * (35 - 15) + 15));
        };
        update();
        const interval = setInterval(update, 1000);

        let i = 0;
        const typingInterval = setInterval(() => {
            setTypedText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(typingInterval);
        }, 30);

        return () => {
            clearInterval(interval);
            clearInterval(typingInterval);
        };
    }, [fullText]);

    return (
        <section className={styles.heroContainer}>
            {/* Cyber Background Layers */}
            <div className={styles.scanline} />
            <div className={styles.gridOverlay} />

            <div className={styles.terminalData}>
                <span>SECURE_CONNECTION: ESTABLISHED</span>
                <span>PROTOCOL: MERN_STACK_v2.0</span>
                <span>LATENCY: {ping}ms</span>
                <span>SYSTEM_TIME: {time}</span>
                <span>LOCATION: 19.0760° N, 72.8777° E</span>
            </div>

            {/* Hacker Glass Shell */}
            <div className={styles.cyberShell}>
                <div className={styles.glassTexture} />
                <div className={styles.topRight} />
                <div className={styles.corners} />

                {/* System Readout */}
                <div className={styles.systemStatus}>
                    <div className={styles.systemStatusItem}>
                        <span>STATUS:</span>
                        <span style={{ color: '#22c55e' }}>ONLINE // AVAILABLE</span>
                    </div>
                    <div className={styles.systemStatusItem}>
                        <span>CORE:</span>
                        <span>REACT_NODE_MERN</span>
                    </div>
                    <div className={styles.systemStatusItem}>
                        <span>AUTH:</span>
                        <span style={{ color: '#ef4444' }}>ENCRYPTED</span>
                    </div>
                </div>

                {/* Tech Tags */}
                <div className={styles.badgeStack}>
                    {["React.js", "Node.js", "TypeScript", "MongoDB", "Express"].map((tech) => (
                        <div key={tech} className={styles.badge}>
                            [{tech}]
                        </div>
                    ))}
                </div>

                <h1 className={styles.mainTitle} data-text={title}>
                    <LetterFx speed="slow" trigger="instant">
                        {title}
                    </LetterFx>
                </h1>

                <div className={styles.subline} style={{ height: '4em' }}>
                    {typedText}<span className={styles.cursor}>_</span>
                </div>

                <Flex gap="24" horizontal="center" mobileDirection="column" fillWidth>
                    <a href={ctaLink} className={styles.glitchButton} style={{ textDecoration: 'none' }}>
                        {ctaLabel}
                        <Arrow trigger="instant" />
                    </a>

                    <a href="/about" className={styles.secondaryButton} style={{ textDecoration: 'none' }}>
                        Access Logs
                    </a>
                </Flex>
            </div>

            {/* Bottom Deco */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}>
                <Text variant="body-default-xs" style={{ letterSpacing: '4px' }}>VER_0.1.0_LATEST</Text>
            </div>
        </section>
    );
};
