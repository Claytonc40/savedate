import { Button } from '@/components/ui/button';

export default function SupportCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center text-teal-800 shadow-lg">
      {icon}
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mb-4">{description}</p>
      <Button className="mt-auto">{action}</Button>
    </div>
  );
}
