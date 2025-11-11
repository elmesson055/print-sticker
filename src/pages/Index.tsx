import { useState, useRef } from "react";
import { LabelForm, LabelData } from "@/components/LabelForm";
import { Label58x30 } from "@/components/Label58x30";
import { Label50x50 } from "@/components/Label50x50";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [labelData, setLabelData] = useState<LabelData>({
    productName: "LEITE UHT INTEGRAL CAIXA 1L",
    quantity: "1",
    expiry: "04/11/2026",
    price: "1,79",
    barcode: "7891234567890",
    barcodeType: "EAN13",
  });

  const [selectedSize, setSelectedSize] = useState<"58x30" | "50x50">("58x30");
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `
      @page {
        size: ${selectedSize === "58x30" ? "58mm 30mm" : "50mm 50mm"};
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sistema de Etiquetas
          </h1>
          <p className="text-muted-foreground">
            Gere e imprima etiquetas profissionais para seus produtos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <LabelForm
              onDataChange={setLabelData}
              onPrint={handlePrint}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[400px]">
                <div ref={printRef} className="print-container">
                  {selectedSize === "58x30" ? (
                    <Label58x30 data={labelData} />
                  ) : (
                    <Label50x50 data={labelData} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container,
          .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
