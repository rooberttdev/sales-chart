import React from "react";
import { DropdownProps } from "../types/types";

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Selecione...</option>
        {options.map((option, index) => (
          <option key={index} value={option.nome}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
