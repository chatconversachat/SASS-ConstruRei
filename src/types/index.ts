export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'technician' | 'client';
  phone?: string;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  type: 'individual' | 'real_estate';
  createdAt: Date;
}

export interface Lead {
  id: string;
  clientId: string;
  propertyAddress: string;
  leadSource: string;
  estimatedValue: number;
  responsibleId: string;
  status: 'received' | 'contacted' | 'scheduled' | 'visited' | 'budgeting' | 'sent' | 'negotiating' | 'approved' | 'lost';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface Visit {
  id: string;
  leadId: string;
  scheduledDate: Date;
  technicianId: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  photos: string[];
  videos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  leadId: string;
  visitId?: string;
  items: BudgetItem[];
  totalValue: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  approvedAt?: Date;
}

export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitValue: number;
  totalValue: number;
  serviceType: string;
}

export interface ServiceOrder {
  id: string;
  budgetId: string;
  clientId: string;
  technicianId: string;
  status: 'issued' | 'scheduled' | 'in_progress' | 'waiting_material' | 'finished' | 'billed' | 'paid';
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkDiary {
  id: string;
  serviceOrderId: string;
  date: Date;
  description: string;
  photos: string[];
  videos: string[];
  signature?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialEntry {
  id: string;
  serviceOrderId?: string;
  description: string;
  value: number;
  type: 'income' | 'expense';
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paymentDate?: Date;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  createdAt: Date;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  rating: number;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuctionBid {
  id: string;
  serviceOrderId: string;
  providerId: string;
  value: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}