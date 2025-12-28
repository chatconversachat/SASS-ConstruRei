export const generateSequentialNumber = (prefix: string, currentCount: number, yearSuffix: boolean = true): string => {
  const paddedCount = String(currentCount).padStart(4, '0');
  const year = yearSuffix ? new Date().getFullYear().toString().slice(-2) : '';
  return `${paddedCount}-${year}`;
};

// Configuração global simulada
export const appNumberConfig = {
  visitSequence: 4, // Iniciando em 4 pois temos 3 mocks
  budgetSequence: 1,
  serviceOrderSequence: 1,
  prefix: '0000', 
};

// Função para atualizar a sequência
export const updateSequence = (type: 'visit' | 'budget' | 'serviceOrder') => {
  if (type === 'visit') appNumberConfig.visitSequence++;
  if (type === 'budget') appNumberConfig.budgetSequence++;
  if (type === 'serviceOrder') appNumberConfig.serviceOrderSequence++;
};

/**
 * Especialista: Verifica se um número já existe em uma lista de registros
 * para evitar duplicidade no fluxo.
 */
export const checkNumberExists = (number: string, records: any[], key: string): boolean => {
  return records.some(record => record[key] === number);
};