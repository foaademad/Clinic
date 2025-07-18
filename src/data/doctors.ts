export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  education: string;
  languages: string[];
  about: string;
  availability: {
    [key: string]: string[];
  };
  consultationFee: number;
  location: string;
  phone: string;
  email: string;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    experience: 15,
    education: 'MD from Harvard Medical School',
    languages: ['English', 'Spanish'],
    about: 'Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and advanced cardiac procedures.',
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Friday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Saturday': ['09:00', '10:00', '11:00'],
      'Sunday': []
    },
    consultationFee: 200,
    location: 'Cardiology Wing, Floor 3',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@medisch.com'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrician',
    image: 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    experience: 12,
    education: 'MD from Johns Hopkins University',
    languages: ['English', 'Mandarin'],
    about: 'Dr. Michael Chen is a dedicated pediatrician who provides comprehensive care for children from infancy through adolescence. He has a special interest in developmental pediatrics.',
    availability: {
      'Monday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Tuesday': ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
      'Wednesday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Thursday': ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00'],
      'Friday': ['08:00', '09:00', '10:00', '11:00', '14:00'],
      'Saturday': ['08:00', '09:00', '10:00'],
      'Sunday': []
    },
    consultationFee: 150,
    location: 'Pediatrics Wing, Floor 2',
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@medisch.com'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.pexels.com/photos/4173350/pexels-photo-4173350.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    experience: 18,
    education: 'MD from Stanford Medical School',
    languages: ['English', 'Spanish', 'Portuguese'],
    about: 'Dr. Emily Rodriguez is a renowned orthopedic surgeon specializing in sports medicine and joint replacement. She has performed over 2000 successful surgeries.',
    availability: {
      'Monday': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'Tuesday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['10:00', '11:00', '14:00', '15:00', '16:00'],
      'Thursday': ['09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['10:00', '11:00', '14:00', '15:00'],
      'Saturday': [],
      'Sunday': []
    },
    consultationFee: 250,
    location: 'Orthopedics Wing, Floor 4',
    phone: '+1 (555) 345-6789',
    email: 'emily.rodriguez@medisch.com'
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialty: 'Neurologist',
    image: 'https://images.pexels.com/photos/4173352/pexels-photo-4173352.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    experience: 20,
    education: 'MD from Mayo Clinic',
    languages: ['English', 'French'],
    about: 'Dr. David Thompson is a leading neurologist with expertise in treating complex neurological disorders. He specializes in epilepsy and movement disorders.',
    availability: {
      'Monday': ['09:00', '10:00', '11:00', '15:00', '16:00'],
      'Tuesday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      'Wednesday': ['09:00', '10:00', '11:00', '15:00', '16:00'],
      'Thursday': ['09:00', '10:00', '14:00', '15:00', '16:00'],
      'Friday': ['09:00', '10:00', '11:00', '15:00'],
      'Saturday': ['09:00', '10:00'],
      'Sunday': []
    },
    consultationFee: 300,
    location: 'Neurology Wing, Floor 5',
    phone: '+1 (555) 456-7890',
    email: 'david.thompson@medisch.com'
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    specialty: 'Ophthalmologist',
    image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    experience: 14,
    education: 'MD from UCLA Medical School',
    languages: ['English', 'Mandarin', 'Korean'],
    about: 'Dr. Lisa Wang is an experienced ophthalmologist specializing in retinal diseases and cataract surgery. She has pioneered several innovative surgical techniques.',
    availability: {
      'Monday': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      'Tuesday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Wednesday': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      'Thursday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Friday': ['08:00', '09:00', '10:00', '14:00'],
      'Saturday': ['08:00', '09:00', '10:00'],
      'Sunday': []
    },
    consultationFee: 180,
    location: 'Ophthalmology Wing, Floor 3',
    phone: '+1 (555) 567-8901',
    email: 'lisa.wang@medisch.com'
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    specialty: 'General Medicine',
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    experience: 10,
    education: 'MD from University of Michigan',
    languages: ['English', 'Spanish'],
    about: 'Dr. Robert Martinez is a family medicine physician providing comprehensive primary care for patients of all ages. He focuses on preventive medicine and chronic disease management.',
    availability: {
      'Monday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Tuesday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Wednesday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Thursday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      'Friday': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
      'Saturday': ['08:00', '09:00', '10:00', '11:00'],
      'Sunday': []
    },
    consultationFee: 120,
    location: 'General Medicine Wing, Floor 1',
    phone: '+1 (555) 678-9012',
    email: 'robert.martinez@medisch.com'
  }
];