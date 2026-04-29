"use server";

import { supabase } from "@/lib/supabase";

export async function saveLead(data: {
  name: string;
  email: string;
  phone: string;
  lang: string;
  score: number;
  result: string;
  answers: string[];
}) {
  const { error } = await supabase.from("leads").insert(data);
  if (error) console.error("[saveLead]", error.message);
}
