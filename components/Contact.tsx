"use client";

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { submitContactForm } from '@/app/actions/contact';
import { contactFormSchema } from '@/lib/validation';

export default function Contact() {
    // Form state
    const [formState, setFormState] = useState({
        navn: '',
        email: '',
        emne: '',
        besked: '',
    });

    // UI state
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();

    // Honeypot spam protection (hidden from users)
    const [honeypot, setHoneypot] = useState('');
    const [timestamp] = useState(Date.now());

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Client-side validation
        const validation = contactFormSchema.safeParse(formState);

        if (!validation.success) {
            const errors: Record<string, string> = {};
            validation.error.errors.forEach((err) => {
                if (err.path[0]) {
                    errors[err.path[0].toString()] = err.message;
                }
            });
            setFieldErrors(errors);
            setStatus('error');
            setErrorMessage('Ret venligst fejlene nedenfor');
            return;
        }

        // Clear field errors if validation passes
        setFieldErrors({});

        startTransition(async () => {
            setStatus('loading');
            setErrorMessage('');

            const formData = new FormData();
            formData.append('navn', formState.navn);
            formData.append('email', formState.email);
            formData.append('emne', formState.emne);
            formData.append('besked', formState.besked);
            formData.append('honeypot', honeypot);
            formData.append('timestamp', timestamp.toString());

            const result = await submitContactForm(formData);

            if (result.success) {
                setStatus('success');
                // Reset form
                setFormState({ navn: '', email: '', emne: '', besked: '' });
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Der skete en fejl');
            }
        });
    };

    // Input change handler - clear field error when user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors({
                ...fieldErrors,
                [name]: '',
            });
        }
    };

    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's <span className="text-yellow-400">Chat</span></h2>
                    <p className="text-zinc-400 text-lg">Har du et projekt i tankerne, eller vil du booke mig til et oplæg?</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    {/* Image Side - Personal Touch */}
                    <div className="relative hidden lg:block bg-zinc-800">
                        <Image
                            src="/Kontakt-Julian.png"
                            alt="Kontakt Julian Bent Singh"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 1024px) 0vw, 50vw"
                        />
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>

                    {/* Form Side */}
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot field - hidden from users, catches bots */}
                            <input
                                type="text"
                                name="website"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                autoComplete="off"
                                tabIndex={-1}
                                aria-hidden="true"
                                style={{
                                    position: 'absolute',
                                    left: '-9999px',
                                    opacity: 0,
                                    pointerEvents: 'none',
                                }}
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Navn</label>
                                    <input
                                        type="text"
                                        name="navn"
                                        value={formState.navn}
                                        onChange={handleChange}
                                        required
                                        disabled={isPending}
                                        className={`w-full bg-zinc-950 border rounded-lg px-4 py-3 focus:outline-none transition-colors text-white disabled:opacity-50 ${
                                            fieldErrors.navn
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-zinc-800 focus:border-yellow-400'
                                        }`}
                                        placeholder="Dit navn"
                                    />
                                    {fieldErrors.navn && (
                                        <p className="text-red-400 text-sm">{fieldErrors.navn}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isPending}
                                        className={`w-full bg-zinc-950 border rounded-lg px-4 py-3 focus:outline-none transition-colors text-white disabled:opacity-50 ${
                                            fieldErrors.email
                                                ? 'border-red-500 focus:border-red-400'
                                                : 'border-zinc-800 focus:border-yellow-400'
                                        }`}
                                        placeholder="din@email.dk"
                                    />
                                    {fieldErrors.email && (
                                        <p className="text-red-400 text-sm">{fieldErrors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Emne</label>
                                <select
                                    name="emne"
                                    value={formState.emne}
                                    onChange={handleChange}
                                    required
                                    disabled={isPending}
                                    className={`w-full bg-zinc-950 border rounded-lg px-4 py-3 focus:outline-none transition-colors text-white appearance-none disabled:opacity-50 ${
                                        fieldErrors.emne
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-zinc-800 focus:border-yellow-400'
                                    }`}
                                >
                                    <option value="">Vælg emne...</option>
                                    <option value="booking">Booking af oplæg</option>
                                    <option value="workshop">Workshop forespørgsel</option>
                                    <option value="raadgivning">Strategisk rådgivning</option>
                                    <option value="investering">Investering / Pitch</option>
                                    <option value="andet">Andet</option>
                                </select>
                                {fieldErrors.emne && (
                                    <p className="text-red-400 text-sm">{fieldErrors.emne}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Besked</label>
                                <textarea
                                    name="besked"
                                    value={formState.besked}
                                    onChange={handleChange}
                                    required
                                    disabled={isPending}
                                    className={`w-full bg-zinc-950 border rounded-lg px-4 py-3 min-h-[150px] focus:outline-none transition-colors text-white resize-none disabled:opacity-50 ${
                                        fieldErrors.besked
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-zinc-800 focus:border-yellow-400'
                                    }`}
                                    placeholder="Skriv din besked her..."
                                />
                                {fieldErrors.besked && (
                                    <p className="text-red-400 text-sm">{fieldErrors.besked}</p>
                                )}
                            </div>

                            {/* Status Messages */}
                            <AnimatePresence mode="wait">
                                {status === 'loading' && (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center justify-center space-x-2 text-yellow-400"
                                    >
                                        <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                                        <span>Sender besked...</span>
                                    </motion.div>
                                )}

                                {status === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-green-500/10 border border-green-500 rounded-lg"
                                    >
                                        <p className="font-medium text-green-400">✓ Tak for din besked!</p>
                                        <p className="text-sm text-green-400/80 mt-1">Vi vender tilbage inden for 24 timer.</p>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        key="error"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-red-500/10 border border-red-500 rounded-lg"
                                    >
                                        <p className="font-medium text-red-400">✕ Der opstod en fejl</p>
                                        <p className="text-sm text-red-400/80 mt-1">{errorMessage}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isPending || status === 'loading'}
                                className="w-full py-4 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sender...' : 'Send Besked'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-zinc-500 text-sm">Julian Bent Singh • +45 00 00 00 00 • kontakt@julianbentsingh.dk</p>
                </div>
            </div>
        </section>
    );
}
