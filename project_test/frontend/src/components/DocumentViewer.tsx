import React from 'react';
import { FileText, Download, Copy, Pencil, Sparkles, FileCode, File as FilePdf } from 'lucide-react';
import { useStore } from '../store/useStore';
import Button from './ui/Button';
import { formatFileSize } from '../lib/utils';
import { motion } from 'framer-motion';

const DocumentViewer: React.FC = () => {
  const { currentDocument, isProcessing } = useStore();

  const getFileIcon = (type: string) => {
    if (type?.includes('pdf')) return <FilePdf className="h-5 w-5 text-primary-400" />;
    if (type?.includes('doc')) return <FileText className="h-5 w-5 text-primary-400" />;
    if (type?.includes('txt')) return <FileCode className="h-5 w-5 text-primary-400" />;
    return <FileText className="h-5 w-5 text-primary-400" />;
  };

  if (!currentDocument) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-dark-200 rounded-xl border border-dark-100">
        <FileText className="h-16 w-16 text-gray-700 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">
          No document selected
        </h3>
        <p className="text-gray-400 max-w-md">
          Select a document from the list or upload a new one to view its contents and analyze it.
        </p>
      </div>
    );
  }

  // In a real app, this would display the actual document content
  const mockContent = `This is a mock content for "${currentDocument.name}". 
In a real application, this would display the actual content of the document.
You would be able to see the text, formatting, and other elements of the document here.`;

  return (
    <div className="flex flex-col h-full bg-dark-200 rounded-xl shadow-lg border border-dark-100 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-dark-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-dark-100 flex items-center justify-center mr-3 border border-dark-100">
            {getFileIcon(currentDocument.type)}
          </div>
          <div>
            <h3 className="font-medium text-white">
              {currentDocument.name}
            </h3>
            <p className="text-xs text-gray-400">
              {formatFileSize(currentDocument.size)} • {currentDocument.type}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Copy className="h-4 w-4" />}
          >
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Download
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-dark-100 border-t-primary-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Processing document...</p>
          </div>
        ) : (
          <div className="max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-300 p-4 bg-dark-300 rounded-lg border border-dark-100">
              {mockContent}
            </pre>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-dark-100">
        <div className="flex gap-2">
          <Button
            variant="outline" className="rounded-full hover:bg-primary-500"
            leftIcon={<Pencil className="h-4 w-4" />}
          >
            Enhance Grammar
          </Button>
          <Button
            variant="secondary" className = "hover:bg-blue-500 rounded-full"
            leftIcon={<Sparkles className="h-4 w-4" />}
          >
            Summarize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;