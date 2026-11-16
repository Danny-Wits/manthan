export interface SessionTopic {
  id: string;
  title: string;
  shortDesc: string;
  intendedAudience: string;
  keyAreas: string[];
}

export const SESSIONS_DATA: SessionTopic[] = [
  {
    id: 'psychology-wellbeing',
    title: 'Psychology and Mental Well-being',
    shortDesc: 'Foundational mental health literacy, cognitive resilience, coping strategies, and de-stigmatizing emotional distress in academic life.',
    intendedAudience: 'School & college students, educators, academic staff',
    keyAreas: ['Stress Resilience', 'Cognitive Habits', 'Emotional De-stigmatization'],
  },
  {
    id: 'self-discovery',
    title: 'Self-Discovery and Personality',
    shortDesc: 'Structured introspection workshops helping participants understand core values, temperament, strengths, and personal identity.',
    intendedAudience: 'High school & undergraduate students, youth cohorts',
    keyAreas: ['Self-Concept', 'Core Values', 'Temperament & Character'],
  },
  {
    id: 'philosophy-thinking',
    title: 'Philosophy and Critical Thinking',
    shortDesc: 'Dialectical discussions and Socratic inquiry challenging cognitive biases, encouraging ethical reasoning, and exploring human meaning.',
    intendedAudience: 'Colleges, universities, debate forums, senior school students',
    keyAreas: ['Socratic Inquiry', 'Cognitive Biases', 'Ethical Reasoning'],
  },
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    shortDesc: 'Practical toolkits on emotional awareness, empathy, affective regulation, and constructive interpersonal communication.',
    intendedAudience: 'Students, student council leaders, peer mentors, teachers',
    keyAreas: ['Emotional Granularity', 'Active Empathy', 'Constructive Dialogue'],
  },
  {
    id: 'human-behaviour',
    title: 'Human Behaviour',
    shortDesc: 'Examining why people act, decide, and conform the way they do — drawing from social psychology, behavioral heuristics, and group dynamics.',
    intendedAudience: 'Senior secondary & college students, interdisciplinary clubs',
    keyAreas: ['Social Conformity', 'Decision Heuristics', 'Interpersonal Dynamics'],
  },
  {
    id: 'creativity-expression',
    title: 'Creativity and Expression',
    shortDesc: 'Experiential arts and creative exercises translating internal states, philosophical inquiries, and stories into tangible artistic mediums.',
    intendedAudience: 'Open to all students, literature & art societies',
    keyAreas: ['Reflective Writing', 'Expressive Arts', 'Narrative Identity'],
  },
];

export const CONTACT_INFO = {
  email: 'contact@manthaninitiative.org',
  phone: '+91 94191 23456',
  instagram: 'https://instagram.com/manthan.initiative',
  instagramHandle: '@manthan.initiative',
  linkedin: 'https://linkedin.com/company/manthan-initiative',
  linkedinHandle: 'MANTHAN Initiative',
  location: 'Jammu & Kashmir · Delhi NCR (Open for Pan-India & Virtual Sessions)',
};
