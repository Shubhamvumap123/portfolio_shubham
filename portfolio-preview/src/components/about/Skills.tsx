import React from 'react';
import { Column, Grid, Heading, Icon, RevealFx, Row, Spotlight, Text, Flex } from "@/once-ui/components";
import { about } from "@/app/resources/content";
import styles from "./about.module.scss";

export function Skills() {
    if (!about.technical.display || !about.technical.skills.length) return null;

    return (
        <Column fillWidth gap="m" paddingX="l">
            <RevealFx translateY="8" delay={0.4}>
                <Heading
                    as="h2"
                    variant="display-strong-xs"
                    wrap="balance"
                    marginBottom="m"
                >
                    {about.technical.title}
                </Heading>
            </RevealFx>
            <Grid columns="2" mobileColumns="1" gap="m">
                {about.technical.skills.map((skill: any, index: number) => (
                    <RevealFx key={`${skill.title}-${index}`} translateY="12" delay={index * 0.1}>
                        <Spotlight className="fill-width" style={{ height: '100%' }}>
                            <Column
                                fillWidth
                                padding="l"
                                radius="l"
                                gap="m"
                                style={{
                                    height: '100%',
                                    backdropFilter: 'blur(12px)',
                                    background: 'linear-gradient(135deg, var(--neutral-alpha-weak) 0%, var(--neutral-alpha-medium) 100%)',
                                    border: '1px solid var(--neutral-border-weak)',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                            >
                                <Row gap="16" vertical="center">
                                    <Flex
                                        padding="12"
                                        radius="m"
                                        background="neutral-strong"
                                        style={{ border: '1px solid var(--brand-alpha-medium)' }}
                                    >
                                        {skill.icon && <Icon name={skill.icon} size="l" onBackground="brand-medium" />}
                                    </Flex>
                                    <Text variant="heading-strong-xs" style={{ fontFamily: 'var(--font-family-code)' }}>
                                        {skill.title}
                                    </Text>
                                </Row>
                                <Text variant="body-default-s" onBackground="neutral-medium">
                                    {skill.description}
                                </Text>
                            </Column>
                        </Spotlight>
                    </RevealFx>
                ))}
            </Grid>
        </Column>
    );
}
