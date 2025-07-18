export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  duration: string;
  category: string;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'General Medicine',
    description: 'Comprehensive primary care services for all ages with preventive care and health maintenance.',
    icon: 'Stethoscope',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Annual health checkups',
      'Chronic disease management',
      'Preventive screenings',
      'Vaccination services',
      'Health counseling',
      'Minor procedure treatments'
    ],
    price: '$120 - $200',
    duration: '30-60 minutes',
    category: 'Primary Care'
  },
  {
    id: '2',
    title: 'Cardiology',
    description: 'Advanced heart care including diagnostics, treatment, and preventive cardiology services.',
    icon: 'Heart',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Cardiac catheterization',
      'Echocardiography',
      'Stress testing',
      'Heart rhythm monitoring',
      'Preventive cardiology',
      'Cardiac rehabilitation'
    ],
    price: '$200 - $500',
    duration: '45-90 minutes',
    category: 'Specialty Care'
  },
  {
    id: '3',
    title: 'Pediatrics',
    description: 'Specialized medical care for infants, children, and adolescents in a friendly environment.',
    icon: 'Baby',
    image: 'https://images.pexels.com/photos/4173350/pexels-photo-4173350.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Well-child visits',
      'Immunizations',
      'Growth monitoring',
      'Developmental assessments',
      'Sick child care',
      'Adolescent medicine'
    ],
    price: '$100 - $180',
    duration: '30-45 minutes',
    category: 'Specialty Care'
  },
  {
    id: '4',
    title: 'Orthopedics',
    description: 'Expert treatment for bone, joint, and muscle conditions with advanced surgical options.',
    icon: 'Bone',
    image: 'https://images.pexels.com/photos/4173352/pexels-photo-4173352.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Joint replacement surgery',
      'Sports medicine',
      'Fracture treatment',
      'Arthroscopic surgery',
      'Physical therapy',
      'Pain management'
    ],
    price: '$250 - $800',
    duration: '60-120 minutes',
    category: 'Surgical Care'
  },
  {
    id: '5',
    title: 'Ophthalmology',
    description: 'Complete eye care services including vision correction and advanced eye surgery.',
    icon: 'Eye',
    image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Comprehensive eye exams',
      'Cataract surgery',
      'Retinal treatments',
      'Glaucoma management',
      'LASIK surgery',
      'Pediatric ophthalmology'
    ],
    price: '$150 - $400',
    duration: '30-90 minutes',
    category: 'Specialty Care'
  },
  {
    id: '6',
    title: 'Neurology',
    description: 'Specialized care for nervous system disorders with state-of-the-art diagnostic tools.',
    icon: 'Brain',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Neurological evaluations',
      'EEG testing',
      'MRI interpretation',
      'Epilepsy treatment',
      'Movement disorder care',
      'Stroke prevention'
    ],
    price: '$300 - $600',
    duration: '60-90 minutes',
    category: 'Specialty Care'
  },
  {
    id: '7',
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response and critical care capabilities.',
    icon: 'Activity',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      '24/7 availability',
      'Trauma care',
      'Critical care',
      'Emergency surgery',
      'Ambulance services',
      'Rapid diagnostics'
    ],
    price: '$500 - $2000',
    duration: 'Variable',
    category: 'Emergency Care'
  },
  {
    id: '8',
    title: 'Preventive Care',
    description: 'Comprehensive health screenings and preventive services to maintain optimal health.',
    icon: 'Shield',
    image: 'https://images.pexels.com/photos/4173350/pexels-photo-4173350.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'Health screenings',
      'Cancer screenings',
      'Wellness programs',
      'Nutrition counseling',
      'Lifestyle coaching',
      'Risk assessments'
    ],
    price: '$80 - $150',
    duration: '30-60 minutes',
    category: 'Preventive Care'
  }
];