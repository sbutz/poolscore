import SvgIcon from '@mui/material/SvgIcon';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export default function PoolRackIcon(props: SvgIconProps) {
  const { color, fontSize } = props;
  // Rack rows with positions (skip first row)
  const rackRows = [
    [{ x: 24, y: 12 }, { x: 36, y: 12 }], // 2 balls (top row)
    [{ x: 18, y: 23 }, { x: 30, y: 23 }, { x: 42, y: 23 }], // 3 balls
    [{ x: 12, y: 34 }, { x: 24, y: 34 }, { x: 36, y: 34 }, { x: 48, y: 34 }], // 4 balls
    [{ x: 6, y: 45 }, { x: 18, y: 45 }, { x: 30, y: 45 }, { x: 42, y: 45 }, { x: 54, y: 45 }], // 5 balls
  ];

  // First ball placed right side of rack, between row 2 and 3 vertically
  const firstBall = { x: 62, y: 18 + (23 - 18) / 2 }; // y = 20.5

  return (
    <SvgIcon color={color} fontSize={fontSize} viewBox="0 0 70 55">
      {/* First ball right next to rack */}
      <circle cx={firstBall.x} cy={firstBall.y} r={5} fill="currentColor" />

      {/* Draw the rack balls */}
      {rackRows.flat().map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill="currentColor" />
      ))}
    </SvgIcon>
  );
}
