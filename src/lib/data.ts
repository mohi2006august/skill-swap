
import { PlaceHolderImages } from './placeholder-images';
import { SKILLS } from './skills';

export type User = {
  id: string;
  name: string;
  avatar: string;
  haveSkills: string[];
  wantSkills: string[];
};

export type Connection = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'declined';
};

export type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: Date;
    conversationId: string;
}

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const users: User[] = [
  {
    id: 'student1@university.edu',
    name: 'Alex Johnson',
    avatar: findImage('user-1'),
    haveSkills: ['Python', 'Data Structures', 'Git'],
    wantSkills: ['Engineering Drawing', 'React', 'Physics'],
  },
  {
    id: 'student2@university.edu',
    name: 'Maria Garcia',
    avatar: findImage('user-2'),
    haveSkills: ['Engineering Drawing', 'CAD', 'Physics'],
    wantSkills: ['Python', 'Algorithms', 'Web Development'],
  },
  {
    id: 'student3@university.edu',
    name: 'Chen Wei',
    avatar: findImage('user-3'),
    haveSkills: ['React', 'JavaScript', 'Node.js', 'Web Development'],
    wantSkills: ['Data Structures', 'Calculus', 'Git'],
  },
  {
    id: 'student4@university.edu',
    name: 'Fatima Al-Fassi',
    avatar: findImage('user-4'),
    haveSkills: ['Calculus', 'Linear Algebra', 'MATLAB'],
    wantSkills: ['JavaScript', 'CAD', 'Python'],
  },
  {
    id: 'student5@university.edu',
    name: 'David Smith',
    avatar: findImage('user-5'),
    haveSkills: ['Algorithms', 'Java', 'Spring Boot'],
    wantSkills: ['React', 'Node.js', 'Physics'],
  },
  {
    id: 'student6@university.edu',
    name: 'Yuki Tanaka',
    avatar: findImage('user-6'),
    haveSkills: ['UI/UX Design', 'Figma', 'HTML/CSS'],
    wantSkills: ['JavaScript', 'React', 'Data Structures'],
  },
];

export const connections: Connection[] = [
    { id: 'conn1', fromUserId: 'student2@university.edu', toUserId: 'student1@university.edu', status: 'pending' },
    { id: 'conn2', fromUserId: 'student4@university.edu', toUserId: 'student1@university.edu', status: 'pending' },
    { id: 'conn3', fromUserId: 'student1@university.edu', toUserId: 'student3@university.edu', status: 'pending' },
    { id: 'conn4', fromUserId: 'student1@university.edu', toUserId: 'student5@university.edu', status: 'accepted' },
    { id: 'conn5', fromUserId: 'student6@university.edu', toUserId: 'student1@university.edu', status: 'accepted' },
];

export const messages: Message[] = [
    {
      id: 'msg1',
      conversationId: 'student1@university.edu_student5@university.edu',
      senderId: 'student5@university.edu',
      receiverId: 'student1@university.edu',
      text: 'Hey Alex! Ready to dive into some React? I have some time this weekend.',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      id: 'msg2',
      conversationId: 'student1@university.edu_student5@university.edu',
      senderId: 'student1@university.edu',
      receiverId: 'student5@university.edu',
      text: 'Hey David! Absolutely. How about Saturday afternoon? I can help you with those algorithms then.',
      timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    },
     {
      id: 'msg3',
      conversationId: 'student1@university.edu_student5@university.edu',
      senderId: 'student5@university.edu',
      receiverId: 'student1@university.edu',
      text: 'Sounds perfect. Saturday it is!',
      timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    },
    {
      id: 'msg4',
      conversationId: 'student1@university.edu_student6@university.edu',
      senderId: 'student6@university.edu',
      receiverId: 'student1@university.edu',
      text: 'Hi Alex, I saw you know Data Structures. Could you help me out?',
      timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
];

export const currentUser = users[0];
