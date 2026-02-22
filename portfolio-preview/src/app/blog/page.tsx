import {
  Column,
  Heading,
  Text,
} from "@/once-ui/components";
import { blog } from "@/app/resources";
import { Posts } from "@/components/blog/Posts";
import { Newsletter } from "@/components/blog/Newsletter";
import { baseURL, person } from "@/app/resources";
import styles from './page.module.css';

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
      siteName: `${person.firstName}'s Portfolio`,
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

export default function Blog() {
  return (
    <Column fillWidth paddingY="l" paddingX="l" gap="l" horizontal="center">
      <Column maxWidth="m" fillWidth gap="l">
        <Column fillWidth gap="m" align="center">
          <Heading className={styles.headerTitle} variant="display-strong-xl" wrap="balance">
            {blog.title}
          </Heading>
        </Column>

        <Column fillWidth gap="l">
          {/* Unified Column Layout for all posts */}
          <Posts columns="1" thumbnail direction="column" />

          {/* Newsletter */}
          <Newsletter />
        </Column>
      </Column>
    </Column>
  );
}
