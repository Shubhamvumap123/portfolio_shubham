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

export async function generateMetadata() {
    const title = "Mission Control";
    const description = "Advanced Technical Dashboard";
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/technical`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}

export default function MissionControl() {
    const [activeModule, setActiveModule] = useState<any>(null);

    return (
        <Column fillWidth paddingY="l" paddingX="l" gap="xl" horizontal="center" style={{ position: 'relative' }}>

            {/* Hero Section: System Status */}
            <Column maxWidth="m" fillWidth gap="l" align="center">
                <RevealFx translateY="8">
                    <Column fillWidth align="center" gap="s">
                        <GlitchFx
                            speed="medium"
                            interval={3000}
                        >
                            <Heading variant="display-strong-xl" align="center">
                                MISSION CONTROL
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
                                SYSTEM ONLINE // COMMANDER {person.firstName.toUpperCase()} // AUTHENTICATED
                            </Text>
                        </Flex>
                    </Column>
                </RevealFx>

                <Line fillWidth border="neutral-alpha-medium" />

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
                        {technicalModules.map((module, index) => (
                            <TiltFx key={index} style={{ cursor: 'pointer' }}>
                                <div onClick={() => setActiveModule(module)} style={{ height: '100%', width: '100%' }}>
                                    <Column fillWidth style={{ height: '100%' }}>
                                        <HoloFx>
                                            <Flex
                                                direction="column"
                                                padding="l"
                                                gap="m"
                                                fillWidth
                                                style={{ height: '100%', minHeight: '220px' }}
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
                                                    {module.tech.map((tech, i) => (
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
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    padding: '20px'
                }} onClick={() => setActiveModule(null)}>
                    <Column
                        background="surface"
                        border="neutral-medium"
                        radius="l"
                        padding="xl"
                        maxWidth="m"
                        fillWidth
                        onClick={(e) => e.stopPropagation()}
                        gap="l"
                        style={{ border: '1px solid var(--brand-alpha-medium)', boxShadow: '0 0 30px var(--brand-alpha-weak)' }}
                    >
                        <Flex fillWidth horizontal="space-between" vertical="center">
                            <Heading variant="display-strong-s">
                                SYSTEM LOGS: <span style={{ color: 'var(--brand-strong)' }}>{activeModule.title}</span>
                            </Heading>
                            <div onClick={() => setActiveModule(null)} style={{ cursor: 'pointer', padding: '8px' }}>
                                <Icon name="close" size="m" />
                            </div>
                        </Flex>

                        <Line fillWidth border="brand-alpha-medium" />

                        <Column gap="m">
                            {activeModule.details.map((detail: string, i: number) => (
                                <RevealFx key={i} translateY="4" delay={i * 0.1}>
                                    <Flex gap="12">
                                        <Text variant="code-default-m" onBackground="brand-medium">{`>`}</Text>
                                        <Text variant="body-default-m" onBackground="neutral-medium">
                                            <LetterFx trigger="instant" speed="fast">
                                                {detail}
                                            </LetterFx>
                                        </Text>
                                    </Flex>
                                </RevealFx>
                            ))}
                        </Column>

                        <Flex fillWidth horizontal="end" marginTop="m">
                            <Text variant="code-default-xs" onBackground="neutral-weak">
                                END OF LOG // CLICK TO CLOSE
                            </Text>
                        </Flex>
                    </Column>
                </div>
            )}
        </Column>
    );
}
