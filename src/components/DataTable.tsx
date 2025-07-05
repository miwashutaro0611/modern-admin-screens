
import { ReactNode } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => ReactNode;
}

const DataTable = ({ columns, data, actions }: DataTableProps) => {
  return (
    <div className="cms-card p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="cms-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {actions && <th>アクション</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
                {actions && (
                  <td>{actions(row)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
