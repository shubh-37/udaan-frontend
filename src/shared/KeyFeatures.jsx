import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import preparation from '../assets/preparation.png';
import feedback from '../assets/feedback.png';
import flexible from '../assets/flexible.png';
export default function KeyFeatures() {
  const content = [
    {
      heading: 'Role-Specific Preparation',
      description: 'Mock interviews to reflect the actual roles',
      img: preparation
    },
    { heading: 'Personalized Feedback', description: 'Detailed analysis on technical knowledge', img: feedback },
    { heading: 'Flexible Scheduling', description: 'Practice anytime, anywhere, at your convenience', img: flexible }
  ];
  return (
    <>
      <div className="flex w-full justify-around flex-wrap gap-4">
        {content.map((item) => (
          <>
            <Card className="flex flex-col items-center justify-between">
              <CardHeader>
                <CardDescription>
                  <div>
                    <img src={item.img} width={200} height={200} />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <p className="text-xl text-gray-600 font-bold">{item.heading}</p>
                <p className="text-gray-500 font-semibold">{item.description}</p>
              </CardContent>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
