import type { Metadata } from "next";
import { PageTitle, Paragraph } from "@/components/shared/page";

export const metadata : Metadata = {
    title: "Docs"
}

export default function DocsPage() {
  return (
    <div>
      <PageTitle>Docs</PageTitle>

      <Paragraph>
        Welcome to the documentation section. Here you'll find comprehensive
        guides and references to help you get the most out of our platform.
        Whether you're just getting started or looking to deepen your
        understanding, we've got you covered.
      </Paragraph>

      <Paragraph>
        Our documentation is organized into several key sections including
        installation guides, best practices, API references, and common
        troubleshooting tips. Use the navigation menu above to explore different
        topics.
      </Paragraph>

      <Paragraph>
        If you're new here, we recommend starting with our "Getting Started"
        guide which will walk you through the basics of setting up and using our
        platform effectively.
      </Paragraph>
    </div>
  );
}
