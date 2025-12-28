import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onCancel: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onCancel }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsDrawing(false);
    }
  };

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL();
      onSave(dataUrl);
    }
  };

  const handleBegin = () => {
    setIsDrawing(true);
  };

  const handleEnd = () => {
    // Mantém isDrawing como true após terminar o desenho
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="mb-4">
        <h3 className="font-medium text-lg">Assinatura Digital</h3>
        <p className="text-sm text-gray-600">Assine no espaço abaixo</p>
      </div>
      
      <div className="border-2 border-dashed rounded-lg mb-4">
        <SignatureCanvas
          ref={sigCanvas}
          onBegin={handleBegin}
          onEnd={handleEnd}
          canvasProps={{
            className: "w-full h-48 rounded-lg",
            style: { 
              touchAction: 'none',
              backgroundColor: 'white'
            }
          }}
          penColor="black"
          minWidth={2}
          maxWidth={4}
        />
      </div>
      
      <div className="flex justify-between">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearSignature}
            disabled={!isDrawing && (!sigCanvas.current || sigCanvas.current.isEmpty())}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={saveSignature}
            disabled={!isDrawing && (!sigCanvas.current || sigCanvas.current.isEmpty())}
          >
            Salvar Assinatura
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;