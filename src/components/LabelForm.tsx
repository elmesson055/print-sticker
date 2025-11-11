import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, RefreshCw } from "lucide-react";
import { generateBarcode, BarcodeType } from "@/lib/barcodeUtils";

export interface LabelData {
  productName: string;
  quantity: string;
  expiry: string;
  price: string;
  barcode: string;
  barcodeType: BarcodeType;
}

interface LabelFormProps {
  onDataChange: (data: LabelData) => void;
  onPrint: () => void;
  selectedSize: "58x30" | "50x50";
  onSizeChange: (size: "58x30" | "50x50") => void;
}

export const LabelForm = ({ onDataChange, onPrint, selectedSize, onSizeChange }: LabelFormProps) => {
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [formData, setFormData] = useState<LabelData>({
    productName: "LEITE UHT INTEGRAL CAIXA 1L",
    quantity: "1",
    expiry: "04/11/2026",
    price: "1,79",
    barcode: "7891234567890",
    barcodeType: "EAN13",
  });

  const handleChange = (field: keyof LabelData, value: string | BarcodeType) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleBarcodeTypeChange = (type: BarcodeType) => {
    const newBarcode = autoGenerate ? generateBarcode(type) : formData.barcode;
    const newData = { ...formData, barcodeType: type, barcode: newBarcode };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleAutoGenerateToggle = (checked: boolean) => {
    setAutoGenerate(checked);
    if (checked) {
      const newBarcode = generateBarcode(formData.barcodeType);
      const newData = { ...formData, barcode: newBarcode };
      setFormData(newData);
      onDataChange(newData);
    }
  };

  const handleRegenerateBarcode = () => {
    const newBarcode = generateBarcode(formData.barcodeType);
    const newData = { ...formData, barcode: newBarcode };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Gerador de Etiquetas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base mb-3 block">Tamanho da Etiqueta</Label>
          <Tabs value={selectedSize} onValueChange={(value) => onSizeChange(value as "58x30" | "50x50")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="58x30">58mm × 30mm</TabsTrigger>
              <TabsTrigger value="50x50">50mm × 50mm</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
              placeholder="Ex: LEITE UHT INTEGRAL CAIXA 1L"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Tipo de Código de Barras</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="auto-generate" className="text-sm font-normal">
                  Código Automático
                </Label>
                <Switch
                  id="auto-generate"
                  checked={autoGenerate}
                  onCheckedChange={handleAutoGenerateToggle}
                />
              </div>
            </div>
            
            <Select
              value={formData.barcodeType}
              onValueChange={(value) => handleBarcodeTypeChange(value as BarcodeType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EAN13">EAN-13 (13 dígitos)</SelectItem>
                <SelectItem value="EAN8">EAN-8 (8 dígitos)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                id="barcode"
                value={formData.barcode}
                onChange={(e) => handleChange("barcode", e.target.value)}
                placeholder={formData.barcodeType === "EAN13" ? "Ex: 7891234567890" : "Ex: 12345670"}
                disabled={autoGenerate}
                className={autoGenerate ? "opacity-60" : ""}
              />
              {autoGenerate && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleRegenerateBarcode}
                  title="Gerar novo código"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="Ex: 1"
              />
            </div>

            <div>
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                value={formData.expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
                placeholder="Ex: 04/11/2026"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="price">Valor (R$)</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Ex: 1,79"
            />
          </div>
        </div>

        <Button onClick={onPrint} className="w-full" size="lg">
          <Printer className="mr-2 h-5 w-5" />
          Imprimir Etiqueta
        </Button>
      </CardContent>
    </Card>
  );
};
