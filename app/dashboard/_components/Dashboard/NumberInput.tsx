import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
}

export function NumberInput({ value, onChange, min = 0, max = Infinity }: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(Number(value) + 1, max);
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - 1, min);
    onChange(newValue.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || (Number(newValue) >= min && Number(newValue) <= max)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-r-none border-stroke bg-gray-2 text-body hover:bg-gray-2 hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:hover:bg-boxdark-2"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={handleChange}
        className="h-9 w-16 rounded-none border-x-0 border-stroke bg-gray-2 text-center text-black [appearance:textfield] focus:border-primary focus:ring-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-l-none border-stroke bg-gray-2 text-body hover:bg-gray-2 hover:text-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:hover:bg-boxdark-2"
        onClick={handleIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
