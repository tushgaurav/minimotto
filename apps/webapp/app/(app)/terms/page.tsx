import type { Metadata } from "next";
import { Page, PageTitle, Paragraph, Subtitle } from "@/components/shared/page";

export const metadata: Metadata = {
  title: "Terms of Service | minimotto",
};

export default function TermsPage() {
  return (
    <Page>
      <PageTitle>Terms of Service</PageTitle>
      <h2 className="text-sm text-muted-foreground">Last updated: 30/07/2025</h2>

      <Paragraph className="mt-6">
        Welcome to minimotto ("we," "us," or "our"). minimotto is a torrent
        index and search aggregator that provides users with aggregated search
        results from various private torrent trackers. By accessing or using our
        website (the "Service"), you agree to be bound by these Terms and
        Conditions ("Terms"). If you do not agree with any part of these Terms,
        you must not use the Service.
      </Paragraph>
      <Paragraph>
        These Terms apply to all visitors, users, and others who access or use
        the Service. We reserve the right to modify these Terms at any time, and
        such modifications will be effective upon posting on the website. Your
        continued use of the Service after any changes constitutes your
        acceptance of the updated Terms.
      </Paragraph>

      <Subtitle>1. Description of Service</Subtitle>
      <Paragraph>
        minimotto is a search engine and index that aggregates torrent search
        results from multiple private torrent trackers. We do not host, store,
        or distribute any torrent files, content, or copyrighted material. Our
        Service acts solely as an aggregator, providing links to search results
        from third-party trackers. Access to these trackers may require
        membership or invitations, which minimotto does not provide or
        facilitate.
      </Paragraph>
      <Paragraph>
        We do not control the content, availability, or accuracy of the results
        from these third-party trackers. Users are responsible for ensuring they
        have legitimate access to any private trackers and for complying with
        those trackers' rules and applicable laws.
      </Paragraph>

      <Subtitle>2. User Eligibility and Accounts</Subtitle>
      <Paragraph>
        You must be at least 18 years old or the age of majority in your
        jurisdiction to use the Service. By using the Service, you represent and
        warrant that you meet this requirement.
      </Paragraph>
      <Paragraph>
        If the Service requires user accounts (e.g., for personalized searches
        or features), you agree to provide accurate information during
        registration and to keep your account secure. You are responsible for
        all activities that occur under your account.
      </Paragraph>

      <Subtitle>3. User Obligations and Conduct</Subtitle>
      <Paragraph>By using minimotto, you agree to:</Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-6 max-w-[80ch]">
        <li>
          Use the Service only for lawful purposes and in compliance with all
          applicable local, national, and international laws, including
          copyright and intellectual property laws.
        </li>
        <li>
          Not use the Service to search for, access, or distribute illegal,
          infringing, or unauthorized content.
        </li>
        <li>
          Not attempt to bypass, disable, or interfere with any security
          features of the Service or third-party trackers.
        </li>
        <li>
          Not use automated tools (e.g., bots, scrapers) to access or harvest
          data from the Service without our prior written consent.
        </li>
        <li>
          Not upload, post, or transmit any harmful content, such as viruses,
          malware, or spam.
        </li>
        <li>
          Respect the privacy and rights of others, including not sharing
          personal information without consent.
        </li>
      </ul>
      <Paragraph>
        We do not endorse or guarantee the legality of any content indexed
        through our Service. You are solely responsible for your use of the
        aggregated results and any consequences arising from downloading or
        sharing torrents.
      </Paragraph>

      <Subtitle>4. Intellectual Property</Subtitle>
      <Paragraph>
        The Service, including its design, text, graphics, logos, and software,
        is owned by or licensed to minimotto and is protected by copyright,
        trademark, and other intellectual property laws. You may not copy,
        modify, distribute, or create derivative works based on the Service
        without our express written permission.
      </Paragraph>
      <Paragraph>
        minimotto does not claim ownership over any content from third-party
        trackers. Any intellectual property rights in the aggregated search
        results belong to their respective owners. If you believe any content
        indexed by our Service infringes on your intellectual property rights,
        please contact us at [insert contact email, e.g., legal@minimotto.com]
        with details for review.
      </Paragraph>

      <Subtitle>5. Disclaimer of Warranties</Subtitle>
      <Paragraph>
        The Service is provided on an "as is" and "as available" basis. We make
        no warranties, express or implied, regarding the accuracy, completeness,
        reliability, or availability of the Service or any aggregated results.
        We disclaim all warranties, including but not limited to implied
        warranties of merchantability, fitness for a particular purpose, and
        non-infringement.
      </Paragraph>
      <Paragraph>
        We do not warrant that the Service will be uninterrupted, error-free, or
        free from viruses or other harmful components. Your use of the Service
        is at your own risk.
      </Paragraph>

      <Subtitle>6. Limitation of Liability</Subtitle>
      <Paragraph>
        To the fullest extent permitted by law, minimotto, its affiliates,
        officers, directors, employees, and agents shall not be liable for any
        direct, indirect, incidental, special, consequential, or punitive damages
        of any kind arising from or related to your use of the Service, including
        but not limited to loss of data, profits, business opportunities, or any
        other damages whatsoever.
      </Paragraph>
      <Paragraph>
        minimotto provides this Service free of charge and assumes no liability
        whatsoever. Our total liability to you for any claim arising from these
        Terms or the Service shall be zero ($0). You use the Service entirely at
        your own risk and expense.
      </Paragraph>
      <Paragraph>
        This complete exclusion of liability applies regardless of the cause of
        action, whether in contract, tort, negligence, strict liability, or
        otherwise, and even if we have been advised of the possibility of such
        damages.
      </Paragraph>
      
      <Subtitle>7. Indemnification</Subtitle>
      <Paragraph>
        You agree to indemnify, defend, and hold harmless minimotto, its
        affiliates, officers, directors, employees, and agents from any claims,
        liabilities, damages, losses, and expenses (including reasonable
        attorneys' fees) arising from or related to:
      </Paragraph>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Your violation of these Terms.</li>
        <li>
          Your use of the Service, including any content you access or share.
        </li>
        <li>
          Your infringement of any third-party rights, including intellectual
          property rights.
        </li>
      </ul>

      <Subtitle>8. Termination</Subtitle>
      <Paragraph>
        We may terminate or suspend your access to the Service at any time,
        without notice or liability, for any reason, including if we believe you
        have violated these Terms or engaged in unlawful activity.
      </Paragraph>
      <Paragraph>
        Upon termination, your right to use the Service will immediately cease,
        and we may delete any associated data.
      </Paragraph>

      <Subtitle>9. Governing Law and Dispute Resolution</Subtitle>
      <Paragraph>
        These Terms shall be governed by the laws of [insert jurisdiction, e.g.,
        the State of California, USA, without regard to its conflict of law
        principles].
      </Paragraph>
      <Paragraph>
        Any disputes arising from these Terms or the Service shall be resolved
        exclusively in the courts located in [insert location, e.g., San
        Francisco, California]. You agree to submit to the personal jurisdiction
        of such courts.
      </Paragraph>

      <Subtitle>10. Changes to These Terms</Subtitle>
      <Paragraph>
        We may update these Terms from time to time. We will notify you of
        significant changes by posting the new Terms on this page and updating
        the "Last Updated" date. Your continued use of the Service after such
        changes constitutes your acceptance.
      </Paragraph>

      <Subtitle>11. Contact Us</Subtitle>
      <Paragraph>
        If you have any questions about these Terms, please contact us at
        minimotto@tushgaurav.in or via our contact form on the website.
      </Paragraph>
      <Paragraph>
        By using minimotto, you acknowledge that you have read, understood, and
        agree to these Terms and Conditions.
      </Paragraph>
    </Page>
  );
}
