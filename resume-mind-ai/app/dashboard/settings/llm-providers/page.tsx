'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ProviderCard, { ProviderStatus } from '@/app/components/dashboard/settings/ProviderCard';
import ConfigureProviderForm, {
  ProviderFormData,
  ProviderType,
} from '@/app/components/dashboard/settings/ConfigureProviderForm';
import { apiFetch, ApiError } from '@/app/lib/api';

interface ProviderApi {
  id: string;
  provider_type: ProviderType;
  model_name: string;
  base_url?: string;
  status: ProviderStatus;
  latency_ms?: number;
  error_message?: string;
  logo_initials?: string;
  logo_color_class?: string;
  name?: string;
  display_name?: string;
}

interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  model: string;
  status: ProviderStatus;
  latency?: number;
  errorMessage?: string;
  logoInitials: string;
  logoColorClass: string;
  baseUrl?: string;
}

interface SupportedProvider {
  provider_type: ProviderType;
  provider_name: string;
  logo_initials?: string;
  logo_color_class?: string;
}

export default function LLMProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [supportedProviders, setSupportedProviders] = useState<SupportedProvider[]>([]);

  const mapProviderWithLookup = useCallback(
    (p: ProviderApi, lookup: Record<ProviderType, SupportedProvider>): Provider => {
      const type = p.provider_type;
      const supported = lookup[type];
      return {
        id: p.id,
        name: p.display_name || p.name || supported?.provider_name || p.provider_type,
        type,
        model: p.model_name,
        status: p.status,
        latency: p.latency_ms,
        errorMessage: p.error_message,
        logoInitials: p.logo_initials || supported?.logo_initials || 'NA',
        logoColorClass: p.logo_color_class || supported?.logo_color_class || 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        baseUrl: p.base_url,
      };
    },
    []
  );

  const mapProvider = useCallback(
    (p: ProviderApi): Provider => {
      const lookup = supportedProviders.reduce<Record<ProviderType, SupportedProvider>>((acc, sp) => {
        acc[sp.provider_type] = sp;
        return acc;
      }, {} as Record<ProviderType, SupportedProvider>);
      return mapProviderWithLookup(p, lookup);
    },
    [mapProviderWithLookup, supportedProviders]
  );

  const loadProviders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [supported, data] = await Promise.all([
        apiFetch<SupportedProvider[]>('/settings/llm-providers/supported'),
        apiFetch<ProviderApi[]>('/settings/llm-providers/'),
      ]);
      const lookup = supported.reduce<Record<ProviderType, SupportedProvider>>((acc, sp) => {
        acc[sp.provider_type] = sp;
        return acc;
      }, {} as Record<ProviderType, SupportedProvider>);
      setSupportedProviders(supported);
      setProviders(data.map((p) => mapProviderWithLookup(p, lookup)));
    } catch (err) {
      const e = err as ApiError;
      setError(e?.message || 'Failed to load providers');
    } finally {
      setLoading(false);
    }
  }, [mapProviderWithLookup]);

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  const handleAddNew = () => {
    setEditingProvider(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const provider = providers.find((p) => p.id === id);
    if (provider) {
      setEditingProvider(provider);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await apiFetch(`/settings/llm-providers/${id}`, { method: 'DELETE' });
      setProviders((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const e = err as ApiError;
      setError(e?.message || 'Failed to delete provider');
    }
  };

  const handleTest = async (id: string, overrides?: Partial<ProviderFormData>) => {
    setError(null);
    setTestingId(id);
    try {
      const data = await apiFetch<{
        status: ProviderStatus;
        latency_ms?: number;
        error_message?: string;
        provider: ProviderApi;
      }>(`/settings/llm-providers/${id}/test-connection`, {
        method: 'POST',
        body: JSON.stringify({
          api_key: overrides?.apiKey,
          base_url: overrides?.baseUrl,
          model_name: overrides?.modelName,
        }),
      });
      setProviders((prev) => prev.map((p) => (p.id === id ? mapProvider(data.provider) : p)));
      return data.status === 'connected';
    } catch (err) {
      const e = err as ApiError;
      setError(e?.message || 'Failed to test connection');
      return false;
    } finally {
      setTestingId(null);
    }
  };

  const handleSave = async (data: ProviderFormData) => {
    setSaving(true);
    setError(null);
    try {
      if (editingProvider) {
        const updated = await apiFetch<ProviderApi>(`/settings/llm-providers/${editingProvider.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            provider_type: data.providerType,
            model_name: data.modelName,
            base_url: data.baseUrl,
            api_key: data.apiKey,
          }),
        });
        setProviders((prev) => prev.map((p) => (p.id === editingProvider.id ? mapProvider(updated) : p)));
      } else {
        const created = await apiFetch<ProviderApi>('/settings/llm-providers/', {
          method: 'POST',
          body: JSON.stringify({
            provider_type: data.providerType,
            model_name: data.modelName,
            base_url: data.baseUrl,
            api_key: data.apiKey,
          }),
        });
        setProviders((prev) => [...prev, mapProvider(created)]);
      }

      setIsFormOpen(false);
      setEditingProvider(null);
    } catch (err) {
      const e = err as ApiError & { status?: number };
      if (e?.status === 409) {
        setError('Provider/model already exists');
      } else if (e?.status === 422) {
        setError('Validation error: check fields');
      } else {
        setError(e?.message || 'Failed to save provider');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProvider(null);
  };

  const providerOptions = useMemo(() => {
    return supportedProviders.map((sp) => ({
      value: sp.provider_type,
      label: sp.provider_name || sp.provider_type,
      logoInitials: sp.logo_initials,
      logoColorClass: sp.logo_color_class,
    }));
  }, [supportedProviders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Provider Management</h2>
          <p className="text-sm text-slate-400">Configure LLM providers for LiteLLM orchestration.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-violet-600 text-white text-sm font-medium rounded-lg transition-all shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          <span className="material-symbols-outlined mr-2 text-lg">add_circle</span>
          Add New Provider
        </button>
      </div>

      {error && <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">{error}</div>}

      {loading ? (
        <div className="text-slate-400 text-sm">Loading providers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {providers.map((provider) => (
            <ProviderCard
              key={provider.id}
              id={provider.id}
              name={provider.name}
              model={provider.model}
              status={provider.status}
              latency={provider.latency}
              errorMessage={provider.errorMessage}
              logoInitials={provider.logoInitials}
              logoColorClass={provider.logoColorClass}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRetry={provider.status === 'error' ? (id) => handleTest(id) : undefined}
              onTest={handleTest}
              isTesting={testingId === provider.id}
            />
          ))}
          {providers.length === 0 && (
            <div className="text-slate-400 text-sm">No providers yet. Add your first one.</div>
          )}
        </div>
      )}

      {isFormOpen && (
        <ConfigureProviderForm
          mode={editingProvider ? 'edit' : 'create'}
          initialData={
            editingProvider
              ? {
                  providerType: editingProvider.type,
                  modelName: editingProvider.model,
                  baseUrl: editingProvider.baseUrl,
                }
              : undefined
          }
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={saving}
          providerOptions={providerOptions}
        />
      )}
    </div>
  );
}
