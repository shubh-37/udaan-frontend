import { Testimonials } from '@/components/ui/testimonials';

const testimonials = [
  {
    image: 'https://i.imgur.com/Qz0HZPo.jpeg',
    text: 'The AI interview experience was truly immersive! It felt like a real job interview, and the feedback was incredibly accurate.',
    name: 'Amit Sharma',
    username: '@amitsharma',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/K6Tq3Nf.jpeg',
    text: 'I used this platform before my placement interviews, and it gave me the confidence I needed. Highly recommended!',
    name: 'Priya Verma',
    username: '@priyaverma',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/Jjqe7St.png',
    text: 'The AI feedback helped me refine my responses, and I landed a job at an MNC! The performance metrics were a game changer.',
    name: 'Rajesh Kumar',
    username: '@rajeshkumar',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/6fKCuVC.png',
    text: 'I loved how interactive and insightful the AI interview was! The suggestions helped me improve my technical and soft skills.',
    name: 'Sneha Iyer',
    username: '@snehaiyer',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/tjmS77j.png',
    text: 'The AI interviewer made me aware of my weak points, and I improved significantly in my communication skills!',
    name: 'Vikas Gupta',
    username: '@vikasgupta',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/AyJ9wH5.jpeg',
    text: 'Practicing with AI helped me ace my interviews at top Indian startups. The feedback was detailed and practical.',
    name: 'Pooja Singh',
    username: '@poojasingh',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/Kff0ddB.jpeg',
    text: 'The AI interview gave me a real-world feel. It helped me build confidence before appearing for campus placements.',
    name: 'Arun Nair',
    username: '@arunnair'
  },
  {
    image: 'https://i.imgur.com/YKjTQeP.jpeg',
    text: 'I was able to track my improvement over multiple AI interviews. The analytics provided deep insights into my performance!',
    name: 'Radhika Mehta',
    username: '@radhikamehta'
  },
  {
    image: 'https://i.imgur.com/KfpkOFJ.jpeg',
    text: 'This platform is a must-try for freshers! It helped me sharpen my problem-solving skills before my technical interviews.',
    name: 'Ankit Patel',
    username: '@ankitpatel',
    social: 'https://i.imgur.com/VRtqhGC.png'
  },
  {
    image: 'https://i.imgur.com/bG88vHI.png',
    text: 'The AI interview tool was super effective in identifying my improvement areas. I feel more prepared than ever!',
    name: 'Neha Agarwal',
    username: '@nehaagarwal',
    social: 'https://i.imgur.com/VRtqhGC.png'
  }
];

export function TestimonialsDemo() {
  return (
    <div className="container py-10">
      <Testimonials testimonials={testimonials} />
    </div>
  );
}
