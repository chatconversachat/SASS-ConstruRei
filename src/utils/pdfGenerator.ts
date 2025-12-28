import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface GeneratePdfOptions {
  elementId: string;
  filename: string;
  orientation?: 'portrait' | 'landscape';
}

export const generatePdf = async ({ elementId, filename, orientation = 'portrait' }: GeneratePdfOptions) => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  const canvas = await html2canvas(input, {
    scale: 2, // Aumenta a escala para melhor qualidade
    useCORS: true, // Permite carregar imagens de outras origens
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF(orientation, 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Adiciona a imagem ao PDF, ajustando para caber na página
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};