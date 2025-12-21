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
  budget_id: string;
  client_id: string;
  technician_id: string;
  status: 'approved' | 'issued' | 'scheduled' | 'in_progress' | 'waiting_material' | 'finished' | 'billed' | 'paid';
  start_date?: string;
  end_date?: string;
  notes?: string;
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