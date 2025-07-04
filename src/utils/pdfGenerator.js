import jsPDF from 'jspdf';

export const generateTicketPDF = (registrationData) => {
  const { fullName, email, passType, passPrice, registeredAt, profession, country, state, contactNumber } = registrationData;
  
  // Create new PDF document in landscape for ticket format
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Clean modern color scheme
  const colors = {
    primary: [37, 99, 235],      // Blue
    secondary: [99, 102, 241],    // Indigo
    accent: [59, 130, 246],       // Light Blue
    dark: [30, 41, 59],           // Dark Blue
    light: [248, 250, 252],       // Light Gray
    white: [255, 255, 255],
    text: [51, 65, 85],           // Slate
    lightText: [100, 116, 139],   // Light Slate
    border: [226, 232, 240]       // Border Gray
  };

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Clean white background
  pdf.setFillColor(...colors.white);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Main ticket container (centered with proper margins)
  const ticketWidth = pageWidth - 30;
  const ticketHeight = 120;
  const ticketX = 15;
  const ticketY = (pageHeight - ticketHeight) / 2;

  // Ticket background with subtle shadow
  pdf.setFillColor(245, 245, 245);
  pdf.rect(ticketX + 2, ticketY + 2, ticketWidth, ticketHeight, 'F');
  
  pdf.setFillColor(...colors.white);
  pdf.rect(ticketX, ticketY, ticketWidth, ticketHeight, 'F');
  
  // Ticket border
  pdf.setDrawColor(...colors.border);
  pdf.setLineWidth(1);
  pdf.rect(ticketX, ticketY, ticketWidth, ticketHeight);

  // Left section with geometric design
  const leftSectionWidth = 70;
  pdf.setFillColor(...colors.light);
  pdf.rect(ticketX, ticketY, leftSectionWidth, ticketHeight, 'F');

  // Geometric shapes (circles and rectangles)
  // Large circle
  pdf.setFillColor(...colors.primary);
  pdf.circle(ticketX + 30, ticketY + 35, 15, 'F');
  
  // Medium circle
  pdf.setFillColor(...colors.secondary);
  pdf.circle(ticketX + 55, ticketY + 60, 12, 'F');
  
  // Small circles
  pdf.setFillColor(...colors.accent);
  pdf.circle(ticketX + 20, ticketY + 75, 8, 'F');
  pdf.circle(ticketX + 65, ticketY + 25, 6, 'F');
  
  // Rectangles
  pdf.setFillColor(...colors.primary);
  pdf.rect(ticketX + 10, ticketY + 15, 15, 15, 'F');
  
  pdf.setFillColor(...colors.secondary);
  pdf.rect(ticketX + 40, ticketY + 85, 12, 12, 'F');

  // E-TICKET label
  pdf.setFillColor(...colors.dark);
  pdf.rect(ticketX + 10, ticketY + 10, 30, 15, 'F');
  
  pdf.setTextColor(...colors.white);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text('E-TICKET', ticketX + 13, ticketY + 20);

  // Perforated line
  pdf.setDrawColor(...colors.border);
  pdf.setLineWidth(1);
  for (let i = 0; i < ticketHeight; i += 5) {
    pdf.line(ticketX + leftSectionWidth, ticketY + i, ticketX + leftSectionWidth, ticketY + i + 2);
  }

  // Main content area
  const contentX = ticketX + leftSectionWidth + 15;
  const contentY = ticketY + 20;

  // Event title
  pdf.setTextColor(...colors.dark);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.text('BLITS 2025', contentX, contentY);

  // Event subtitle
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...colors.text);
  pdf.text('Business Leadership Innovation Technology Summit', contentX, contentY + 12);

  // Pass type badge
  const getPassColors = (type) => {
    switch(type) {
      case 'student': return { bg: colors.primary, text: colors.white };
      case 'professional': return { bg: colors.secondary, text: colors.white };
      case 'corporate': return { bg: [34, 197, 94], text: colors.white };
      default: return { bg: colors.primary, text: colors.white };
    }
  };

  const passColors = getPassColors(passType);
  pdf.setFillColor(...passColors.bg);
  pdf.rect(contentX, contentY + 20, 60, 12, 'F');
  
  pdf.setTextColor(...passColors.text);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text(`${passType.toUpperCase()} PASS`, contentX + 3, contentY + 28);

  // Event details
  pdf.setTextColor(...colors.text);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.text('5-7 SEP 2025', contentX, contentY + 45);
  pdf.text('Jaipur, Rajasthan', contentX, contentY + 55);

  // Participant details (adjusted positioning to prevent overflow)
  const participantX = contentX + 90;
  const maxTextWidth = 80; // Maximum width for text to prevent overflow
  
  pdf.setTextColor(...colors.lightText);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text('Ticket ID:', participantX, contentY + 5);
  pdf.text('Name:', participantX, contentY + 15);
  pdf.text('Email:', participantX, contentY + 25);
  pdf.text('Type:', participantX, contentY + 35);
  pdf.text('Date:', participantX, contentY + 45);

  // Participant values - Generate proper ticket ID
  const registrationId = registrationData.registrationId || 'BLITS' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  const registrationDate = new Date(registeredAt).toLocaleDateString('en-IN', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Truncate text if too long to prevent overflow
  const truncateText = (text, maxWidth) => {
    if (text.length <= maxWidth) return text;
    return text.substring(0, maxWidth - 3) + '...';
  };

  pdf.setTextColor(...colors.text);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.text(registrationId, participantX + 30, contentY + 5);
  pdf.text(truncateText(fullName, 20), participantX + 30, contentY + 15);
  pdf.text(truncateText(email, 25), participantX + 30, contentY + 25);
  pdf.text(profession.charAt(0).toUpperCase() + profession.slice(1), participantX + 30, contentY + 35);
  pdf.text(registrationDate, participantX + 30, contentY + 45);

  // Barcode at bottom
  const barcodeY = ticketY + ticketHeight - 25;
  pdf.setFillColor(...colors.dark);
  
  // Create barcode pattern
  for (let i = 0; i < 60; i++) {
    const barWidth = Math.random() > 0.5 ? 2 : 1;
    const barHeight = Math.random() > 0.3 ? 12 : 8;
    pdf.rect(contentX + (i * 3), barcodeY, barWidth, barHeight, 'F');
  }

  // Barcode number
  pdf.setTextColor(...colors.text);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text(registrationId, contentX, barcodeY + 18);

  // Website
  pdf.setTextColor(...colors.lightText);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.text('www.blits2025.com', pageWidth - 50, barcodeY + 18);

  return pdf;
};

export const downloadTicket = (registrationData) => {
  try {
    const pdf = generateTicketPDF(registrationData);
    const fileName = `BLITS-2025-Ticket-${registrationData.fullName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}; 