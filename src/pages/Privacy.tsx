import { Header } from '@/components/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 7, 2026</p>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Frequency House ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              
              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Personal Information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                When you create an account, we may collect:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Email address</li>
                <li>Display name</li>
                <li>Full name (optional)</li>
                <li>Phone number (optional)</li>
                <li>Location (optional)</li>
                <li>Profile picture (optional)</li>
                <li>Bio/About information (optional)</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Usage Information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                We automatically collect certain information when you use the Service:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Listening history and preferences</li>
                <li>Favorite stations</li>
                <li>Device information (browser type, operating system)</li>
                <li>IP address and location data</li>
                <li>Usage patterns and interactions with the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Provide, maintain, and improve the Service</li>
                <li>Personalize your experience and recommendations</li>
                <li>Process your subscription and payments</li>
                <li>Send you updates, newsletters, and promotional materials</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage and Security</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use Supabase for secure data storage and authentication. Your data is encrypted in transit and at rest. We implement industry-standard security measures to protect your information, but no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies and Tracking Technologies</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use the Service</li>
                <li>Improve the Service and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                You can control cookies through your browser settings, but disabling cookies may affect your ability to use certain features of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Third-Party Services</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                We use third-party services that may collect information:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Supabase (authentication and database)</li>
                <li>Radio streaming providers (content delivery)</li>
                <li>Analytics services (usage tracking)</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                These third parties have their own privacy policies governing their use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Data Sharing and Disclosure</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                We do not sell your personal information. We may share your information:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>With service providers who assist in operating the Service</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Your Rights and Choices</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                To exercise these rights, please contact us at privacy@frequencyhouse.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Children's Privacy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. International Data Transfers</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using the Service, you consent to such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Data Retention</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to provide the Service and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Changes to This Privacy Policy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact Us</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="text-sm text-foreground mt-2 space-y-1">
                <p>Email: privacy@frequencyhouse.com</p>
                <p>Support: support@frequencyhouse.com</p>
              </div>
            </section>

            <section className="border-t border-border pt-6 mt-8">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This Privacy Policy is effective as of the date stated at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
