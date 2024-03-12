import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';
import { Game } from '../Game';
import { useEffect, useRef } from 'react';

interface DropdownMenuProps {
  game: Game;
  clickCoordinates: {
    x: number;
    y: number;
  };
  dotSize: number;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
}

const DropdownMenu = ({
  game,
  clickCoordinates,
  dotSize,
  isClicked,
  setIsClicked,
}: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight - 56; // 56, hardcoded footer height

      if (rect.right > windowWidth) {
        dropdownRef.current.style.left = `calc(${clickCoordinates.x}% - ${rect.width}px + ${dotSize}px)`;
      }

      if (rect.bottom > windowHeight) {
        dropdownRef.current.style.top = `calc(${clickCoordinates.y}% - ${rect.height}px)`;
      }
    }
  }, [clickCoordinates, dotSize]);

  return (
    <Card
      ref={dropdownRef}
      style={{
        top: `calc(${clickCoordinates.y}% + ${dotSize}px)`,
        left: `${clickCoordinates.x}%`,
      }}
      className='absolute cursor-default'
    >
      <CardHeader className='px-3 py-2'>
        <CardTitle className='text-nowrap text-md'>Choose a target!</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='pl-3 pr-4 py-3'>
        <div className='flex flex-col'>
          {game?.targets.map((target) => (
            <Button
              key={target.name}
              onClick={() => {
                console.log(target);
                setIsClicked(!isClicked);
              }}
              className='flex justify-start cursor-pointer gap-2 rounded-sm bg-card hover:bg-neutral-800 p-1 text-sm'
            >
              <img
                src={target.src}
                width={30}
                className='max-h-[30px] object-cover rounded-sm'
              />
              <p>{target.name}</p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DropdownMenu;
