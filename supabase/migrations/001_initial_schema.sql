-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  price NUMERIC NOT NULL DEFAULT 0,
  summary TEXT,
  image_url TEXT,
  transcript_raw TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Heritage archives table
CREATE TABLE IF NOT EXISTS heritage_archives (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  story TEXT,
  significance TEXT,
  region TEXT,
  language TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast product lookups
CREATE INDEX IF NOT EXISTS idx_heritage_product_id ON heritage_archives(product_id);
