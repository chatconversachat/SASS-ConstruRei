export const generateSequentialNumber = (prefix: string, currentCount: number, yearSuffix: boolean = true): string => {
  const paddedCount = String(currentCount).padStart(4, '0');
  const year = yearSuffix ? new Date().getFullYear().toString().slice(-2) : '';
  return `${paddedCount}-${year}`;
};

// Para simular uma configuração global, podemos ter um objeto aqui.
// Em um sistema real, isso viria de um banco de dados ou variáveis de ambiente.
export const appNumberConfig = {
  visitSequence: 1,
  budgetSequence: 1,
  serviceOrderSequence: 1,
  prefix: '0000', // Default prefix for sequential numbers
};

// Função para atualizar a sequência (simulada)
export const updateSequence = (type: 'visit' | 'budget' | 'serviceOrder') => {
  if (type === 'visit') appNumberConfig.visitSequence++;
  if (type === 'budget') appNumberConfig.budgetSequence++;
  if (type === 'serviceOrder') appNumberConfig.serviceOrderSequence++;
};