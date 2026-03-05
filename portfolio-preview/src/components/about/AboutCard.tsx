import styles from './about.module.scss';
import classNames from 'classnames';
import Link from "next/link";
import { Flex, Text, Avatar } from "@/once-ui/components";

interface AboutCardProps {
    avatar: string;
    title: string;
    href: string;
    priority?: boolean;
}

export const AboutCard = ({
    avatar,
    title,
    href,
    priority = false
}: AboutCardProps) => {
    return (
        <Flex
            fillWidth
            maxWidth="s"
            horizontal="center"
        >
            <Link
                href={href}
                style={{ textDecoration: 'none' }}
            >
                <Flex
                    paddingX="8"
                    paddingY="8"
                    paddingRight="24"
                    gap="16"
                    vertical="center"
                    radius="full"
                    className={classNames(styles.greenAnimated)}
                >
                    {avatar && (
                        <Avatar
                            src={avatar}
                            size="m"
                            priority={priority}
                            style={{
                                border: '2px solid #5ce5c2',
                            }}
                        />
                    )}

                    <Text variant="body-strong-l" style={{ color: '#e6fffa', letterSpacing: '0.5px' }}>
                        {title}
                    </Text>

                    <Flex vertical="center">
                        <Text variant="heading-strong-xs" style={{ color: '#5ce5c2' }}>
                            &rarr;
                        </Text>
                    </Flex>
                </Flex>
            </Link>
        </Flex>
    );
};
