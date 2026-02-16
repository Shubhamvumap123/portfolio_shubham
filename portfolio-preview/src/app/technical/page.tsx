import { baseURL } from "@/app/resources";
import MissionControl from "@/components/technical/MissionControl";

export async function generateMetadata() {
    const title = "Mission Control";
    const description = "Advanced Technical Dashboard";
    const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "website",
            url: `https://${baseURL}/technical`,
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

export default function TechnicalPage() {
    return <MissionControl />;
}
