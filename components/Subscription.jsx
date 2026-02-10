import { useState } from "react";
import { Check, CreditCard, Shield, Zap, QrCode, Smartphone } from "lucide-react";

export default function Subscription() {
    const [selectedPlan, setSelectedPlan] = useState("monthly");

    const plans = [
        {
            id: "monthly",
            name: "Pro Monthly",
            price: "10",
            period: "/month",
            features: [
                "Unlimited Resume Generations",
                "All Premium Templates",
                "AI Content Optimization",
                "Custom PDF Export",
                "Priority Support",
            ],
            description: "Perfect for active job seekers",
            highlight: false
        },
        {
            id: "yearly",
            name: "Pro Yearly",
            price: "70",
            period: "/year",
            features: [
                "Everything in Monthly",
                "58% Savings vs Monthly",
                "Early Access to New Themes",
                "Personal Resume Branding",
                "Lifetime Storage"
            ],
            description: "Best value for long-term growth",
            highlight: true
        }
    ];

    const handlePayment = async (method) => {
        try {
            // In production, this would call your backend to create an Order/Session
            // and then open the respective gateway hosted page or modal
            console.log(`Initializing ${method} payment flow for plan: ${selectedPlan}`);

            if (method === "Stripe") {
                // Example Stripe Integration:
                // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
                // await stripe.redirectToCheckout({ sessionId: YOUR_BACKEND_SESSION_ID });
                window.location.href = `/api/payment/stripe?plan=${selectedPlan}`; // Placeholder redirect
            } else if (method === "Razorpay") {
                // Example Razorpay Integration:
                // const options = { key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, amount: '...', ... };
                // const rzp = new window.Razorpay(options);
                // rzp.open();
                alert("Initializing Razorpay Secure Checkout...");
            } else if (method === "UPI") {
                // Direct to UPI/QR Scanner page
                alert("Generating dynamic UPI QR Code for instant payment...");
            }
        } catch (error) {
            console.error("Payment initialization failed:", error);
        }
    };

    return (
        <section className="relative z-10 space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Upgrade to Premium
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                    Unlock the full potential of your career with advanced AI features and stunning premium designs.
                </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${plan.highlight
                            ? "bg-indigo-600/10 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.1)] scale-105 z-10"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                Best Value
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">${plan.price}</span>
                                <span className="text-slate-500 text-sm">{plan.period}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">{plan.description}</p>
                        </div>

                        <div className="space-y-4 mb-10 flex-grow">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-xs text-slate-300 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 ${selectedPlan === plan.id
                                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20"
                                : "bg-white/5 text-slate-300 hover:bg-white/10"
                                }`}
                        >
                            Select {plan.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Payment Options Section */}
            <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2 text-center md:text-left">
                        <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
                            <Shield size={20} className="text-indigo-400" /> Secure Checkout
                        </h4>
                        <p className="text-xs text-slate-500">Pick your preferred secure payment method below.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
                        <button
                            onClick={() => handlePayment("Stripe")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <CreditCard size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Stripe</span>
                        </button>

                        <button
                            onClick={() => handlePayment("Razorpay")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <Zap size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Razorpay</span>
                        </button>

                        <button
                            onClick={() => handlePayment("Cards")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <Smartphone size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Cards</span>
                        </button>

                        <button
                            onClick={() => handlePayment("UPI")}
                            className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col items-center gap-2"
                        >
                            <QrCode size={20} className="text-orange-400 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">UPI / QR</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6 opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg" alt="Amazon Pay" className="h-5" />
                </div>
            </div>
        </section>
    );
}
