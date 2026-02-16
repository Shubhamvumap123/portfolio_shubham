"use client";

import { useEffect, useState } from 'react';
import {
    Column,
    Flex,
    Heading,
    Text,
    RevealFx,
    Icon,
    LetterFx,
    Line,
    Button
} from "@/once-ui/components";

interface SystemLogsProps {
    module: any;
    onClose: () => void;
}

export default function SystemLogs({ module, onClose }: SystemLogsProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Wait for animation
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            style={{
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
                padding: '20px',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
            }}
            onClick={handleOverlayClick}
        >
            <Column
                background="surface"
                border="neutral-medium"
                radius="l"
                padding="xl"
                maxWidth="m"
                fillWidth
                gap="l"
                style={{
                    border: '1px solid var(--brand-alpha-medium)',
                    boxShadow: '0 0 30px var(--brand-alpha-weak)',
                    transform: isClosing ? 'scale(0.95)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                {/* Header */}
                <Flex fillWidth horizontal="space-between" vertical="center">
                    <Heading variant="display-strong-s">
                        SYSTEM LOGS: <span style={{ color: 'var(--brand-strong)' }}>{module.title}</span>
                    </Heading>
                    <div onClick={handleClose} style={{ cursor: 'pointer', padding: '8px' }}>
                        <Icon name="close" size="m" />
                    </div>
                </Flex>

                <Line fillWidth border="brand-alpha-medium" />

                {/* Logs Content */}
                <Column gap="m">
                    {module.details.map((detail: string, i: number) => (
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

                {/* Footer / Actions */}
                <Flex fillWidth horizontal="space-between" vertical="center" marginTop="l" wrap gap="16">
                    <Text variant="code-default-xs" onBackground="neutral-weak">
                        STATUS: {module.status} // ENCRYPTED
                    </Text>

                    {module.link && (
                        <Button
                            variant="secondary"
                            href={module.link}
                            label="INITIATE PROTOCOL"
                            size="s"
                            suffixIcon="openLink"
                        />
                    )}
                </Flex>
            </Column>
        </div>
    );
}
