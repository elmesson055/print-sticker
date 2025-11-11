import Barcode from "react-barcode";
import { LabelData } from "./LabelForm";

interface Label50x50Props {
  data: LabelData;
}

export const Label50x50 = ({ data }: Label50x50Props) => {
  return (
    <div 
      className="label-50x50 bg-[hsl(var(--label-bg))] border-2 border-[hsl(var(--label-border))] flex flex-col p-2"
      style={{
        width: "50mm",
        height: "50mm",
      }}
    >
      <div className="text-[8px] font-bold text-[hsl(var(--label-text))] text-center uppercase mb-1 leading-tight">
        {data.productName}
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <Barcode
          value={data.barcode}
          format={data.barcodeType}
          width={data.barcodeType === "EAN8" ? 1.3 : 1}
          height={40}
          fontSize={8}
          background="transparent"
          lineColor="#000000"
        />
      </div>
      
      <div className="text-[9px] text-[hsl(var(--label-text))] flex items-center justify-between gap-2 mt-1">
        <span>
          <span className="font-bold">QTDE:</span> {data.quantity}
        </span>
        <span>
          <span className="font-bold">VAL:</span> {data.expiry}
        </span>
        <span className="font-bold text-[11px]">
          R$ {data.price}
        </span>
      </div>
    </div>
  );
};
