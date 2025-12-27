export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'technician' | 'client';
  phone?: string;
  avatar?: string;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: 'individual' | 'real_estate';
  created_at: string;
}

export interface Lead {
  id: string;
  client_id: string;
  property_address: string;
  lead_source: string;
  estimated_value: number;
  responsible_id: string;
  status: 'received' | 'contacted' | 'scheduled' | 'visited' | 'budgeting' | 'sent' | 'negotiating' | 'approved' | 'lost';
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface Visit {
  id: string;
  visit_number: string; // Novo campo
  lead_id: string;
  scheduled_date: string;
  technician_id: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  photos: string[];
  videos: string[];
  created_at: string;
  updated_at: string;
}

export interface Budget {
  id: string;
  budget_number: string; // Novo campo
  lead_id: string;
  visit_id?: string;
  items: BudgetItem[];
  total_value: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  sent_at?: string;
  approved_at?: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unit_value: number;
  total_value: number;
  service_type: string;
}

export interface ServiceOrder {
  id: string;
  service_order_number: string; // Novo campo
  budget_id: string;
  client_id: string;
  technician_id: string;
  status: 'approved' | 'issued' | 'scheduled' | 'in_progress' | 'waiting_material' | 'finished' | 'billed' | 'paid';
  start_date?: string;
  end_date?: string;
  notes?: string;
  completion_date?: string; // Novo campo
  completion_notes?: string; // Novo campo
  completion_photos?: string[]; // Novo campo
  completion_videos?: string[]; // Novo campo
  created_at: string;
  updated_at: string;
}

export interface WorkDiary {
  id: string;
  service_order_id: string;
  date: string;
  description: string;
  photos: string[];
  videos: string[];
  signature?: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialEntry {
  id: string;
  service_order_id?: string;
  description: string;
  value: number;
  type: 'income' | 'expense';
  status: 'pending' | 'paid' | 'overdue';
  due_date: string;
  payment_date?: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  related_number?: string; // Novo campo para vincular ao número da OS/Orçamento/Visita
}

export interface FinancialCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  created_at: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  rating: number;
  documents: string[];
  created_at: string;
  updated_at: string;
}

export interface AuctionBid {
  id: string;
  service_order_id: string;
  provider_id: string;
  value: number;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface DistributionConfig {
  fabricio: number;
  eder: number;
  rogerio: number;
  gabrielly: number;
  capital_giro: number;
}

export interface Appointment {
  id: string;
  title: string;
  date: string; // ISO string or Date object
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "10:00"
  clientName: string;
  technicianName?: string;
  type: 'visit' | 'meeting' | 'budget' | 'other';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  propertyAddress?: string;
}

// Novas interfaces para Automações e Agentes de IA
export interface AutomationRule {
  id: string;
  name: string;
  trigger: string; // Ex: 'lead_created', 'visit_scheduled'
  condition?: string; // Ex: 'estimated_value > 10000', 'status == "approved"'
  action: string; // Ex: 'send_email', 'create_service_order'
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  prompt: string; // O prompt principal do agente
  n8n_workflow_id?: string; // ID do fluxo no n8n para integração
  n8n_webhook_url?: string; // URL do webhook do n8n para acionar o agente
  type: 'sdr' | 'scheduling' | 'support' | 'service_manager' | 'customer_service' | 'other';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}