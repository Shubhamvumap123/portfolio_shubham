"use client";

import React from 'react';
import { Column, Flex, Text, Heading, Spotlight, SmartImage } from "@/once-ui/components";

interface Experience {
    company: string;
    timeframe: string;
    role: string;
    achievements: React.ReactNode[];
    images: any[];
}

interface TimelineProps {
    experiences: Experience[];
}

export const Timeline = ({ experiences }: TimelineProps) => {
    return (
        <Column fillWidth gap="l" paddingLeft="l" style={{ position: 'relative', borderLeft: '1px solid var(--neutral-border-weak)', marginLeft: '20px' }}>
            {experiences.map((exp, index) => (
                <div key={index} style={{ position: 'relative', paddingLeft: '32px', marginBottom: '40px' }}>
                    {/* Timeline Dot */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '-26px', // Adjust to center on the border line
                            top: '0',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--brand-solid-strong)',
                            border: '4px solid var(--neutral-background)',
                            boxShadow: '0 0 0 2px var(--neutral-border-weak)'
                        }}
                    />

                    <Spotlight className="fill-width">
                        <Column
                            fillWidth
                            padding="l"
                            radius="l"
                            style={{
                                backdropFilter: 'blur(12px)',
                                background: 'linear-gradient(135deg, var(--neutral-alpha-weak) 0%, var(--neutral-alpha-medium) 100%)',
                                border: '1px solid var(--neutral-border-weak)'
                            }}
                        >
                            <Flex fillWidth horizontal="space-between" vertical="center" mobileDirection="column" gap="4">
                                <Heading as="h3" variant="display-strong-xs" wrap="balance">
                                    {exp.company}
                                </Heading>
                                <Text variant="label-default-s" onBackground="neutral-medium">
                                    {exp.timeframe}
                                </Text>
                            </Flex>

                            <Text variant="body-strong-m" onBackground="brand-medium" marginBottom="s">
                                {exp.role}
                            </Text>

                            <Column as="ul" gap="xs" paddingLeft="m">
                                {exp.achievements.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '8px' }}>
                                        <Text variant="body-default-s">{item}</Text>
                                    </li>
                                ))}
                            </Column>
                            {/* Experience Images */}
                            {exp.images.length > 0 && (
                                <Flex fillWidth paddingTop="m" gap="m" wrap>
                                    {exp.images.map((image, idx) => (
                                        <Flex
                                            key={idx}
                                            border="neutral-medium"
                                            radius="m"
                                            //@ts-ignore
                                            minWidth={image.width}
                                            //@ts-ignore
                                            height={image.height}
                                        >
                                            <SmartImage
                                                enlarge
                                                radius="m"
                                                //@ts-ignore
                                                sizes={image.width.toString()}
                                                //@ts-ignore
                                                alt={image.alt}
                                                //@ts-ignore
                                                src={image.src}
                                            />
                                        </Flex>
                                    ))}
                                </Flex>
                            )}
                        </Column>
                    </Spotlight>
                </div>
            ))}
        </Column>
    );
};
