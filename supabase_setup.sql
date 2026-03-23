-- Créer la table des simulations avec politiques de sécurité correctes
CREATE TABLE simulations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

-- Activer les permissions RLS (Row Level Security)
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre les insertions (tout le monde peut insérer)
CREATE POLICY "Allow insert" ON simulations
FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (tout le monde peut lire)
CREATE POLICY "Allow select" ON simulations
FOR SELECT USING (true);

-- Créer un bucket pour les images si nécessaire
INSERT INTO storage.buckets (id, name, public) VALUES 
('simulations', 'simulations', true);
