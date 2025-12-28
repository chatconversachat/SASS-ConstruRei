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
  visit_number: string;
  lead_id: string;
  appointment_id?: string; // Vínculo com a agenda
  scheduled_date: string;
  technician_id: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  findings: string[];
  recommendations: string[];
  photos: string[];
  videos: string[];
  created_at: string;
  updated_at: string;
  // UI helper fields
  client?: string;
  propertyAddress?: string;
  technician?: string;
  scheduledDate?: string;
}

export interface Budget {
  id: string;
  budget_number: string;
  lead_id: string;
  visit_id?: string;
  items: BudgetItem[];
  total_value: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  sent_at?: string;
  approved_at?: string;
  // UI helper fields
  client?: string;
  propertyAddress?: string;
  notes?: string;
  leadSource?: string;
  validity?: string;
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
  service_order_number: string;
  budget_id: string;
  client_id: string;
  technician_id: string;
  status: 'approved' | 'issued' | 'scheduled' | 'in_progress' | 'waiting_material' | 'finished' | 'billed' | 'paid';
  start_date?: string;
  end_date?: string;
  notes?: string;
  completion_date?: string;
  completion_notes?: string;
  completion_photos?: string[];
  completion_videos?: string[];
  created_at: string;
  updated_at: string;
  // UI helper fields
  client?: string;
  propertyAddress?: string;
  technician?: string;
  startDate?: string;
  endDate?: string;
  budgetId?: string;
  services?: ServiceOrderItem[];
  materials?: ServiceOrderMaterial[];
}

export interface ServiceOrderItem {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: string | null;
  endDate: string | null;
}

export interface ServiceOrderMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: 'pending' | 'ordered' | 'delivered';
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
  related_number?: string; // O DNA do processo (ex: 0001-23)
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
  date: string;
  startTime: string;
  endTime: string;
  clientName: string;
  technicianName?: string;
  type: 'visit' | 'meeting' | 'budget' | 'execution' | 'other';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  propertyAddress?: string;
  visit_id?: string; // Vínculo com a visita técnica
}