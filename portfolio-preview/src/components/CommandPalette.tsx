"use client";

import React, { useEffect, useState } from 'react';
import { Flex, Text, Icon, Column } from "@/once-ui/components";
import { useRouter } from 'next/navigation';

interface CommandItem {
    id: string;
    label: string;
    category: 'Navigation' | 'Quick Actions' | 'Projects';
    icon: string;
    description?: string;
    href?: string;
    action?: () => void;
}

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const router = useRouter();

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    const commands: CommandItem[] = [
        // Navigation
        { id: 'nav-1', category: 'Navigation', label: 'Home Page', description: 'Main introduction & overview', icon: 'home', href: '/' },
        { id: 'nav-2', category: 'Navigation', label: 'About Shubham', description: 'Experience, education & skills', icon: 'person', href: '/about' },
        { id: 'nav-3', category: 'Navigation', label: 'Projects & Work', description: 'Full stack applications & clones', icon: 'grid', href: '/work' },
        { id: 'nav-4', category: 'Navigation', label: 'Technical Architecture', description: 'Mission control system modules', icon: 'dashboard', href: '/technical' },
        { id: 'nav-5', category: 'Navigation', label: 'Engineering Playground', description: 'Interactive incident simulator', icon: 'sparkles', href: '/playground' },
        { id: 'nav-6', category: 'Navigation', label: 'Blog', description: 'Technical articles & insights', icon: 'book', href: '/blog' },

        // Quick Actions
        {
            id: 'act-1',
            category: 'Quick Actions',
            label: 'Copy Email Address',
            description: 'shubhamvumap@gmail.com',
            icon: 'email',
            action: () => {
                navigator.clipboard.writeText("shubhamvumap@gmail.com");
                showToast("Email address copied to clipboard!");
            }
        },
        {
            id: 'act-2',
            category: 'Quick Actions',
            label: 'Download Resume (PDF)',
            description: 'Shubham_Umap_Resume.pdf',
            icon: 'openLink',
            action: () => {
                window.open("https://drive.google.com/file/d/1RVQFU64iuJReZe708NtK8fxFlaezzriz/view?usp=sharing", "_blank");
                showToast("Opening resume in new tab...");
            }
        },

        // Featured Projects
        { id: 'prj-1', category: 'Projects', label: 'Ticket Support System', description: 'Full-stack support platform with real-time state', icon: 'grid', href: '/work/ticket-support' },
        { id: 'prj-2', category: 'Projects', label: '2D Canvas Browser Game', description: 'Custom collision detection physics engine', icon: 'sparkles', href: '/work/shooting-game' },
        { id: 'prj-3', category: 'Projects', label: 'Bobbi Brown E-Commerce', description: 'React.js & Redux shopping platform', icon: 'grid', href: '/work/bobbi-brown-clone' },
        { id: 'prj-4', category: 'Projects', label: 'Expedia Booking Clone', description: 'Travel booking frontend with React', icon: 'grid', href: '/work/expedia-clone' },
        { id: 'prj-5', category: 'Projects', label: 'Overstock E-Commerce', description: 'Modern dynamic web shop', icon: 'grid', href: '/work/overstock' },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase()) ||
        cmd.category.toLowerCase().includes(search.toLowerCase()) ||
        (cmd.description && cmd.description.toLowerCase().includes(search.toLowerCase()))
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
                setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
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

    return (
        <>
            {/* Toast Notification Container */}
            {toastMessage && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '24px',
                        right: '24px',
                        zIndex: 10000,
                        backgroundColor: '#0f172a',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(56, 189, 248, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '14px',
                        fontWeight: 600,
                        animation: 'fadeInUp 0.3s ease-out'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>✓</span>
                    <span>{toastMessage}</span>
                </div>
            )}

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingTop: '12vh'
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
                            border: '1px solid var(--brand-alpha-medium)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px var(--brand-alpha-weak)',
                            maxHeight: '480px',
                            overflow: 'hidden'
                        }}
                    >
                        <Flex fillWidth gap="s" vertical="center" paddingX="xs" style={{ borderBottom: '1px solid var(--neutral-border-weak)', paddingBottom: '12px' }}>
                            <Icon name="search" size="m" onBackground="brand-medium" />
                            <input
                                autoFocus
                                placeholder="Type to search pages, projects, or actions..."
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

                        <Column fillWidth style={{ overflowY: 'auto', maxHeight: '340px' }} gap="4">
                            {filteredCommands.length === 0 ? (
                                <Flex padding="l" center direction="column" gap="8">
                                    <Text onBackground="neutral-weak">No matching commands or projects found.</Text>
                                </Flex>
                            ) : (
                                filteredCommands.map((cmd, index) => {
                                    const isSelected = index === selectedIndex;
                                    return (
                                        <Flex
                                            key={cmd.id}
                                            fillWidth
                                            padding="s"
                                            radius="m"
                                            vertical="center"
                                            gap="m"
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: isSelected ? 'var(--brand-alpha-medium)' : 'transparent',
                                                border: `1px solid ${isSelected ? 'var(--brand-strong)' : 'transparent'}`,
                                                transition: 'all 0.15s ease'
                                            }}
                                            onClick={() => {
                                                if (cmd.href) router.push(cmd.href);
                                                if (cmd.action) cmd.action();
                                                setIsOpen(false);
                                            }}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <Icon name={cmd.icon} size="m" onBackground={isSelected ? "brand-strong" : "neutral-weak"} />
                                            <Flex direction="column" gap="2" style={{ flex: 1 }}>
                                                <Text variant="body-default-m" onBackground={isSelected ? "neutral-strong" : "neutral-medium"}>
                                                    {cmd.label}
                                                </Text>
                                                {cmd.description && (
                                                    <Text variant="body-default-xs" onBackground="neutral-weak">
                                                        {cmd.description}
                                                    </Text>
                                                )}
                                            </Flex>
                                            <Flex paddingX="8" paddingY="2" radius="s" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                <Text variant="label-default-xs" onBackground="neutral-weak">{cmd.category}</Text>
                                            </Flex>
                                            {isSelected && (
                                                <Flex style={{ marginLeft: '4px' }}>
                                                    <Icon name="arrowRight" size="s" onBackground="brand-strong" />
                                                </Flex>
                                            )}
                                        </Flex>
                                    );
                                })
                            )}
                        </Column>

                        <Flex fillWidth padding="xs" gap="m" vertical="center" horizontal="space-between" style={{ borderTop: '1px solid var(--neutral-border-weak)', paddingTop: '10px' }}>
                            <Flex gap="12" vertical="center">
                                <Text variant="label-default-xs" onBackground="neutral-weak">Navigate ↵ Select</Text>
                                <Flex gap="4">
                                    <Icon name="arrowUp" size="xs" onBackground="neutral-weak" />
                                    <Icon name="arrowDown" size="xs" onBackground="neutral-weak" />
                                </Flex>
                            </Flex>
                            <Text variant="label-default-xs" onBackground="brand-medium">Cmd+K / Ctrl+K</Text>
                        </Flex>
                    </Column>
                </div>
            )}
        </>
    );
};
