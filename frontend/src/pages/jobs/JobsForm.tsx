import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X } from 'lucide-react';

interface JobFormData {
  title: string;
  description: string;
  type: 'CLT' | 'PJ' | 'Freelancer';
  status: 'active' | 'paused';
  requirements: string;
  benefits: string;
  salary: string;
  location: string;
}

type JobFormErrors = {
  [K in keyof JobFormData]?: string;
};

interface JobFormProps {
  jobId?: string;
  onClose?: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    type: 'CLT',
    status: 'active',
    requirements: '',
    benefits: '',
    salary: '',
    location: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<JobFormErrors>({});

  const isEditing = !!jobId;

  useEffect(() => {
    if (isEditing) {
      loadJobData();
    }
  }, [jobId]);

  const loadJobData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${jobId}`);
      if (!response.ok) throw new Error('Erro ao buscar dados da vaga');
      const jobData = await response.json();
      setFormData(jobData);
    } catch (error) {
      console.error('Erro ao carregar vaga:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: JobFormErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Título é obrigatório';
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!formData.type) newErrors.type = 'Tipo é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      const response = await fetch(isEditing ? `/api/jobs/${jobId}` : '/api/jobs', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar vaga');
      }

      const savedJob = await response.json();
      console.log('Vaga salva com sucesso:', savedJob);

      alert(isEditing ? 'Vaga atualizada com sucesso!' : 'Vaga criada com sucesso!');

      if (!isEditing) {
        setFormData({
          title: '',
          description: '',
          type: 'CLT',
          status: 'active',
          requirements: '',
          benefits: '',
          salary: '',
          location: ''
        });
      }

      if (onClose) onClose();

    } catch (error) {
      console.error('Erro ao salvar vaga:', error);
      alert('Erro ao salvar vaga. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button
            onClick={onClose || (() => console.log('Voltar'))}
            className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editar Vaga' : 'Nova Vaga'}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título da Vaga *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Desenvolvedor React Sênior"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Contrato *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as JobFormData['type'])}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Freelancer">Freelancer</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value as JobFormData['status'])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Ativa</option>
                <option value="paused">Pausada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salário
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="Ex: R$ 5.000 - R$ 8.000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Ex: São Paulo - SP ou Remoto"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da Vaga</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva as responsabilidades e atividades da vaga..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="Liste as habilidades e experiências necessárias..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Descreva os benefícios oferecidos..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose || (() => console.log('Cancelar'))}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar Vaga'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
