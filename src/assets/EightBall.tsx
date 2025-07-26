import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function EightBallIcon({ color, fontSize, ...rest }: SvgIconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon color={color} fontSize={fontSize} viewBox="0 0 48 48" {...rest}>
      <defs>
        <mask id="EightBallMask">
          <rect width="48" height="48" fill="white" />
          <text
            x="24"
            y="26"
            fontSize="24"
            fontWeight="bold"
            fontFamily="Arial, Helvetica, sans-serif"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            8
          </text>
        </mask>
      </defs>

      {/* Ball with currentColor, masked by the "8" */}
      <circle
        cx="24"
        cy="24"
        r="20"
        fill="currentColor"
        mask="url(#EightBallMask)"
      />
    </SvgIcon>
  );
}
