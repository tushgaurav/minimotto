export const siteContent = {
    structuredData: {
        name: "minimotto",
        description:
            "Torrent search engine",
        uri: "https://minimotto.com",
    },
    metadata: {
        title: "minimotto.com",
        description: "Torrent search engine",
        titleTemplate: "%s | minimotto",
    },
    header: {
        menus: [
            {
                trigger: "Docs",
                links: [
                    { label: "Docs", href: "/docs" },
                    { label: "How To", href: "/docs/installation" },
                    { label: "Best Practices", href: "/docs" },
                ],
            },
            {
                trigger: "Resources",
                featured: {
                    href: "/docs",
                    title: "Docs",
                    description: "How this site works and how to use it.",
                },
                links: [
                    {
                        title: "Best Practices",
                        href: "/docs",
                        description: "Best practices for using this site.",
                    },
                    {
                        title: "How To",
                        href: "/docs/installation",
                        description:
                            "How to install dependencies and structure your app.",
                    },
                    {
                        title: "Typography",
                        href: "/docs/primitives/typography",
                        description:
                            "Styles for headings, paragraphs, lists...etc",
                    },
                ],
            },
        ],
    },
    footer: {
        links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
        ],
    },
}