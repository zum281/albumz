import type { BacklogLeader } from "@/types/artist";
import { BacklogLeadersSchema } from "@/types/artist";
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
      WHERE listened = 0
      GROUP BY artist
      ORDER BY count DESC
      LIMIT 5;
    `;
  const rows = await db.select(query);

  return BacklogLeadersSchema.parse(rows);
};
