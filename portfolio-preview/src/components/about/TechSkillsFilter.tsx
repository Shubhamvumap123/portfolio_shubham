"use client";

import React, { useState } from 'react';
import { Flex, Text, Icon, Spotlight, Column, Grid, Row } from "@/once-ui/components";

interface SkillItem {
    title: string;
    description: React.ReactNode;
    icon: string;
    category: string;
    proficiency: number; // Percentage 0-100
}

interface TechSkillsFilterProps {
    skills: {
        title: string;
        description: React.ReactNode;
        icon: string;
        images?: any[];
    }[];
}

const CATEGORY_MAPPING: Record<string, { category: string; proficiency: number }> = {
    "JavaScript": { category: "LANGUAGES & TOOLS", proficiency: 95 },
    "TypeScript": { category: "LANGUAGES & TOOLS", proficiency: 90 },
    "React.js": { category: "FRONTEND", proficiency: 95 },
    "Node.js": { category: "BACKEND", proficiency: 90 },
    "Express.js": { category: "BACKEND", proficiency: 88 },
    "MongoDB": { category: "DATABASE", proficiency: 88 },
    "HTML/CSS": { category: "FRONTEND", proficiency: 95 },
    "Tailwind CSS": { category: "FRONTEND", proficiency: 92 },
    "Three.js": { category: "GRAPHICS & 3D", proficiency: 85 },
    "Git/GitHub": { category: "LANGUAGES & TOOLS", proficiency: 92 },
};

export function TechSkillsFilter({ skills }: TechSkillsFilterProps) {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const mappedSkills: SkillItem[] = skills.map(s => {
        const meta = CATEGORY_MAPPING[s.title] || { category: "OTHER", proficiency: 85 };
        return {
            title: s.title,
            description: s.description,
            icon: s.icon,
            category: meta.category,
            proficiency: meta.proficiency
        };
    });

    const categories = ["ALL", "FRONTEND", "BACKEND", "DATABASE", "GRAPHICS & 3D", "LANGUAGES & TOOLS"];

    const filteredSkills = activeCategory === "ALL"
        ? mappedSkills
        : mappedSkills.filter(s => s.category === activeCategory);

    return (
        <Column fillWidth gap="m" marginBottom="40">
            {/* Category Pill Filters */}
            <Flex gap="8" wrap horizontal="start" marginBottom="s">
                {categories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                cursor: 'pointer',
                                padding: '6px 14px',
                                borderRadius: '20px',
                                background: isSelected ? 'var(--brand-alpha-strong)' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isSelected ? 'var(--brand-strong)' : 'rgba(255,255,255,0.1)'}`,
                                color: isSelected ? '#38bdf8' : 'var(--neutral-on-background-weak)',
                                fontSize: '12px',
                                fontWeight: 600,
                                transition: 'all 0.2s ease',
                                outline: 'none'
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </Flex>

            {/* Skills Grid */}
            <Grid columns="2" mobileColumns="1" gap="m">
                {filteredSkills.map((skill, index) => (
                    <Spotlight key={`${skill.title}-${index}`} className="fill-width" style={{ height: '100%' }}>
                        <Column
                            fillWidth
                            padding="l"
                            radius="l"
                            gap="m"
                            style={{
                                height: '100%',
                                backdropFilter: 'blur(12px)',
                                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
                                border: '1px solid rgba(56, 189, 248, 0.15)',
                                borderRadius: '16px'
                            }}
                        >
                            <Row gap="16" vertical="center" horizontal="space-between">
                                <Row gap="12" vertical="center">
                                    <Flex
                                        padding="8"
                                        radius="m"
                                        style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)' }}
                                    >
                                        {/* @ts-ignore */}
                                        {skill.icon && <Icon name={skill.icon} size="m" onBackground="brand-medium" />}
                                    </Flex>
                                    <Text variant="heading-strong-xs" style={{ fontFamily: 'var(--font-family-code)', color: '#f8fafc' }}>
                                        {skill.title}
                                    </Text>
                                </Row>
                                <span style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#38bdf8',
                                    background: 'rgba(56, 189, 248, 0.1)',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                }}>
                                    {skill.proficiency}%
                                </span>
                            </Row>

                            <Text variant="body-default-s" onBackground="neutral-medium">
                                {skill.description}
                            </Text>

                            {/* Animated Skill Level Bar */}
                            <div style={{
                                width: '100%',
                                height: '5px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginTop: 'auto'
                            }}>
                                <div style={{
                                    width: `${skill.proficiency}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)',
                                    borderRadius: '4px',
                                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                                }} />
                            </div>
                        </Column>
                    </Spotlight>
                ))}
            </Grid>
        </Column>
    );
}
