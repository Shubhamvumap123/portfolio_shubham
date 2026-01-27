"use client";

import { AvatarGroup, Carousel, Column, Flex, Heading, SmartLink, Spotlight, Text, } from "@/once-ui/components";

interface ProjectCardProps {
  /** The URL for the "Explore detailed insights" link */
  href: string;
  /** Whether to preload the images */
  preload?: boolean;
  /** Array of image URLs to display in the carousel */
  images?: string[];
  /** Title of the project */
  title: string;
  /** Main content/description text */
  content?: string;
  /** Whether the project has content (alternative to checking content string) */
  hasContent?: boolean;
  /** Short description or subtitle */
  description?: string;
  /** List of avatars to display */
  avatars?: { src: string }[];
  /** External link URL */
  link?: string;
}

/**
 * A card component for displaying project details with a carousel, title, description, and links.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  hasContent,
  description,
  avatars = [],
  link,
  preload = false,
}) => {
  const showExploreLink = hasContent || (content && content.trim().length > 0);

  return (
    <Spotlight
      className="fill-width"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <Column
        fillWidth
        gap="m"
        style={{
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--static-space-24)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
        }}
      >
        <Carousel sizes="(max-width: 960px) 100vw, 960px" preload={preload} images={images.map((image) => ({ src: image, alt: title, }))} />
        <Flex mobileDirection="column" fillWidth paddingX="s" paddingTop="24" paddingBottom="24" gap="l"> {title && (<Flex flex={5}><Heading as="h2" wrap="balance" variant="heading-strong-xl" style={{ letterSpacing: '-0.02em' }}>{title}</Heading></Flex>)}
          {(avatars.length > 0 || description?.trim() || showExploreLink) && (
            <Column flex={7} gap="24">
              {avatars.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              {description?.trim() && (<Text wrap="balance" variant="body-default-m" onBackground="neutral-medium" style={{ lineHeight: '1.6' }}>{description}</Text>)}
              <Flex gap="32" wrap vertical="center">
                {showExploreLink && (
                  <SmartLink
                    suffixIcon="arrowRight"
                    style={{ margin: "0", width: "fit-content", textDecoration: 'none' }}
                    href={href}
                  >
                    <Text variant="body-default-s" style={{ fontWeight: '600', color: 'var(--brand-alpha-strong)' }}>Explore Insights</Text>
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    suffixIcon="arrowUpRightFromSquare"
                    style={{ margin: "0", width: "fit-content", textDecoration: 'none' }}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text variant="body-default-s" style={{ fontWeight: '600' }}>Live Demo</Text>
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </Column>
    </Spotlight>
  );
};
