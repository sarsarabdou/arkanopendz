import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    '#F7B32B', '#3182ce', '#FFFFFF', '#000000',
    '#ef4444', '#22c55e', '#3b82f6', '#8b5cf6',
    '#f59e0b', '#10b981', '#6366f1', '#ec4899'
  ];

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-12 h-8 p-1"
            style={{ backgroundColor: color }}
          >
            <div 
              className="w-full h-full rounded border"
              style={{ backgroundColor: color }}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Couleurs prédéfinies</label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => {
                      onChange(presetColor);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Couleur personnalisée</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-12 h-8 border rounded cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
        placeholder="#000000"
      />
    </div>
  );
};