import type { DecadeBreakdown } from "@/types/decades";
import { DecadeBreakdownSchema } from "@/types/decades";
import { queryOptions } from "@tanstack/react-query";
import { getDb } from "./db";
import { sql } from "./sql";

export const getDecadesBreakdownQueryOptions = () => {
  return queryOptions({
    queryKey: ["albums", "decades"],
    queryFn: getDecadesBreakdown,
  });
};

export const getDecadesBreakdown = async (): Promise<DecadeBreakdown> => {
  const db = await getDb();
  const query = sql`
    SELECT year / 10 * 10 AS decade,
           SUM(listened = 1) AS listened,
           SUM(listened = 0) AS backlog
    FROM albums
    GROUP BY decade
    ORDER BY decade;`;

  const rows = await db.select(query);

  return DecadeBreakdownSchema.parse(rows);
};
