import type { BacklogLeader, HeavyRotation } from "@/types/artist";
import { BacklogLeadersSchema, HeavyRotationSchema } from "@/types/artist";
import { queryOptions } from "@tanstack/react-query";
import { getDb } from "./db";
import { sql } from "./sql";

export const getBacklogLeadersQueryOptions = () => {
  return queryOptions({
    queryKey: ["artists", "backlog-leaders"],
    queryFn: getBacklogLeaders,
  });
};
export const getBacklogLeaders = async (): Promise<BacklogLeader[]> => {
  const db = await getDb();
  const query = sql`
      SELECT artist, COUNT(listened) as count
      FROM albums
      WHERE listened = 0 AND ignored = 0
      GROUP BY artist
      ORDER BY count DESC
      LIMIT 5;
    `;
  const rows = await db.select(query);

  return BacklogLeadersSchema.parse(rows);
};

export const getHeavyRotationQueryOptions = () => {
  return queryOptions({
    queryKey: ["artists", "heavy-rotation"],
    queryFn: getHeavyRotation,
  });
};

export const getHeavyRotation = async (): Promise<HeavyRotation> => {
  const db = await getDb();
  const query = sql`
      SELECT artist, SUM(duration_seconds) as duration
      FROM albums
      WHERE listened = 1 AND ignored = 0
      GROUP BY artist
      ORDER BY duration DESC
      LIMIT 5;
    `;
  const rows = await db.select(query);

  return HeavyRotationSchema.parse(rows);
};
