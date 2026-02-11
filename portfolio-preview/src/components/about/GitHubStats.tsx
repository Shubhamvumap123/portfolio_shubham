"use client";

import React from 'react';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { Column, Heading, Flex, Text, RevealFx } from "@/once-ui/components";

interface GitHubStatsProps {
    username: string;
    data: any[] | null;
    error: boolean;
}

export const GitHubStats = ({ username, data, error }: GitHubStatsProps) => {
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
                    {error ? (
                        <Text variant="body-default-s" onBackground="danger-weak">
                            Unable to load GitHub contributions.
                        </Text>
                    ) : !data ? (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                            Loading...
                        </Text>
                    ) : (
                        <ActivityCalendar
                            data={data}
                            blockSize={12}
                            blockMargin={4}
                            fontSize={14}
                            theme={{
                                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                            } as ThemeInput}
                        />
                    )}
                </div>
            </Flex>
            <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
                Powered by react-activity-calendar
            </Text>
        </Column>
    );
};


