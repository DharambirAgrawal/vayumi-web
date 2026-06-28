/* ============================================================================
   VAYUMI — All marketing copy in one place.
   Edit headlines, feature text, FAQ, etc. here without touching components.
   ========================================================================== */

export const site = {
  name: "Vayumi",
  tagline: "The AI that keeps your secrets",
  description:
    "Vayumi is the on-device AI assistant that actually knows your life. It tracks your spending, meds, habits and more by voice or photo, takes meeting notes, and runs your day, without a single byte of your voice or audio ever leaving your phone.",
};

/* --- Contact (form, not a public email — keeps inboxes private + spam-free) --- */
export const contact = {
  eyebrow: "Contact",
  heading: "Get in touch",
  sub: "Questions, feedback, press, or a privacy request? Send us a message and we read every one.",
  fields: {
    name: "Your name",
    email: "you@example.com",
    message: "How can we help?",
  },
  cta: "Send message",
  ctaPending: "Sending…",
  success: "Thanks! Your message is on its way. We'll get back to you soon.",
  errorGeneric: "Something went wrong. Please try again.",
  errorValidation: "Please add your email and a short message.",
  privacyNote: "We only use what you send to reply. Nothing is shared or sold.",
};

/* --- Scene 1: Open --- */
export const hero = {
  eyebrow: "On-device AI assistant",
  headline: "Your AI. Your phone.\nNobody else.",
  subhead:
    "Vayumi talks, takes notes, and runs your day like any assistant. The difference is that the intelligence runs on your phone by default. Your voice and audio never leave it, and nothing is sold. Want more muscle? Flip on Cloud mode any time.",
  cta: "Join the waitlist",
  scrollHint: "Scroll to see how",
};

/* --- Scene 2: The Leak --- */
export const leak = {
  headline: "Every other assistant\nships this somewhere.",
  sub: "Your voice, your meetings, your private thoughts. Streamed to servers you'll never see, stored on machines you don't own, used to train models you didn't agree to.",
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
  sub: "A local AI brain and AES-256 encryption keep your voice, meeting audio, and photos on your phone. They never upload, even in Cloud mode. The AI runs on-device by default, and your notes and reminders sync only when you sign in, encrypted in transit.",
  lockLabel: "ON-DEVICE BY DEFAULT",
};

/* --- Life: the flagship "your AI knows your life" feature --- */
export const life = {
  eyebrow: "The flagship",
  headline: "An AI that actually\nknows your life.",
  sub: "Most assistants forget you the moment the chat ends. Vayumi remembers. It keeps living trackers for your spending, meds, sleep, workouts, anything you want, and fills them in for you. Just talk, or snap a photo. It's your second memory, and it lives on your phone.",
  // The on-device superpowers that make Life different.
  pillars: [
    {
      id: "log",
      title: "Logs it for you",
      body: "“I spent $40 on groceries.” “Took my vitamin D.” Vayumi understands and files it in the right tracker, creating one if it doesn't exist yet. No forms, no tapping.",
    },
    {
      id: "see",
      title: "Reads your photos",
      body: "Snap a receipt, a medicine label, or a meal. The on-device AI reads it and logs the details, and the photo itself never leaves your phone.",
    },
    {
      id: "remember",
      title: "Remembers you",
      body: "It keeps a small, curated memory of the things that matter, like your coffee order, your car, and your routines, so answers feel personal, not generic.",
    },
    {
      id: "ask",
      title: "Answers anything",
      body: "“How much did I spend this week?” “When did I last take ibuprofen?” Vayumi reads your own data and answers instantly, math and all.",
    },
  ],
  // Example trackers shown in the visual.
  trackers: [
    { name: "Spending", icon: "card", stat: "$420 this week", tone: "teal" },
    { name: "Medicine", icon: "pill", stat: "2 doses today", tone: "brand" },
    { name: "Sleep", icon: "moon", stat: "7.2h avg", tone: "blue" },
    { name: "Workouts", icon: "dumbbell", stat: "4 this week", tone: "amber" },
  ],
  syncNote: "Yours alone. Synced encrypted across your devices when you sign in, never sold, never trained on.",
};

/* --- Scene 4: Feature reveals (orb morphs) --- */
export const features = [
  {
    id: "voice",
    kicker: "Voice-first",
    title: "Just say “Hey Vayumi.”",
    body: "Wake it with your voice or a tap, then have a real conversation. Ask questions, dictate, get things done, all handled by an AI model on your device by default, with cloud power one switch away.",
    accent: "brand",
  },
  {
    id: "meetings",
    kicker: "Meeting intelligence",
    title: "Records, transcribes, summarizes.",
    body: "One tap captures any meeting. Vayumi transcribes it live, then writes the summary, key points, and action items. The audio is encrypted and never uploaded.",
    accent: "teal",
  },
  {
    id: "reminders",
    kicker: "Smart reminders",
    title: "“Remind me to call mom at 6.”",
    body: "Speak it once and it's set. Reminders sync across your devices and fire right on time, created by voice and kept effortless.",
    accent: "brand",
  },
  {
    id: "toolbox",
    kicker: "Action toolbox",
    title: "It acts. Only with your okay.",
    body: "Call, text, search, navigate. Vayumi's toolbox grows as you need it, and every real world action waits for your confirmation. No surprises, ever.",
    accent: "brand",
  },
] as const;

/* --- Scene 5: Recap --- */
export const recap = {
  counter: "0",
  counterLabel: "bytes of your voice or audio uploaded, even with Cloud mode on",
  headline: "Powerful. Private. Yours.",
  sub: "On-device and private by default, with optional cloud power when you want it.",
};

/* --- Scene 6: Waitlist --- */
export const waitlist = {
  eyebrow: "Early access",
  headline: "Be first on your phone",
  sub: "Join the waitlist for the assistant that finally keeps your data where it belongs, and get launch pricing before anyone else.",
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
  heading: "Three steps. On-device by default.",
  sub: "No setup, no account required to start. Vayumi works the moment you open it.",
  steps: [
    {
      n: "01",
      title: "Wake it",
      body: "Say “Hey Vayumi” or tap the orb. It's listening on-device, and nothing is streamed to wake it.",
    },
    {
      n: "02",
      title: "Just talk",
      body: "Ask, dictate, or start a meeting. A local AI model handles it right on your phone by default, or switch on Cloud mode for a more powerful model when you want extra muscle.",
    },
    {
      n: "03",
      title: "It remembers",
      body: "Your trackers, notes, transcripts, and reminders are encrypted and kept on your device, building an AI that knows your life. Nothing leaves unless you say so.",
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
  "Straight answers about what stays on your phone, what syncs when you sign in, and what changes if you turn on Cloud mode.";

export const faq = [
  {
    q: "How does Vayumi “know my life”?",
    a: "Vayumi keeps living trackers for spending, meds, sleep, workouts, or anything you want, and fills them in from plain conversation or a photo. Say “I spent $30 on lunch” or snap a receipt, and it logs the details and answers questions later like “how much did I spend this week?”. By default the AI runs on your device, so the raw photos and audio never leave your phone.",
  },
  {
    q: "Is everything really on-device? What is Cloud mode?",
    a: "By default, yes. The AI runs entirely on your phone, so your conversations stay local. Vayumi also has an optional Cloud mode (off by default, and it needs you to sign in) that routes chat and voice to a more powerful AI for tougher questions. When Cloud mode is on, the text of those messages is sent to our server and a third-party AI provider to generate the reply. It is never sold or used to train Vayumi. Even then, your voice recordings, meeting audio, and scanned photos still never leave your device. You choose the mode with a single switch, any time.",
  },
  {
    q: "What stays on my phone, and what syncs?",
    a: "Your voice recordings, meeting audio, and any photos you scan are processed on-device and never leave your phone. Meeting audio is encrypted with AES-256 and stays local. In the default on-device mode, your conversations stay local too. If you sign in, your text records (Life tracker entries, memory, meeting notes, and reminders) sync across your devices, encrypted in transit. Stay signed out and nothing syncs at all. Turning on Cloud mode additionally sends your chat and voice text to the cloud to generate replies (see Cloud mode above).",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. In the default on-device mode, voice conversations, meeting recording, transcription, and summaries all work fully offline because the AI lives on your phone. An internet connection is only needed for optional cross-device sync or if you turn on Cloud mode.",
  },
  {
    q: "Which platforms is Vayumi on?",
    a: "Vayumi is built for iOS and Android. Join the waitlist and we'll let you know the moment your platform is ready.",
  },
  {
    q: "How is this different from Siri or Google Assistant?",
    a: "Those always send your requests to the cloud. Vayumi runs on your phone by default and only uses the cloud if you switch on Cloud mode. On top of that it's a full meeting recorder and note-taker, and it asks before taking any real world action like calling or texting.",
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
      { label: "Life", href: "/#life" },
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
    { label: "Life", href: "/#life" },
    { label: "How it works", href: "/#how" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: "Join waitlist",
};
