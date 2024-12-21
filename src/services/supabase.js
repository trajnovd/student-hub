import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://laoypdipmjgnpxmtqjeu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhb3lwZGlwbWpnbnB4bXRxamV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5Mzc2MjAsImV4cCI6MjA0OTUxMzYyMH0.UY0igKkKwGBoBpCtY01vy1X_pSdPSfak-BoKwryI-9I";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
