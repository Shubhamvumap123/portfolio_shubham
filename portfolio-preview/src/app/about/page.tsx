import React from 'react';
import { Avatar, Button, Column, Flex, Heading, Icon, IconButton, SmartLink, SmartImage, Spotlight, Tag, Text, Row, RevealFx, Grid } from "@/once-ui/components";
import { ShareButton } from "@/components/ShareButton";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import { Timeline } from "@/components/about/Timeline";
import { GitHubStats } from "@/components/about/GitHubStats";
import { CopyEmailButton } from "@/components/about/CopyEmailButton";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import { sanitizeJsonLd } from "@/app/utils/security";

// Generate metadata for SEO and social sharing
export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [{
        url: ogImage,
        alt: title,
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

// Define table of contents structure
const structure = [
  {
    title: about.intro.title,
    display: about.intro.display,
    items: [],
  },
  {
    title: about.work.title,
    display: about.work.display,
    items: about.work.experiences.map((experience) => experience.company),
  },
  {
    title: about.studies.title,
    display: about.studies.display,
    items: about.studies.institutions.map((institution) => institution.name),
  },
  {
    title: about.technical.title,
    display: about.technical.display,
    items: about.technical.skills.map((skill) => skill.title),
  },
];

// Schema.org structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  description: about.intro.description,
  url: `https://${baseURL}/about`,
  image: `${baseURL}/images/${person.avatar}`,
  sameAs: social
    .filter((item) => item.link && !item.link.startsWith("mailto:"))
    .map((item) => item.link),
  worksFor: {
    "@type": "Organization",
    name: about.work.experiences[0].company || "",
  },
};

export default function About() {
  return (
    <Column className={styles.aboutContainer} marginTop="l">
      {/* Hidden H1 for accessibility */}
      <h1 style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(1px, 1px, 1px, 1px)",
        whiteSpace: "nowrap"
      }}>
        {about.title}
      </h1>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(structuredData),
        }}
      />

      {/* Table of Contents */}
      {/* {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )} */}

      <Flex fillWidth mobileDirection="column" horizontal="center">
        {/* Avatar Section */}
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="m"
            paddingTop="0"
            gap="m"
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" style={{ border: '3px solid var(--brand-alpha-strong)' }}
            />
            <Flex gap="8" vertical="stretch" horizontal="center" className="s-flex-hide">
              <Heading variant="display-default-xs" align="center" marginBottom="8">Languages</Heading>
            </Flex>
            {person.languages.length > 0 && (
              <div className={`${styles.languagesGrid} s-flex-hide`}>
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </div>
            )}
            {about.tableOfContent.display && (
              <Column className="s-flex-hide" fillWidth gap="12" marginTop="32" horizontal="center">
                <Heading variant="display-default-xs" align="center" marginBottom="8">
                  On this page
                </Heading>
                <TableOfContents structure={structure} about={about} />
              </Column>
            )}
          </Column>
        )}

        {/* Main Content */}
        <Column className={styles.blockAlign} flex={1}>
          {/* Introduction Section */}
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >


            <Heading className={`${styles.textAlign} ${styles.nameHeading} ${styles.mediumWeight}`} variant="display-default-l">
              {person.name}
            </Heading>

            <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">
              {person.role}
            </Text>
            <Flex className={styles.buttonRow} gap="16" vertical="center" wrap marginTop="32">
              {about.calendar.display && (
                <SmartLink
                  href={about.calendar.link}
                  unstyled
                  className={styles.blockAlign}
                  style={{ textDecoration: 'none' }}
                >
                  <Flex
                    fitWidth
                    border="brand-alpha-medium"
                    className={styles.blockAlign}
                    style={{
                      backdropFilter: "blur(var(--static-space-1))",
                      cursor: "pointer"
                    }}
                    background="brand-alpha-weak"
                    radius="full"
                    padding="4"
                    gap="8"
                    marginTop="0"
                    marginBottom="0"
                    vertical="center"
                  >
                    <Icon paddingLeft="l" name="calendar" onBackground="brand-weak" />
                    <Flex paddingX="xl" paddingY="xs" align="center">
                      Schedule a call
                    </Flex>
                    <Flex
                      width="32"
                      height="32"
                      center
                      radius="full"
                      border="neutral-medium"
                      background="neutral-alpha-medium"
                      style={{ pointerEvents: "none" }}
                    >
                      <Icon name="chevronRight" size="s" />
                    </Flex>
                  </Flex>
                </SmartLink>
              )}

              {/* Social Links */}
              {social.length > 0 && (
                <Flex
                  className={styles.blockAlign}
                  paddingTop="0"
                  paddingBottom="0"
                  gap="8"
                  wrap
                  horizontal="center"
                  fitWidth
                >
                  {social.map((item) => {
                    if (!item.link) return null;

                    if (item.link.startsWith("mailto:")) {
                      return (
                        <React.Fragment key={item.name}>
                          <CopyEmailButton email={item.link.replace("mailto:", "")} label={item.name} />
                        </React.Fragment>
                      );
                    }

                    return (
                      <React.Fragment key={item.name}>
                        <Button
                          className="s-flex-hide"
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          variant="secondary"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.01)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid var(--neutral-border-strong)',
                          }}
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          href={item.link}
                          icon={item.icon}
                          tooltip={item.name}
                          variant="secondary"
                          style={{
                            backgroundColor: 'var(--neutral-background)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid var(--neutral-border-strong)',
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Column>

          {/* Introduction Description */}
          {about.intro.display && (
            <Spotlight className="fill-width">
              <Column
                textVariant="body-default-l"
                marginBottom="l"
                padding="16"
                radius="l"
                style={{
                  width: "100%",
                  backdropFilter: 'blur(10px)',
                  background: 'var(--neutral-alpha-weak)'
                }}
              >
                {about.intro.description}
              </Column>
            </Spotlight>
          )}

          {/* Languages Section (Mobile Only) */}
          {about.avatar.display && person.languages.length > 0 && (
            <Column className="s-flex-show" horizontal="center" gap="16" marginBottom="40" fillWidth>
              <Heading variant="display-default-xs" align="center">
                Languages
              </Heading>
              <Flex wrap gap="8" horizontal="center">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            </Column>
          )}

          {/* Work Experience Section */}
          {about.work.display && (
            <>
              <Heading className={`${styles.textAlign2} ${styles.nameHeading} ${styles.mediumWeight}`}
                id={about.work.title}
                variant="display-default-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Column fillWidth gap="m" marginBottom="40">
                <Timeline experiences={about.work.experiences} />
              </Column>
            </>
          )}

          {/* Education Section */}
          {about.studies.display && (
            <>
              <Heading className={`${styles.textAlign2} ${styles.nameHeading} ${styles.mediumWeight}`}
                id={about.studies.title}
                variant="display-default-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Spotlight key={`${institution.name}-${index}`} className="fill-width">
                    <Column
                      fillWidth
                      gap="4"
                      padding="16"
                      radius="l"
                      style={{ backdropFilter: 'blur(10px)', background: 'var(--neutral-alpha-weak)' }}
                    >
                      <Text id={institution.name} className={`${styles.textAlign2} ${styles.nameHeading} ${styles.smallWeight}`} variant="body-strong-xl">
                        {institution.name}
                      </Text>
                      <Text variant="heading-strong-s" onBackground="neutral-weak">
                        {institution.description}
                      </Text>
                    </Column>
                  </Spotlight>
                ))}
              </Column>
            </>
          )}

          {/* Technical Skills Section */}
          {about.technical.display && (
            <>
              <RevealFx translateY="8" delay={0.4}>
                <Heading className={`${styles.textAlign2} ${styles.nameHeading} ${styles.mediumWeight}`}
                  id={about.technical.title}
                  variant="display-default-s"
                  marginBottom="m"
                >
                  {about.technical.title}
                </Heading>
              </RevealFx>
              <Grid columns="2" mobileColumns="1" gap="m">
                {about.technical.skills.map((skill, index) => (
                  <RevealFx key={`${skill}-${index}`} translateY="12" delay={index * 0.1}>
                    <Spotlight className="fill-width" style={{ height: '100%' }}>
                      <Column
                        fillWidth
                        padding="l"
                        radius="l"
                        gap="m"
                        style={{
                          height: '100%',
                          backdropFilter: 'blur(12px)',
                          background: 'linear-gradient(135deg, var(--neutral-alpha-weak) 0%, var(--neutral-alpha-medium) 100%)',
                          border: '1px solid var(--neutral-border-weak)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                      >
                        <Row gap="16" vertical="center">
                          <Flex
                            padding="12"
                            radius="m"
                            background="neutral-strong"
                            style={{ border: '1px solid var(--brand-alpha-medium)' }}
                          >
                            {/* @ts-ignore */}
                            {skill.icon && <Icon name={skill.icon} size="l" onBackground="brand-medium" />}
                          </Flex>
                          <Text variant="heading-strong-xs" style={{ fontFamily: 'var(--font-family-code)' }}>
                            {skill.title}
                          </Text>
                        </Row>
                        <Text variant="body-default-s" onBackground="neutral-medium">
                          {skill.description}
                        </Text>
                      </Column>
                    </Spotlight>
                  </RevealFx>
                ))}
              </Grid>
            </>
          )}

          {/* GitHub Stats Section */}
          <GitHubStats username="shubhamvumap123" />

          <Row gap="16" vertical="center" horizontal="center" marginTop="32">
            <ShareButton
              title={about.title}
              url={`https://${baseURL}/about`}
              text="Share via Link"
            />
          </Row>
        </Column>
      </Flex>
    </Column>
  );
}