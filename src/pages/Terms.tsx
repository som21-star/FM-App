import { Header } from '@/components/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: March 7, 2026</p>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-6 pr-4">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By accessing and using Frequency House ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Frequency House provides access to live radio streaming from stations around the world. The Service includes both free and premium subscription tiers with varying features and capabilities.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                To access certain features of the Service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Premium Subscription</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Premium subscriptions provide enhanced features including:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>HD audio quality (320kbps)</li>
                <li>Access to all global regions</li>
                <li>Ad-free listening experience</li>
                <li>Unlimited favorites</li>
                <li>Priority customer support</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                Subscriptions are billed monthly or annually. You may cancel at any time, and cancellation will take effect at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Free Trial</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We may offer a 60-day free trial for Premium features. No payment information is required to start the trial. After the trial period, you may choose to subscribe to continue accessing Premium features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Acceptable Use</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Use the Service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Reproduce, duplicate, copy, or resell any part of the Service</li>
                <li>Use automated systems to access the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Content and Copyright</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All radio streams are provided by third-party radio stations. We do not own or control the content of these streams. All trademarks, logos, and brand names are the property of their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Disclaimer of Warranties</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, Frequency House shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Changes to Terms</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Termination</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Contact Information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-sm text-foreground mt-2">
                Email: support@frequencyhouse.com
              </p>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
