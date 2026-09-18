import type { FC } from "react";

const DEFAULT_SIZE = 64;
export const CoverPlaceholder: FC<CoverPlaceholderProps> = ({ size }) => (
  <div
    style={{
      width: size ?? DEFAULT_SIZE,
      height: size ?? DEFAULT_SIZE,
      display: "grid",
      placeItems: "center",
      background: "var(--card, #eee)",
      color: "var(--muted-foreground, #999)",
      fontSize: 10,
      borderRadius: 4,
    }}
  >
    No Cover
  </div>
);

interface CoverPlaceholderProps {
  size?: number;
}
