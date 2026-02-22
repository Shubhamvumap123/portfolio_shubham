"use client";

import { useState } from 'react';
import {
    Column,
    Flex,
    Heading,
    Text,
    RevealFx,
    SmartLink,
    Icon,
    Grid,
    GlitchFx,
    HoloFx,
    TiltFx,
    LetterFx,
    Line,
    Avatar
} from "@/once-ui/components";
import { technical, technicalModules, baseURL, person } from "@/app/resources";
import SystemLogs from '@/components/technical/SystemLogs';

export default function MissionControl() {
    const [activeModule, setActiveModule] = useState<any>(null);
    const [activeFilter, setActiveFilter] = useState("ALL");

    const uniqueTypes = ["ALL", ...Array.from(new Set(technicalModules.map(m => m.type || "OTHER")))];

    const filteredModules = activeFilter === "ALL"
        ? technicalModules
        : technicalModules.filter(m => m.type === activeFilter);

    return (
        <Column fillWidth paddingY="l" paddingX="l" gap="xl" horizontal="center" style={{
            position: 'relative',
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--brand-alpha-weak) 0%, transparent 70%), 
                              linear-gradient(rgba(var(--brand-rgb), 0.05) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(var(--brand-rgb), 0.05) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
            minHeight: '100vh'
        }}>

            {/* Hero Section: System Status */}
            <Column maxWidth="m" fillWidth gap="l" align="center">
                <RevealFx translateY="8">
                    <Column fillWidth align="center" gap="s">
                        <GlitchFx
                            speed="medium"
                            interval={3000}
                        >
                            <Heading variant="display-strong-xl" align="center">
                                TECHNICAL ARCHITECTURE
                            </Heading>
                        </GlitchFx>
                        <Flex gap="8" vertical="center" wrap horizontal="center">
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: '#00FF9D',
                                boxShadow: '0 0 10px #00FF9D'
                            }} />
                            <Text variant="code-default-m" onBackground="neutral-medium" align="center">
                                SYSTEM STATUS: NOMINAL // AUTHORIZED ACCESS ONLY
                            </Text>
                        </Flex>
                    </Column>
                </RevealFx>

                <Line fillWidth border="neutral-alpha-medium" />

                {/* Filter Controls */}
                <Flex gap="12" wrap horizontal="center" marginTop="m">
                    {uniqueTypes.map((type) => (
                        <div
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            style={{
                                cursor: 'pointer',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                background: activeFilter === type ? 'var(--brand-alpha-medium)' : 'rgba(var(--neutral-rgb), 0.1)',
                                border: `1px solid ${activeFilter === type ? 'var(--brand-strong)' : 'var(--neutral-alpha-medium)'}`,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <Text variant="code-default-s" onBackground={activeFilter === type ? "brand-strong" : "neutral-medium"}>
                                {type}
                            </Text>
                        </div>
                    ))}
                </Flex>

                {/* System Architecture Grid */}
                <Column fillWidth gap="m" align="center" marginTop="l">
                    <RevealFx translateY="8" delay={0.2}>
                        <Heading variant="heading-strong-l" marginBottom="m">
                            <LetterFx trigger="hover" speed="medium" charset={['X', 'Y', 'Z', '0', '1']}>
                                SYSTEM MODULES
                            </LetterFx>
                        </Heading>
                    </RevealFx>

                    <Grid columns="2" gap="16" mobileColumns="1" fillWidth>
                        {filteredModules.map((module, index) => (
                            <TiltFx key={index} style={{ cursor: 'pointer' }}>
                                <div
                                    onClick={() => setActiveModule(module)}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        transition: 'transform 0.2s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Column fillWidth style={{ height: '100%' }}>
                                        <HoloFx>
                                            <Flex
                                                direction="column"
                                                padding="l"
                                                gap="m"
                                                fillWidth
                                                style={{
                                                    height: '100%',
                                                    minHeight: '220px',
                                                    border: activeModule === module ? '1px solid var(--brand-strong)' : '1px solid var(--neutral-alpha-medium)',
                                                    boxShadow: activeModule === module ? '0 0 15px var(--brand-alpha-weak)' : 'none',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                align="start"
                                            >
                                                <Flex fillWidth vertical="center" gap="12" horizontal="space-between">
                                                    <Flex gap="12" vertical="center">
                                                        <div style={{
                                                            padding: '8px',
                                                            background: 'var(--brand-alpha-weak)',
                                                            borderRadius: '8px',
                                                            border: '1px solid var(--brand-alpha-medium)'
                                                        }}>
                                                            <Icon name={module.icon} size="l" />
                                                        </div>
                                                        <Heading variant="heading-strong-m">
                                                            {module.title}
                                                        </Heading>
                                                    </Flex>
                                                    <Text variant="code-default-xs" onBackground="brand-medium">
                                                        [{module.status}]
                                                    </Text>
                                                </Flex>

                                                <Line fillWidth border="neutral-alpha-weak" />

                                                <Text variant="body-default-s" onBackground="neutral-weak">
                                                    {module.description}
                                                </Text>

                                                <Flex style={{ marginTop: 'auto' }} gap="8" wrap>
                                                    {module.tech.map((tech: string, i: number) => (
                                                        <Flex
                                                            key={i}
                                                            paddingX="8"
                                                            paddingY="4"
                                                            radius="s"
                                                            background="neutral-alpha-weak"
                                                            border="neutral-alpha-medium"
                                                        >
                                                            <Text variant="code-default-xs" onBackground="neutral-medium">
                                                                {tech}
                                                            </Text>
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            </Flex>
                                        </HoloFx>
                                    </Column>
                                </div>
                            </TiltFx>
                        ))}
                    </Grid>
                </Column>
            </Column>

            {/* Interaction Modal / Overlay */}
            {activeModule && (
                <SystemLogs module={activeModule} onClose={() => setActiveModule(null)} />
            )}
        </Column>
    );
}
