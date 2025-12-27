-- Habilitar a extensão uuid-ossp para gerar UUIDs (opcional, se preferir UUIDs para IDs)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Função para atualizar automaticamente a coluna 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'technician', 'client')),
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers para 'updated_at'
CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT NOT NULL,
    address TEXT,
    type TEXT NOT NULL CHECK (type IN ('individual', 'real_estate')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers para 'updated_at' (adicionando para consistência, mesmo que não esteja na interface original)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
CREATE TRIGGER set_clients_updated_at
BEFORE UPDATE ON clients
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    property_address TEXT NOT NULL,
    lead_source TEXT NOT NULL,
    estimated_value NUMERIC(10, 2) NOT NULL,
    responsible_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status TEXT NOT NULL CHECK (status IN ('received', 'contacted', 'scheduled', 'visited', 'budgeting', 'sent', 'negotiating', 'approved', 'lost')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Visitas
CREATE TABLE IF NOT EXISTS visits (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    visit_number TEXT NOT NULL UNIQUE,
    lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    technician_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    notes TEXT,
    photos TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_visits_updated_at
BEFORE UPDATE ON visits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Orçamentos
CREATE TABLE IF NOT EXISTS budgets (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    budget_number TEXT NOT NULL UNIQUE,
    lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    visit_id TEXT REFERENCES visits(id) ON DELETE SET NULL,
    total_value NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'approved', 'rejected')),
    sent_at TIMESTAMP WITH TIME ZONE,
    approved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT, -- Adicionado para consistência com o front-end
    validity TEXT, -- Adicionado para consistência com o front-end
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_budgets_updated_at
BEFORE UPDATE ON budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Itens de Orçamento (separada para melhor normalização)
CREATE TABLE IF NOT EXISTS budget_items (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_value NUMERIC(10, 2) NOT NULL,
    total_value NUMERIC(10, 2) NOT NULL,
    service_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_budget_items_updated_at
BEFORE UPDATE ON budget_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Ordens de Serviço
CREATE TABLE IF NOT EXISTS service_orders (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    service_order_number TEXT NOT NULL UNIQUE,
    budget_id TEXT NOT NULL REFERENCES budgets(id) ON DELETE RESTRICT,
    client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    technician_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status TEXT NOT NULL CHECK (status IN ('approved', 'issued', 'scheduled', 'in_progress', 'waiting_material', 'finished', 'billed', 'paid')),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    completion_date TIMESTAMP WITH TIME ZONE,
    completion_notes TEXT,
    completion_photos TEXT[] DEFAULT '{}',
    completion_videos TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_service_orders_updated_at
BEFORE UPDATE ON service_orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Diário de Obra
CREATE TABLE IF NOT EXISTS work_diaries (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    service_order_id TEXT NOT NULL REFERENCES service_orders(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    photos TEXT[] DEFAULT '{}',
    videos TEXT[] DEFAULT '{}',
    signature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_work_diaries_updated_at
BEFORE UPDATE ON work_diaries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Categorias Financeiras
CREATE TABLE IF NOT EXISTS financial_categories (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Triggers para 'updated_at'
ALTER TABLE financial_categories ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
CREATE TRIGGER set_financial_categories_updated_at
BEFORE UPDATE ON financial_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Lançamentos Financeiros
CREATE TABLE IF NOT EXISTS financial_entries (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    service_order_id TEXT REFERENCES service_orders(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    value NUMERIC(10, 2) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
    due_date DATE NOT NULL,
    payment_date DATE,
    category_id TEXT NOT NULL REFERENCES financial_categories(id) ON DELETE RESTRICT,
    related_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_financial_entries_updated_at
BEFORE UPDATE ON financial_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Prestadores
CREATE TABLE IF NOT EXISTS providers (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    services TEXT[] DEFAULT '{}',
    rating NUMERIC(2, 1),
    documents TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_providers_updated_at
BEFORE UPDATE ON providers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Lances de Leilão
CREATE TABLE IF NOT EXISTS auction_bids (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    service_order_id TEXT NOT NULL REFERENCES service_orders(id) ON DELETE CASCADE,
    provider_id TEXT NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    value NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_auction_bids_updated_at
BEFORE UPDATE ON auction_bids
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Tabela de Configuração de Distribuição (singleton)
CREATE TABLE IF NOT EXISTS distribution_configs (
    id TEXT PRIMARY KEY DEFAULT 'singleton', -- Garante que haverá apenas uma linha
    fabricio NUMERIC(5, 2) NOT NULL,
    eder NUMERIC(5, 2) NOT NULL,
    rogerio NUMERIC(5, 2) NOT NULL,
    gabrielly NUMERIC(5, 2) NOT NULL,
    capital_giro NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), -- Adicionado para consistência
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_distribution_configs_updated_at
BEFORE UPDATE ON distribution_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Inserir uma linha padrão na tabela de configuração de distribuição se ela não existir
INSERT INTO distribution_configs (id, fabricio, eder, rogerio, gabrielly, capital_giro)
VALUES ('singleton', 0.25, 0.25, 0.20, 0.15, 0.15)
ON CONFLICT (id) DO NOTHING;


-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY, -- Ou UUID DEFAULT uuid_generate_v4()
    title TEXT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    client_name TEXT NOT NULL,
    technician_name TEXT,
    type TEXT NOT NULL CHECK (type IN ('visit', 'meeting', 'budget', 'other')),
    status TEXT NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    notes TEXT,
    property_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER set_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();