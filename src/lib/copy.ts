/* ============================================================================
   VAYUMI — All marketing copy in one place.
   Edit headlines, feature text, FAQ, etc. here without touching components.
   ========================================================================== */

export const site = {
  name: "Vayumi",
  tagline: "The AI that keeps your secrets",
  description:
    "Vayumi is the on-device AI assistant that listens, remembers, and gets things done — voice, meetings, and reminders — without a single byte ever leaving your phone.",
  email: "hello@vayumi.com",
};

/* --- Scene 1: Open --- */
export const hero = {
  eyebrow: "On-device AI assistant",
  headline: "Your AI. Your phone.\nNobody else.",
  subhead:
    "Vayumi talks, takes notes, and runs your day like any assistant — except the intelligence lives inside your phone. Nothing is uploaded. Nothing is sold.",
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
  headline: "Meet Vayumi.\nNothing leaves. Ever.",
  sub: "The same data, pulled back home and locked down. A local AI brain. AES-256 encryption. Your phone is the only server it needs.",
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
  counterLabel: "bytes sent to the cloud today",
  headline: "Powerful. Private. Yours.",
  sub: "Everything a cloud assistant does. None of the trade-offs.",
};

/* --- Scene 6: Waitlist --- */
export const waitlist = {
  eyebrow: "Early access",
  headline: "Get early access to the vault.",
  sub: "Be first to try the assistant that finally keeps your data where it belongs — on your phone.",
  placeholder: "you@example.com",
  cta: "Join the waitlist",
  ctaPending: "Joining…",
  success: "You're on the list. Welcome to the vault.",
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
    q: "Is my data really never uploaded?",
    a: "Correct. Vayumi runs a language model directly on your phone, so your conversations, voice, and meeting audio are processed locally. Meeting audio is encrypted with AES-256 and stays on your device. Only lightweight items like reminders sync — and only if you're signed in.",
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
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "FAQ", href: "#faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  copyright: `© ${new Date().getFullYear()} Vayumi. All rights reserved.`,
};

/* --- Navbar --- */
export const nav = {
  links: [
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: "Join waitlist",
};
