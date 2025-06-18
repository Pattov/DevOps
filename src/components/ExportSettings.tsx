import React from 'react';
import { ExportSettings } from '../types';
import { Settings, FileText, Filter, SortAsc } from 'lucide-react';

interface ExportSettingsProps {
  settings: ExportSettings;
  onSettingsChange: (settings: ExportSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExportSettingsComponent: React.FC<ExportSettingsProps> = ({
  settings,
  onSettingsChange,
  isOpen,
  onToggle
}) => {
  const updateSettings = (updates: Partial<ExportSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const updateFieldsToInclude = (field: keyof ExportSettings['fieldsToInclude'], value: boolean) => {
    onSettingsChange({
      ...settings,
      fieldsToInclude: {
        ...settings.fieldsToInclude,
        [field]: value
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-center px-4 py-2 mb-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Settings className="w-4 h-4 mr-2" />
        Configurar Exportación
      </button>
    );
  }

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-semibold text-gray-900 flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Configuración de Exportación
        </h4>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {/* Diseño de Impresión */}
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 mr-2" />
          Diseño de Impresión
        </label>
        <select
          value={settings.printDesign}
          onChange={(e) => updateSettings({ printDesign: e.target.value as ExportSettings['printDesign'] })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="detailed">Detallado - Incluye todos los campos</option>
          <option value="summary">Resumen - Solo información esencial</option>
          <option value="compact">Compacto - Formato condensado</option>
          <option value="custom">Personalizado - Campos seleccionados</option>
        </select>
      </div>

      {/* Incluir casos sin ejecutar */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.includeUnexecutedCases}
            onChange={(e) => updateSettings({ includeUnexecutedCases: e.target.checked })}
            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Incluir casos de prueba sin ejecutar</span>
        </label>
      </div>

      {/* Campos a incluir */}
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Filter className="w-4 h-4 mr-2" />
          Campos a Incluir
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(settings.fieldsToInclude).map(([field, included]) => (
            <label key={field} className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={included}
                onChange={(e) => updateFieldsToInclude(field as keyof ExportSettings['fieldsToInclude'], e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={settings.printDesign === 'detailed'}
              />
              <span className="text-gray-700 capitalize">
                {field === 'expectedResult' ? 'Resultado Esperado' :
                 field === 'preconditions' ? 'Precondiciones' :
                 field === 'description' ? 'Descripción' :
                 field === 'steps' ? 'Pasos' :
                 field === 'variables' ? 'Variables' :
                 field === 'tags' ? 'Etiquetas' :
                 field === 'priority' ? 'Prioridad' :
                 field === 'automationStatus' ? 'Estado Automatización' :
                 field === 'lastExecuted' ? 'Última Ejecución' :
                 field === 'outcome' ? 'Resultado' : field}
              </span>
            </label>
          ))}
        </div>
        {settings.printDesign === 'detailed' && (
          <p className="text-xs text-gray-500 mt-1">
            En modo detallado se incluyen todos los campos automáticamente
          </p>
        )}
      </div>

      {/* Orden de las pruebas */}
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <SortAsc className="w-4 h-4 mr-2" />
          Orden de las Pruebas
        </label>
        <select
          value={settings.testOrder}
          onChange={(e) => updateSettings({ testOrder: e.target.value as ExportSettings['testOrder'] })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="original">Orden Original</option>
          <option value="alphabetical">Alfabético</option>
          <option value="priority">Por Prioridad</option>
          <option value="status">Por Estado</option>
        </select>
      </div>

      {/* Agrupar por */}
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          Agrupar Por
        </label>
        <select
          value={settings.groupBy}
          onChange={(e) => updateSettings({ groupBy: e.target.value as ExportSettings['groupBy'] })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="none">Sin Agrupación</option>
          <option value="suite">Por Test Suite</option>
          <option value="priority">Por Prioridad</option>
          <option value="status">Por Estado</option>
        </select>
      </div>
    </div>
  );
};