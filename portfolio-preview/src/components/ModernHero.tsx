"use client";

import React from 'react';
import { Flex, Text, Column, Button, Heading, LetterFx, Arrow } from "@/once-ui/components";
import styles from './ModernHero.module.scss';

export const ModernHero = ({
    title = "Building the Future",
    description = "I create digital experiences that merge art with code.",
    ctaLabel = "Explore Work",
    ctaLink = "/work"
}) => {
    return (
        <Column
            fillWidth
            horizontal="center"
            vertical="center"
            padding="xl"
            style={{
                minHeight: '600px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-l)',
                border: '1px solid var(--neutral-border-weak)'
            }}
        >
            {/* Animated Gradient Background */}
            <div className={styles.gradientBg} />
            <div className={styles.meshGrid} />

            {/* Glass Card Content */}
            <Column
                maxWidth="l"
                fillWidth
                horizontal="center"
                align="center"
                gap="32"
                style={{
                    position: 'relative',
                    zIndex: 2,
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--static-space-64) var(--static-space-32)',
                    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.2)'
                }}
            >
                <Heading
                    variant="display-strong-l"
                    align="center"
                    wrap="balance"
                    style={{
                        background: 'linear-gradient(135deg, #FFFFFF 0%, #AAAAAA 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 0 40px rgba(255,255,255,0.3)'
                    }}
                >
                    <LetterFx speed="medium" trigger="instant">
                        {title}
                    </LetterFx>
                </Heading>

                <Text
                    variant="body-default-l"
                    align="center"
                    onBackground="neutral-medium"
                    style={{ maxWidth: '600px', lineHeight: '1.6' }}
                >
                    {description}
                </Text>

                <Button
                    href={ctaLink}
                    variant="primary"
                    size="l"
                    arrowIcon
                    style={{
                        marginTop: '16px',
                        background: '#FFFFFF',
                        color: '#000000',
                        boxShadow: '0 0 20px rgba(255,255,255,0.4)',
                        border: 'none'
                    }}
                >
                    {ctaLabel}
                </Button>
            </Column>
        </Column>
    );
};
