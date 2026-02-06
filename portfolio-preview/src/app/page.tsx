import Script from 'next/script';
import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Row, Badge, Line } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, about, person } from "@/app/resources/content";
import { Posts } from "@/components/blog/Posts";
import styles from "@/components/about/about.module.scss";
import { getPosts } from "@/app/utils/utils";
import { sanitizeJsonLd } from "@/app/utils/security";

// Generate metadata for SEO and social sharing
export async function generateMetadata() {
  const title = home.title;
  const alt_title = 'Showcasing the Best Projects';
  const description = home.description;
  const ogImage = `https://${baseURL}/opengraph.jpg`;
  const pageUrl = `https://${baseURL}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      siteName: `${person.firstName}'s Portfolio (With Projects & Publications)`,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: alt_title
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Schema.org structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: home.title,
  description: home.description,
  url: `https://${baseURL}`,
  image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
  publisher: {
    "@type": "Person",
    name: person.name,
    image: {
      "@type": "ImageObject",
      url: `${baseURL}${person.avatar}`,
    },
  },
};

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"], false);

  return (
    <Column maxWidth="m" gap="24" horizontal="center">

      {/* Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(structuredData),
        }}
      />

      {/* Introduction Block */}
      {/* Introduction Block */}
      <Column fillWidth paddingY="128" gap="32" align="center" horizontal="center">
        <Column fillWidth maxWidth="l" gap="32" align="center" horizontal="center">

          <Flex
            gap="12"
            vertical="center"
            paddingX="16"
            paddingY="8"
            style={{
              border: '1px solid var(--neutral-alpha-medium)',
              borderRadius: 'var(--radius-full)',
              background: 'var(--neutral-alpha-weak)',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }}
          >
            <Text
              variant="label-default-s"
              onBackground="neutral-strong"
            >
              <Text as="span" weight="strong">More Electric Aircraft : IPS</Text>
            </Text>

            <Line vert maxHeight="16" />

            <Text
              variant="label-default-s"
              style={{ color: 'var(--brand-solid-strong)' }}
            >
              Featured work
            </Text>
          </Flex>

          <Heading
            wrap="balance"
            variant="display-strong-l"
            align="center"
          >
            {home.headline}
          </Heading>

          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
          >
            {home.subline}
          </Text>

          <Button
            id="about"
            href="/about"
            variant="secondary"
            size="m"
            arrowIcon
          >
            <Flex gap="8" vertical="center">
              {about.avatar.display && (
                <Avatar
                  src={person.avatar}
                  size="m"
                />
              )}
              {about.title}
            </Flex>
          </Button>
        </Column>
      </Column>

      {/* Main Content Column */}
      <Column maxWidth="m" gap="24" horizontal="center" paddingTop="64">
        {/* Featured Project */}
        <RevealFx translateY="0" delay={0.6}>
          <Projects range={[1, 1]} posts={allProjects} />
        </RevealFx>

        {/* Blog Section (Conditional) */}
        {routes["/blog"] && (
          <Flex
            fillWidth gap="24"
            mobileDirection="column"
            padding="xl"
            radius="l"
            border="neutral-alpha-weak"
            background="surface"
          >
            <Flex flex={1} paddingLeft="l">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Flex>
            <Flex flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Flex>
          </Flex>
        )}

        {/* Additional Projects */}
        <Column fillWidth gap="24">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Other Work and Publications
            </Heading>
          </Flex>
          <Projects range={[2]} posts={allProjects} />
        </Column>
      </Column>
    </Column>
  );
}
