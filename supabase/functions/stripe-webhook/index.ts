import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") || "sk_test_...";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "whsec_...";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
    try {
        const signature = req.headers.get("stripe-signature");
        if (!signature) {
            return new Response("No signature matching", { status: 400 });
        }

        // In a real app, use the official stripe-node library to verify the signature
        // using STRIPE_WEBHOOK_SECRET. For edge functions, you can import stripe:
        // import Stripe from 'https://esm.sh/stripe@14.14.0'
        const payload = await req.json();

        console.log(`Received event: ${payload.type}`);

        // Handle successful payment
        if (payload.type === 'checkout.session.completed') {
            const session = payload.data.object;

            // Ideally, pass the user's Supabase User ID in checkoutSession.client_reference_id
            const userId = session.client_reference_id;

            if (userId) {
                // Update the user's metadata in Supabase Auth to enable premium
                const { error } = await supabase.auth.admin.updateUserById(userId, {
                    user_metadata: { is_premium: true }
                });

                if (error) {
                    console.error("Error updating user:", error);
                    return new Response("Internal Server Error", { status: 500 });
                }

                console.log(`Successfully upgraded user ${userId} to Premium!`);
            } else {
                console.warn("checkout.session.completed received but no client_reference_id found.");
            }
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        console.error("Webhook Error:", err);
        return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
    }
});
