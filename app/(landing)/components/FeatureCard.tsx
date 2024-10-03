import { CheckCircle } from 'lucide-react';

export default function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 text-teal-800 shadow-lg">
      <h3 className="mb-2 flex items-center text-xl font-semibold">
        <CheckCircle className="mr-2 h-6 w-6 text-teal-500" />
        {title}
      </h3>
      <p>{description}</p>
    </div>
  );
}
