"use client";

import React, { useState, useEffect } from 'react';
import { Flex, Text, Column, Heading } from "@/once-ui/components";

export const TerminalHero = ({
    commands = [
        { cmd: "npm install", output: "Installing advanced-metrics..." },
        { cmd: "node portfolio.js", output: "Starting server on port 3000..." }
    ],
    user = "shubham",
    host = "dev-machine"
}) => {
    const [typedLines, setTypedLines] = useState<{ type: 'cmd' | 'output', text: string }[]>([]);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = [];
        let currentLineIndex = 0;

        const addLine = () => {
            if (currentLineIndex >= commands.length * 2) return;

            const cmdIndex = Math.floor(currentLineIndex / 2);
            const isCmd = currentLineIndex % 2 === 0;

            const line = isCmd
                ? { type: 'cmd' as const, text: commands[cmdIndex].cmd }
                : { type: 'output' as const, text: commands[cmdIndex].output };

            setTypedLines(prev => [...prev, line]);
            currentLineIndex++;

            const delay = isCmd ? 1000 : 500;
            timeouts.push(setTimeout(addLine, delay));
        };

        timeouts.push(setTimeout(addLine, 500));

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <Column
            fillWidth
            padding="l"
            radius="l"
            background="neutral-strong"
            border="neutral-medium"
            style={{ fontFamily: 'monospace', minHeight: '300px', position: 'relative', overflow: 'hidden' }}
        >
            {/* Terminal Header */}
            <Flex fillWidth gap="8" marginBottom="m" vertical="center">
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                <Text variant="body-default-xs" onBackground="neutral-medium" style={{ marginLeft: 'auto' }}>
                    bash -- 80x24
                </Text>
            </Flex>

            {/* Terminal Content */}
            <Column gap="4">
                {typedLines.map((line, i) => (
                    <Flex key={i} gap="8" vertical="center">
                        {line.type === 'cmd' && (
                            <Text variant="body-strong-m" style={{ color: '#27C93F' }}>
                                {user}@{host}:~$
                            </Text>
                        )}
                        <Text variant="body-default-m" onBackground={line.type === 'cmd' ? "neutral-weak" : "brand-medium"}>
                            {line.text}
                        </Text>
                    </Flex>
                ))}

                <Flex gap="8" vertical="center">
                    <Text variant="body-strong-m" style={{ color: '#27C93F' }}>
                        {user}@{host}:~$
                    </Text>
                    <div className="blinking-cursor" style={{ width: '8px', height: '16px', backgroundColor: 'var(--neutral-on-background-weak)' }} />
                </Flex>
            </Column>

            <style jsx>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .blinking-cursor {
          animation: blink 1s infinite;
        }
      `}</style>
        </Column>
    );
};
