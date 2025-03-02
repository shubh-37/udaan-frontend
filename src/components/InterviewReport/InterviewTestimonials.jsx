import { Testimonials } from "@/components/ui/testimonials"

const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'The AI interview experience was incredible! It felt like a real interview, and the feedback was spot on.',
      name: 'Alice Johnson',
      username: '@alicejohnson',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      text: 'The AI provided real-time feedback on my answers, which helped me refine my responses for actual job interviews.',
      name: 'David Smith',
      username: '@davidsmith',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/kaDy9hV.jpeg',
      text: 'I was skeptical at first, but the AI interview was surprisingly insightful. The performance metrics really helped me improve!',
      name: 'Emma Brown',
      username: '@emmabrown',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/cRwFxtE.png',
      text: 'The AI interview gave me detailed feedback on my technical and behavioral skills. It felt like a real-world assessment!',
      name: 'James Wilson',
      username: '@jameswilson',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/TQIqsob.png',
      text: 'I loved how structured and interactive the AI interview was. The insights I received helped me land my first tech job!',
      name: 'Sophia Lee',
      username: '@sophialee',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/3ROmJ0S.png',
      text: 'The AI interviewer helped me practice common interview questions and provided valuable feedback to improve my responses.',
      name: 'Michael Davis',
      username: '@michaeldavis',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/6fKCuVC.png',
      text: 'I was able to track my improvement over multiple AI interviews. The analytics really made a difference!',
      name: 'Emily Chen',
      username: '@emilychen',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/Jjqe7St.png',
      text: 'This platform helped me boost my confidence before real interviews. The AI gave me practical and detailed feedback!',
      name: 'Robert Lee',
      username: '@robertlee',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/bG88vHI.png',
      text: 'I highly recommend this AI interview tool! The analysis of my communication and problem-solving skills was eye-opening.',
      name: 'Sarah Taylor',
      username: '@sarahtaylor',
      social: 'https://i.imgur.com/VRtqhGC.png'
    },
    {
      image: 'https://i.imgur.com/tjmS77j.png',
      text: 'The AI interview felt just like a real one! It helped me understand my strengths and weaknesses before my actual interviews.',
      name: 'Kevin White',
      username: '@kevinwhite',
      social: 'https://i.imgur.com/VRtqhGC.png'
    }
  ];
  

export function TestimonialsDemo() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  )
}