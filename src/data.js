// Static content and demo data for the prototype.
// In the real system this would come from the Django REST API.

export const HELP_TYPES = [
  {
    id: 'peer',
    icon: '💬',
    title: 'I want to talk',
    description: 'A vetted survivor-volunteer who understands',
    responder: 'Peer volunteer',
  },
  {
    id: 'professional',
    icon: '🩺',
    title: 'Professional help',
    description: 'Verified therapist, doctor or legal aid',
    responder: 'Verified professional',
  },
];

export const PROFESSIONAL_KINDS = ['Therapist', 'Doctor', 'Legal aid'];

export const LANGUAGES = ['English', 'Kiswahili', 'Maa', 'Somali'];

// Steps shown on the request-status screen (slide 11 of the pitch).
export const REQUEST_STEPS = ['Request sent', 'Matching helpers', 'Helper accepted'];

// Demo volunteers that "accept" requests in the simulation.
export const DEMO_HELPERS = {
  peer: ['Amani (peer volunteer)', 'Neema (peer volunteer)'],
  professional: ['Dr. W. (verified doctor)', 'J. (verified therapist)', 'K. (legal aid)'],
  urgent: ['Triage desk (verified staff)'],
};

export const LEARN_TOPICS = [
  {
    icon: '📖',
    title: 'What is FGM?',
    body:
      'Female genital mutilation (FGM) is any procedure that partly or fully removes the external female genitalia, or injures them, for non-medical reasons (WHO). It has no health benefits and is nearly always done to minors.',
  },
  {
    icon: '🔢',
    title: 'The four types',
    body:
      'Type 1: clitoridectomy.\nType 2: excision.\nType 3: infibulation (narrowing of the vaginal opening).\nType 4: other harmful procedures such as pricking, piercing, cutting, scraping or burning.',
  },
  {
    icon: '⚖️',
    title: 'Your rights',
    body:
      'FGM violates the right to health, bodily integrity, children\'s rights and equality. In 2012 the UN General Assembly urged all countries to ban it. FGM is illegal in Kenya. When health workers do it, it is still harmful and still a violation.',
  },
  {
    icon: '❤️‍🩹',
    title: 'Health and recovery',
    body:
      'FGM can cause lasting physical and emotional effects. Counselling, medical care and, for some, reconstructive surgery are options. Every choice is yours, and you can take your time.',
  },
  {
    icon: '📊',
    title: 'The numbers',
    body:
      'More than 230 million girls and women alive today have undergone FGM, and more than 4 million girls are at risk each year. In Kenya, 14.8% of women aged 15 to 49 have undergone FGM (KDHS 2022).',
  },
];

// Random, anonymous case ID like "LC-7K2Q9". No names are ever needed.
export function makeCaseId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  for (let i = 0; i < 5; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return `LC-${id}`;
}

// Random pseudonym for peer chat, e.g. "Quiet Lantern 42".
export function makePseudonym() {
  const a = ['Quiet', 'Bright', 'Gentle', 'Brave', 'Warm', 'Calm'];
  const b = ['Lantern', 'Star', 'River', 'Acacia', 'Dawn', 'Sparrow'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(a)} ${pick(b)} ${Math.floor(Math.random() * 90) + 10}`;
}
