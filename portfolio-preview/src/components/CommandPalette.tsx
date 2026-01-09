"use client";

import React, { useEffect, useState } from 'react';
import { SmartLink, Flex, Text, Icon, Column } from "@/once-ui/components";
import { useRouter } from 'next/navigation';

interface CommandItem {
    id: string;
    label: string;
    icon: string;
    href?: string;
    action?: () => void;
}

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const commands: CommandItem[] = [
        { id: '1', label: 'Home', icon: 'home', href: '/' },
        { id: '2', label: 'About', icon: 'person', href: '/about' },
        { id: '3', label: 'Work', icon: 'grid', href: '/work' },
        { id: '4', label: 'Gallery', icon: 'image', href: '/gallery' },
        { id: '5', label: 'Blog', icon: 'book', href: '/blog' },
        {
            id: '6', label: 'Copy Email', icon: 'email', action: () => {
                navigator.clipboard.writeText("shubhamvumap@gmail.com");
                alert("Email copied!");
                setIsOpen(false);
            }
        },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = filteredCommands[selectedIndex];
                if (cmd) {
                    if (cmd.href) {
                        router.push(cmd.href);
                    } else if (cmd.action) {
                        cmd.action();
                    }
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [isOpen, filteredCommands, selectedIndex, router]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: '10vh'
            }}
            onClick={() => setIsOpen(false)}
        >
            <Column
                fillWidth
                maxWidth="m"
                radius="l"
                padding="m"
                gap="s"
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'var(--neutral-background)',
                    border: '1px solid var(--neutral-border-weak)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    maxHeight: '400px',
                    overflow: 'hidden'
                }}
            >
                <Flex fillWidth gap="s" vertical="center" paddingX="xs" style={{ borderBottom: '1px solid var(--neutral-border-weak)', paddingBottom: '12px' }}>
                    <Icon name="search" size="m" onBackground="neutral-weak" />
                    <input
                        autoFocus
                        placeholder="Type a command or search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--neutral-on-background-strong)',
                            fontSize: '16px',
                            width: '100%',
                            fontFamily: 'inherit'
                        }}
                    />
                    <Flex padding="4" radius="s" border="neutral-strong" background="neutral-alpha-weak">
                        <Text variant="label-default-xs">ESC</Text>
                    </Flex>
                </Flex>

                <Column fillWidth style={{ overflowY: 'auto' }}>
                    {filteredCommands.length === 0 ? (
                        <Flex padding="m" center>
                            <Text onBackground="neutral-weak">No results found.</Text>
                        </Flex>
                    ) : (
                        filteredCommands.map((cmd, index) => (
                            <Flex
                                key={cmd.id}
                                fillWidth
                                padding="s"
                                radius="m"
                                vertical="center"
                                gap="m"
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor: index === selectedIndex ? 'var(--neutral-alpha-weak)' : 'transparent',
                                    transition: 'background-color 0.1s'
                                }}
                                onClick={() => {
                                    if (cmd.href) router.push(cmd.href);
                                    if (cmd.action) cmd.action();
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <Icon name={cmd.icon} size="m" onBackground={index === selectedIndex ? "brand-medium" : "neutral-weak"} />
                                <Text variant="body-default-m" onBackground={index === selectedIndex ? "neutral-strong" : "neutral-medium"}>
                                    {cmd.label}
                                </Text>
                                {index === selectedIndex && (
                                    <Flex style={{ marginLeft: 'auto' }}>
                                        <Icon name="arrowRight" size="s" onBackground="neutral-weak" />
                                    </Flex>
                                )}
                            </Flex>
                        ))
                    )}
                </Column>

                <Flex fillWidth padding="xs" gap="s" vertical="center" style={{ borderTop: '1px solid var(--neutral-border-weak)', paddingTop: '8px' }}>
                    <Text variant="label-default-xs" onBackground="neutral-weak">Navigation</Text>
                    <Flex gap="4">
                        <Icon name="arrowUp" size="xs" onBackground="neutral-weak" />
                        <Icon name="arrowDown" size="xs" onBackground="neutral-weak" />
                    </Flex>
                </Flex>
            </Column>
        </div>
    );
};
