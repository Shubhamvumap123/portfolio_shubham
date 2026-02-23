"use client";

import { person, home } from "@/app/resources/content";
import { baseURL } from "@/app/resources";

export const StructuredData = () => {
    const personStructuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": person.name,
        "jobTitle": person.role,
        "url": `https://${baseURL}`,
        "sameAs": [
            "https://github.com/Shubhamvumap123",
            "https://www.linkedin.com/in/shubhamvumap123"
        ],
        "location": {
            "@type": "Place",
            "name": person.location
        }
    };

    const websiteStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": person.name + " Portfolio",
        "url": `https://${baseURL}`,
        "description": home.description
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
            />
        </>
    );
};
