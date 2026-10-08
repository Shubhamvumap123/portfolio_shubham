"use client";

import React, { useState } from "react";
import { Column, Flex, Text, Icon } from "@/once-ui/components";
import { ProjectCard } from "@/components";

export interface ProjectPost {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag?: string;
    image?: string;
    images?: string[];
    link?: string;
    team?: { name: string; role: string; avatar: string; linkedIn?: string }[];
  };
  content: string;
  hasContent?: boolean;
}

interface ProjectsProps {
  /** Optional range of projects to display */
  range?: [number, number?];
  /** Pre-fetched posts data from server */
  posts?: ProjectPost[];
  /** Show search and tag filter controls (default true if range is not set) */
  enableFilter?: boolean;
}

/**
 * Renders a list of project cards with client-side interactive search & tag filtering.
 */
export function Projects({ range, posts = [], enableFilter }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  const sortedProjects = [...posts].sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const isFilteredPage = enableFilter !== undefined ? enableFilter : !range;

  // Extract unique tags
  const tags = ["ALL", ...Array.from(new Set(sortedProjects.map(p => p.metadata.tag || "Web App").filter(Boolean)))];

  const filteredProjects = sortedProjects.filter(post => {
    const matchesTag = selectedTag === "ALL" || post.metadata.tag === selectedTag;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      post.metadata.title.toLowerCase().includes(searchLower) ||
      post.metadata.summary.toLowerCase().includes(searchLower) ||
      (post.metadata.tag && post.metadata.tag.toLowerCase().includes(searchLower));

    return matchesTag && matchesSearch;
  });

  const displayedProjects = range
    ? sortedProjects.slice(Math.max(0, range[0] - 1), range[1] ?? sortedProjects.length)
    : filteredProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {isFilteredPage && (
        <Column fillWidth gap="m" marginBottom="m">
          {/* Search Bar */}
          <Flex
            fillWidth
            vertical="center"
            padding="s"
            radius="l"
            gap="s"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Icon name="search" size="m" onBackground="brand-medium" />
            <input
              type="text"
              placeholder="Search projects by keyword, stack, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f8fafc',
                fontSize: '15px',
                width: '100%',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                ✕
              </button>
            )}
          </Flex>

          {/* Filter Pills & Result Count */}
          <Flex fillWidth horizontal="space-between" align="center" wrap gap="12">
            <Flex gap="8" wrap vertical="center">
              {tags.map(tag => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
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
                    {tag}
                  </button>
                );
              })}
            </Flex>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Showing {displayedProjects.length} of {sortedProjects.length} projects
            </Text>
          </Flex>
        </Column>
      )}

      {displayedProjects.length === 0 ? (
        <Flex
          fillWidth
          padding="xl"
          radius="l"
          center
          direction="column"
          gap="m"
          style={{
            background: 'rgba(15, 23, 42, 0.4)',
            border: '1px dashed rgba(56, 189, 248, 0.2)'
          }}
        >
          <Icon name="search" size="l" onBackground="neutral-weak" />
          <Text variant="body-default-m" onBackground="neutral-weak">
            No projects found matching &quot;{searchQuery || selectedTag}&quot;
          </Text>
          <button
            onClick={() => { setSearchQuery(""); setSelectedTag("ALL"); }}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'var(--brand-alpha-strong)',
              border: '1px solid var(--brand-strong)',
              color: '#38bdf8',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px'
            }}
          >
            Reset Filters
          </button>
        </Flex>
      ) : (
        displayedProjects.map((post, index) => (
          <ProjectCard
            preload={index === 0 || post.slug === 'ticket-support'}
            key={post.slug}
            href={`work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            hasContent={post.hasContent}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
          />
        ))
      )}
    </Column>
  );
}
