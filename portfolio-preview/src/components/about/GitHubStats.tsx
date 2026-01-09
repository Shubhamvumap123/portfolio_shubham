"use client";

import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Column, Heading, Flex, Text, RevealFx } from "@/once-ui/components";

interface GitHubStatsProps {
    username: string;
}

export const GitHubStats = ({ username }: GitHubStatsProps) => {
    return (
        <Column fillWidth gap="m" marginBottom="40">
            <RevealFx translateY="8">
                <Heading variant="display-default-s" marginBottom="m">
                    Coding Activity
                </Heading>
            </RevealFx>

            <Flex
                fillWidth
                center
                padding="l"
                radius="l"
                style={{
                    backgroundColor: 'var(--neutral-alpha-weak)',
                    border: '1px solid var(--neutral-border-weak)',
                    overflowX: 'auto', // Handle overflow on small screens
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div style={{ width: '100%', minWidth: '700px', display: 'flex', justifyContent: 'center' }}>
                    <GitHubCalendar
                        username={username}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={14}
                        theme={{
                            light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                        }}
                    />
                </div>
            </Flex>
            <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                Powered by react-github-calendar
            </Text>
        </Column>
    );
};

// Simple wrapper for RevealFx since it's used above

