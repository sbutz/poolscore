import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function TenBallIcon({ color, fontSize, ...rest }: SvgIconProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SvgIcon color={color} fontSize={fontSize} viewBox="0 0 48 48" {...rest}>
      <defs>
        <mask id="TenBallMask">
          <circle cx="24" cy="24" r="21" fill="white" />
          <circle cx="24" cy="24" r="18" fill="black" />
          <rect y="13" width="48" height="22" fill="white" />
          <text
            x="24"
            y="26"
            fontSize="20"
            fontWeight="bold"
            fontFamily="Arial, Helvetica, sans-serif"
            fill="black"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            10
          </text>
        </mask>
      </defs>

      <circle
        cx="24"
        cy="24"
        r="21"
        fill="currentColor"
        mask="url(#TenBallMask)"
      />
    </SvgIcon>
  );
}
