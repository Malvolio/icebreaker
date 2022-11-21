import { FC, ImgHTMLAttributes, useMemo } from "react";

type Props = {
  word: string;
  size: number;
  bgColor: string;
} & ImgHTMLAttributes<HTMLImageElement>;

const QR: FC<Props> = ({ word, size, bgColor, ...props }) => {
  const qrCode = useMemo(
    () =>
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`,
    [word, size, bgColor]
  );
  return <img src={qrCode} alt="" {...props} />;
};

export default QR;
