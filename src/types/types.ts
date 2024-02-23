export interface Marca {
  nome: string;
  vendas: number[];
}

export interface Produto {
  nome: string;
  marcas: Marca[];
}

export interface Categoria {
  nome: string;
  produtos: Produto[];
}

export interface MockData {
  categorias: Categoria[];
}

export interface DropdownOption {
  nome: string;
}

export interface SalesData {
  mes: string;
  valor: number;
}

export interface DropdownProps {
  id: string;
  label: string; 
  options: DropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export interface SalesChartProps {
  data: SalesData[];
}
