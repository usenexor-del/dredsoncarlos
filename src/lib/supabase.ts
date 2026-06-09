import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnon);

export type Booking = {
  id?: string;
  created_at?: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  price: number;
  payment_method: string;
  status: "pending" | "confirmed" | "cancelled" | "done";
  notes?: string;
};
