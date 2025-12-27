-- Criação das tabelas principais

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'technician', 'client')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  type VARCHAR(20) NOT NULL CHECK (type IN ('individual', 'real_estate')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  property_address TEXT NOT NULL,
  lead_source VARCHAR(50) NOT NULL,
  estimated_value DECIMAL(15, 2),
  responsible_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'received' CHECK (status IN ('received', 'contacted', 'scheduled', 'visited', 'budgeting', 'sent', 'negotiating', 'approved', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Visitas Técnicas
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_number VARCHAR(50) UNIQUE NOT NULL, -- Ex: VIS-0001-23
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  technician_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  photos TEXT[], -- Array de URLs ou caminhos
  videos TEXT[], -- Array de URLs ou caminhos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Orçamentos
CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_number VARCHAR(50) UNIQUE NOT NULL, -- Ex: ORC-0001-23
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  visit_id UUID REFERENCES visits(id) ON DELETE SET NULL, -- Visita que originou o orçamento
  total_value DECIMAL(15, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
  sent_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Itens de Orçamento
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID REFERENCES budgets(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_value DECIMAL(15, 2) NOT NULL,
  total_value DECIMAL(15, 2) NOT NULL,
  service_type VARCHAR(100) -- Ex: Demolição, Reforma, Pintura
);

-- Tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_number VARCHAR(50) UNIQUE NOT NULL, -- Ex: OS-0001-23
  budget_id UUID REFERENCES budgets(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  technician_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'issued', 'scheduled', 'in_progress', 'waiting_material', 'finished', 'billed', 'paid')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  completion_date TIMESTAMP WITH TIME ZONE, -- Data de conclusão real
  completion_notes TEXT, -- Notas sobre a conclusão
  completion_photos TEXT[], -- Fotos da conclusão
  completion_videos TEXT[], -- Vídeos da conclusão
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Diário de Obra
CREATE TABLE IF NOT EXISTS work_diary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID REFERENCES service_orders(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  photos TEXT[], -- Array de URLs ou caminhos
  videos TEXT[], -- Array de URLs ou caminhos
  signature TEXT, -- URL ou dados da assinatura
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Categorias Financeiras
CREATE TABLE IF NOT EXISTS financial_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')), -- Receita ou Despesa
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Lançamentos Financeiros
CREATE TABLE IF NOT EXISTS financial_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID REFERENCES service_orders(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  value DECIMAL(15, 2) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  payment_date DATE,
  category_id UUID REFERENCES financial_categories(id) ON DELETE SET NULL,
  related_number VARCHAR(50), -- Para vincular ao número da OS/Orçamento/Visita
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Prestadores de Serviço
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  services TEXT[], -- Array de serviços oferecidos
  rating DECIMAL(3, 2), -- Média de avaliações
  documents TEXT[], -- Array de URLs ou caminhos para documentos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Lances de Leilão
CREATE TABLE IF NOT EXISTS auction_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_order_id UUID REFERENCES service_orders(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  value DECIMAL(15, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Configuração de Distribuição de Lucro
CREATE TABLE IF NOT EXISTS distribution_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fabricio DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  eder DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  rogerio DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  gabrielly DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  capital_giro DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  client_name VARCHAR(255),
  technician_name VARCHAR(255),
  type VARCHAR(20) NOT NULL CHECK (type IN ('visit', 'meeting', 'budget', 'other')),
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes TEXT,
  property_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funções e Triggers para updated_at (usando CREATE OR REPLACE)

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
      NEW.updated_at = NOW();
      RETURN NEW;
   ELSE
      RETURN OLD;
   END IF;
END;
$$ language 'plpgsql';

-- Triggers para cada tabela (usando CREATE OR REPLACE)
CREATE OR REPLACE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_visits_updated_at
BEFORE UPDATE ON visits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_budgets_updated_at
BEFORE UPDATE ON budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_budget_items_updated_at
BEFORE UPDATE ON budget_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_service_orders_updated_at
BEFORE UPDATE ON service_orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_work_diary_updated_at
BEFORE UPDATE ON work_diary
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_financial_categories_updated_at
BEFORE UPDATE ON financial_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_financial_entries_updated_at
BEFORE UPDATE ON financial_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_providers_updated_at
BEFORE UPDATE ON providers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_auction_bids_updated_at
BEFORE UPDATE ON auction_bids
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_distribution_config_updated_at
BEFORE UPDATE ON distribution_config
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER set_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();