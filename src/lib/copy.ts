/* ============================================================================
   VAYUMI — All marketing copy in one place.
   Edit headlines, feature text, FAQ, etc. here without touching components.
   ========================================================================== */

export const site = {
  name: "Vayumi",
  tagline: "The AI that keeps your secrets",
  description:
    "Vayumi is the on-device AI assistant that listens, remembers, and gets things done — voice, meetings, and reminders — without a single byte ever leaving your phone.",
};

/* --- Contact (form, not a public email — keeps inboxes private + spam-free) --- */
export const contact = {
  eyebrow: "Contact",
  heading: "Get in touch",
  sub: "Questions, feedback, press, or a privacy request — send us a message and we read every one.",
  fields: {
    name: "Your name",
    email: "you@example.com",
    message: "How can we help?",
  },
  cta: "Send message",
  ctaPending: "Sending…",
  success: "Thanks — your message is on its way. We'll get back to you soon.",
  errorGeneric: "Something went wrong. Please try again.",
  errorValidation: "Please add your email and a short message.",
  privacyNote: "We only use what you send to reply. Nothing is shared or sold.",
};

/* --- Scene 1: Open --- */
export const hero = {
  eyebrow: "On-device AI assistant",
  headline: "Your AI. Your phone.\nNobody else.",
  subhead:
    "Vayumi talks, takes notes, and runs your day like any assistant — except the intelligence lives inside your phone. Your voice and audio never leave it. Nothing is sold.",
  cta: "Join the waitlist",
  scrollHint: "Scroll to see how",
};

/* --- Scene 2: The Leak --- */
export const leak = {
  headline: "Every other assistant\nships this somewhere.",
  sub: "Your voice. Your meetings. Your private thoughts. Streamed to servers you'll never see, stored on machines you don't own, used to train models you didn't agree to.",
  particleLabels: [
    "uploading voice…",
    "training data",
    "stored on a server",
    "synced to cloud",
    "shared with 3rd parties",
    "analyzing transcript",
  ],
};

/* --- Scene 3: The Flip --- */
export const flip = {
  headline: "Meet Vayumi.\nYour voice never leaves.",
  sub: "A local AI brain and AES-256 encryption mean your voice and meeting audio are processed and stored right on your phone. Your notes and reminders sync only when you sign in — encrypted in transit.",
  lockLabel: "ENCRYPTED · ON-DEVICE",
};

/* --- Scene 4: Feature reveals (orb morphs) --- */
export const features = [
  {
    id: "voice",
    kicker: "Voice-first",
    title: "Just say “Hey Vayumi.”",
    body: "Wake it with your voice or a tap. Have a real conversation — ask questions, dictate, get things done — all processed by an AI model running on your device.",
    accent: "brand",
  },
  {
    id: "meetings",
    kicker: "Meeting intelligence",
    title: "Records, transcribes, summarizes.",
    body: "One tap captures any meeting. Vayumi transcribes it live, then writes the summary, key points, and action items — and the audio is encrypted and never uploaded.",
    accent: "teal",
  },
  {
    id: "reminders",
    kicker: "Smart reminders",
    title: "“Remind me to call mom at 6.”",
    body: "Speak it once and it's set. Reminders sync across your devices and fire right on time — created by voice, kept effortless.",
    accent: "brand",
  },
  {
    id: "toolbox",
    kicker: "Action toolbox",
    title: "It acts — only with your okay.",
    body: "Call, text, search, navigate. Vayumi's toolbox grows as you need it, and every real-world action waits for your confirmation. No surprises, ever.",
    accent: "brand",
  },
] as const;

/* --- Scene 5: Recap --- */
export const recap = {
  counter: "0",
  counterLabel: "bytes of your voice or audio sent to the cloud",
  headline: "Powerful. Private. Yours.",
  sub: "Everything a cloud assistant does. None of the trade-offs.",
};

/* --- Scene 6: Waitlist --- */
export const waitlist = {
  eyebrow: "Early access",
  headline: "Be first on your phone",
  sub: "Join the waitlist for the assistant that finally keeps your data where it belongs — and get launch pricing before anyone else.",
  placeholder: "you@example.com",
  cta: "Join the waitlist",
  ctaPending: "Joining…",
  success: "You're on the list. We'll be in touch before launch.",
  errorGeneric: "Something went wrong. Please try again.",
  errorEmail: "Please enter a valid email address.",
  privacyNote: "No spam. We'll only email you about launch.",
};

/* --- How it works (3 steps) --- */
export const howItWorks = {
  eyebrow: "How it works",
  heading: "Three steps. Zero uploads.",
  sub: "No setup, no accounts to hand your data to. Vayumi works the moment you open it.",
  steps: [
    {
      n: "01",
      title: "Wake it",
      body: "Say “Hey Vayumi” or tap the orb. It's listening on-device — nothing is streamed to wake it.",
    },
    {
      n: "02",
      title: "Just talk",
      body: "Ask, dictate, or start a meeting. A local AI model understands you and does the work right on your phone.",
    },
    {
      n: "03",
      title: "It stays with you",
      body: "Notes, transcripts, and reminders are encrypted and kept on your device. Nothing leaves unless you say so.",
    },
  ],
};

/* --- Trust badges --- */
export const trustBadges = [
  "On-device AI",
  "AES-256 encrypted",
  "Works offline",
  "No data sold",
];

/* --- FAQ --- */
export const faqIntro =
  "Straight answers about what stays on your phone, and what never leaves it.";

export const faq = [
  {
    q: "What stays on my phone, and what syncs?",
    a: "Your conversations, voice, and meeting audio are processed by an on-device AI and never leave your phone — meeting audio is encrypted with AES-256 and stays local. If you sign in, your text records — meeting notes (transcript and summary) and reminders — sync across your devices, encrypted in transit. Stay signed out and nothing syncs at all.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. Voice conversations, meeting recording, transcription, and summaries all work fully offline because the AI lives on your device. An internet connection is only used for optional cross-device sync.",
  },
  {
    q: "Which platforms is Vayumi on?",
    a: "Vayumi is built for iOS and Android. Join the waitlist and we'll let you know the moment your platform is ready.",
  },
  {
    q: "How is this different from Siri or Google Assistant?",
    a: "Those send your requests to the cloud. Vayumi keeps the intelligence on your phone — plus it's a full meeting recorder and note-taker, and it asks before taking any real-world action like calling or texting.",
  },
  {
    q: "When does it launch and what will it cost?",
    a: "We're putting the finishing touches on it now. Waitlist members get first access and launch pricing details before anyone else.",
  },
];

/* --- Footer --- */
export const footer = {
  tagline: "The AI that keeps your secrets.",
  links: {
    product: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "FAQ", href: "/#faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Delete account", href: "/delete-account" },
    ],
  },
  copyright: `© ${new Date().getFullYear()} Vayumi. All rights reserved.`,
};

/* --- Navbar --- */
export const nav = {
  links: [
    { label: "How it works", href: "/#how" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: "Join waitlist",
};
