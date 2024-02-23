import React, { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import jsonData from "./data/mockData.json";
import { MockData, SalesData } from "./types/types";
import { FiMenu } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import SalesChart from "./components/SalesChart";

const data: MockData = jsonData as MockData;
const meses = ["Janeiro", "Fevereiro", "Março", "Abril"];

const App: React.FC = () => {
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const [selectedProduto, setSelectedProduto] = useState<string>("");
  const [selectedMarca, setSelectedMarca] = useState<string>("");
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    if (selectedMarca) {
      const marcaSelecionada = data.categorias
        .flatMap((c) => c.produtos)
        .flatMap((p) => p.marcas)
        .find((m) => m.nome === selectedMarca);

      if (marcaSelecionada && marcaSelecionada.vendas) {
        const vendasFormatadas = marcaSelecionada.vendas.map(
          (venda, index) => ({
            mes: meses[index],
            valor: venda,
          })
        );
        setSalesData(vendasFormatadas);
      }
    }
  }, [selectedMarca]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button className="focus:outline-none">
            <FiMenu className="h-6 w-6" />
          </button>
          <span className="text-xl font-black">Relatório de vendas</span>
          <button className="focus:outline-none">
            <IoPersonCircle className="h-8 w-8" />
          </button>
        </div>
      </header>

      {/* Título */}
      <h2 className="text-2 font-semibold text-gray-800 mb-4 text-center p-3">
        Vendas por mês para:
      </h2>

      {/* Conteúdo principal */}
      <main className="flex-auto p-4 flex flex-col items-center justify-center">
        {/* Dropdowns */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center mb-6 gap-5">
          {/* Dropdown de Categoria */}
          <div className="flex items-center space-x-2">
            <label htmlFor="categoria" className="font-medium">
              Categoria:
            </label>
            <Dropdown
              id="categoria"
              options={data.categorias.map((c) => ({ nome: c.nome }))}
              selectedValue={selectedCategoria}
              onChange={setSelectedCategoria} label={""}            />
          </div>

          {/* Dropdown de Produto */}
          <div className="flex items-center space-x-2">
            <label htmlFor="produto" className="font-medium">
              Produto:
            </label>
            <Dropdown
              id="produto"
              options={data.categorias
                .find((c) => c.nome === selectedCategoria)
                ?.produtos.map((p) => ({ nome: p.nome })) || []}
              selectedValue={selectedProduto}
              onChange={setSelectedProduto} label={""}            />
          </div>

          {/* Dropdown de Marca */}
          <div className="flex items-center space-x-2">
            <label htmlFor="marca" className="font-medium">
              Marca:
            </label>
            <Dropdown
              id="marca"
              options={data.categorias
                .find((c) => c.nome === selectedCategoria)
                ?.produtos.find((p) => p.nome === selectedProduto)
                ?.marcas.map((m) => ({ nome: m.nome })) || []}
              selectedValue={selectedMarca}
              onChange={setSelectedMarca} label={""}            />
          </div>
        </div>

        {/* Gráfico de vendas */}
        <div className="w-full flex justify-center h-3/5">
          <SalesChart data={salesData} />
        </div>
      </main>
    </div>
  );
};

export default App;
