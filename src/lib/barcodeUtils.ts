export type BarcodeType = "EAN13" | "EAN8";

// Gera dígito verificador para EAN-13
function generateEAN13CheckDigit(code: string): string {
  const digits = code.split('').map(Number);
  let sum = 0;
  
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

// Gera dígito verificador para EAN-8
function generateEAN8CheckDigit(code: string): string {
  const digits = code.split('').map(Number);
  let sum = 0;
  
  for (let i = 0; i < 7; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 1);
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

// Gera código EAN-13 aleatório
export function generateEAN13(): string {
  const randomDigits = Array.from({ length: 12 }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
  
  const checkDigit = generateEAN13CheckDigit(randomDigits);
  return randomDigits + checkDigit;
}

// Gera código EAN-8 aleatório
export function generateEAN8(): string {
  const randomDigits = Array.from({ length: 7 }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
  
  const checkDigit = generateEAN8CheckDigit(randomDigits);
  return randomDigits + checkDigit;
}

// Valida código EAN-13
export function validateEAN13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false;
  
  const checkDigit = code.slice(-1);
  const calculatedCheckDigit = generateEAN13CheckDigit(code.slice(0, 12));
  
  return checkDigit === calculatedCheckDigit;
}

// Valida código EAN-8
export function validateEAN8(code: string): boolean {
  if (!/^\d{8}$/.test(code)) return false;
  
  const checkDigit = code.slice(-1);
  const calculatedCheckDigit = generateEAN8CheckDigit(code.slice(0, 7));
  
  return checkDigit === calculatedCheckDigit;
}

export function generateBarcode(type: BarcodeType): string {
  return type === "EAN13" ? generateEAN13() : generateEAN8();
}

export function validateBarcode(code: string, type: BarcodeType): boolean {
  return type === "EAN13" ? validateEAN13(code) : validateEAN8(code);
}
