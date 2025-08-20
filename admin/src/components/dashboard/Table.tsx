import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

// Interfaz para los productos
interface Product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}

interface TableProps {
  isOpen: boolean;
}

// Definir algunos datos de ejemplo
const products: Product[] = [
  { code: 'P001', name: 'Product 1', category: 'Category A', quantity: 100 },
  { code: 'P002', name: 'Product 2', category: 'Category B', quantity: 200 },
  { code: 'P003', name: 'Product 3', category: 'Category C', quantity: 150 },
  { code: 'P004', name: 'Product 4', category: 'Category A', quantity: 80 },
  { code: 'P005', name: 'Product 5', category: 'Category B', quantity: 120 },
  { code: 'P006', name: 'Product 6', category: 'Category C', quantity: 95 },
  { code: 'P007', name: 'Product 7', category: 'Category A', quantity: 50 },
  { code: 'P008', name: 'Product 8', category: 'Category B', quantity: 70 },
  { code: 'P009', name: 'Product 9', category: 'Category C', quantity: 200 },
  { code: 'P010', name: 'Product 10', category: 'Category A', quantity: 90 },
  { code: 'P011', name: 'Product 11', category: 'Category D', quantity: 160 },
  { code: 'P012', name: 'Product 12', category: 'Category D', quantity: 130 },
  { code: 'P013', name: 'Product 13', category: 'Category A', quantity: 210 },
  { code: 'P014', name: 'Product 14', category: 'Category B', quantity: 90 },
  { code: 'P015', name: 'Product 15', category: 'Category C', quantity: 75 },
  { code: 'P016', name: 'Product 16', category: 'Category A', quantity: 60 },
  { code: 'P017', name: 'Product 17', category: 'Category B', quantity: 180 },
  { code: 'P018', name: 'Product 18', category: 'Category C', quantity: 140 },
  { code: 'P019', name: 'Product 19', category: 'Category D', quantity: 110 },
  { code: 'P020', name: 'Product 20', category: 'Category A', quantity: 230 },
  { code: 'P021', name: 'Product 21', category: 'Category D', quantity: 160 },
  { code: 'P022', name: 'Product 22', category: 'Category B', quantity: 190 },
  { code: 'P023', name: 'Product 23', category: 'Category C', quantity: 85 },
  { code: 'P024', name: 'Product 24', category: 'Category A', quantity: 120 },
  { code: 'P025', name: 'Product 25', category: 'Category B', quantity: 140 },
  { code: 'P026', name: 'Product 26', category: 'Category C', quantity: 220 },
  { code: 'P027', name: 'Product 27', category: 'Category A', quantity: 180 },
  { code: 'P028', name: 'Product 28', category: 'Category D', quantity: 200 },
  { code: 'P029', name: 'Product 29', category: 'Category B', quantity: 250 },
  { code: 'P030', name: 'Product 30', category: 'Category C', quantity: 160 },
];

const Table: React.FC<TableProps> = ({ isOpen }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [first, setFirst] = useState(0); // Página actual

  if (!isOpen) return null;

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  const onPageChange = (e: { first: number; rows: number }) => {
    setFirst(e.first); // Actualiza la página actual
  };

  return (
    <div>
      <div className="mt-8 mb-2">
        <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder="Búscar" className="p-2 w-1/2 rounded-sm border-[#311800] border-3 shadow-sm bg-gray-50 text-[#311800] placeholder:italic"/>
      </div>

      <div className="overflow-x-auto text-xs sm:text-base"> {/* Hace que la tabla sea desplazable horizontalmente */}
        <DataTable 
          value={products} 
          paginator 
          rows={8} // Número de filas por página
          first={first} // Página actual
          globalFilter={globalFilter}
          onPage={onPageChange} // Maneja el cambio de página
          className="min-w-full mt-6"
        >
          <Column field="code" header="Code" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
          <Column field="name" header="Name" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
          <Column field="category" header="Category" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
          <Column field="quantity" header="Quantity" sortable headerClassName="bg-[#311800] border-[#311800] border-1 text-gray-200 p-2" className="p-1 border-[#311800] border-1 bg-gray-50 text-[#311800]"/>
        </DataTable>
      </div>
    </div>
  );
};

export default Table;