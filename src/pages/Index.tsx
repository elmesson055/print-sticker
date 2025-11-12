import { useState, useRef } from "react";
import { LabelForm, LabelData } from "@/components/LabelForm";
import { Label58x30 } from "@/components/Label58x30";
import { Label50x50 } from "@/components/Label50x50";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

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

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      toast.loading("Gerando PDF...");
      
      // Converter o HTML para canvas
      const canvas = await html2canvas(printRef.current, {
        scale: 3, // Alta qualidade
        backgroundColor: "#ffffff",
      });

      // Dimensões em mm
      const width = selectedSize === "58x30" ? 58 : 50;
      const height = selectedSize === "58x30" ? 30 : 50;

      // Criar PDF com as dimensões corretas
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "mm",
        format: [width, height],
      });

      // Adicionar a imagem ao PDF
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      // Baixar o PDF
      pdf.save(`etiqueta-${labelData.productName.substring(0, 20)}-${Date.now()}.pdf`);
      
      toast.dismiss();
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error("Erro ao gerar PDF");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sistema de Etiquetas
          </h1>
          <p className="text-muted-foreground">
            Gere e baixe etiquetas profissionais em PDF para seus produtos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <LabelForm
              onDataChange={setLabelData}
              onPrint={handleDownloadPDF}
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
