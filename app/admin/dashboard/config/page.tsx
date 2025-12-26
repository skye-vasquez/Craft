'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  FileText,
  ToggleLeft,
  ToggleRight,
  Save,
  RefreshCw,
} from 'lucide-react';
import { Button, Select, Input, Card, Badge } from '@/components/ui';
import type { Store, Control, CraftPacketConfig } from '@/lib/types';

interface CraftConfigWithStore extends CraftPacketConfig {
  stores: Store;
}

export default function AdminConfigPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [controls, setControls] = useState<Control[]>([]);
  const [craftConfigs, setCraftConfigs] = useState<CraftConfigWithStore[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedStore, setSelectedStore] = useState('');
  const [newPin, setNewPin] = useState('');
  const [savingPin, setSavingPin] = useState(false);
  const [pinSuccess, setPinSuccess] = useState(false);

  const [editingConfig, setEditingConfig] = useState<{
    store_id: string;
    period_type: 'weekly' | 'monthly';
    craft_doc_id: string;
  } | null>(null);
  const [savingConfig, setSavingConfig] = useState(false);

  const [togglingControl, setTogglingControl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [storeRes, controlRes, configRes] = await Promise.all([
          fetch('/api/stores'),
          fetch('/api/admin/controls'),
          fetch('/api/admin/craft-config'),
        ]);

        const [storeData, controlData, configData] = await Promise.all([
          storeRes.json(),
          controlRes.json(),
          configRes.json(),
        ]);

        if (storeData.stores) setStores(storeData.stores);
        if (controlData.controls) setControls(controlData.controls);
        if (configData.configs) setCraftConfigs(configData.configs);
      } catch (err) {
        console.error('Failed to fetch config data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSavePin = async () => {
    if (!selectedStore || newPin.length !== 6) return;

    setSavingPin(true);
    setPinSuccess(false);

    try {
      const res = await fetch('/api/admin/store-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store_id: selectedStore, pin: newPin }),
      });

      if (res.ok) {
        setPinSuccess(true);
        setNewPin('');
        setTimeout(() => setPinSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save PIN:', err);
    } finally {
      setSavingPin(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!editingConfig) return;

    setSavingConfig(true);

    try {
      const res = await fetch('/api/admin/craft-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingConfig),
      });

      if (res.ok) {
        const configRes = await fetch('/api/admin/craft-config');
        const configData = await configRes.json();
        if (configData.configs) setCraftConfigs(configData.configs);
        setEditingConfig(null);
      }
    } catch (err) {
      console.error('Failed to save config:', err);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleToggleControl = async (control: Control) => {
    setTogglingControl(control.id);

    try {
      const res = await fetch('/api/admin/controls', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: control.id,
          is_active: !control.is_active,
        }),
      });

      if (res.ok) {
        setControls((prev) =>
          prev.map((c) =>
            c.id === control.id ? { ...c, is_active: !c.is_active } : c
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle control:', err);
    } finally {
      setTogglingControl(null);
    }
  };

  const generatePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setNewPin(pin);
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-4 py-8">
        <Card>
          <p className="font-heading font-bold text-xl text-center">Loading configuration...</p>
        </Card>
      </main>
    );
  }

  const groupedConfigs = stores.map((store) => ({
    store,
    weekly: craftConfigs.find(
      (c) => c.store_id === store.id && c.period_type === 'weekly'
    ),
    monthly: craftConfigs.find(
      (c) => c.store_id === store.id && c.period_type === 'monthly'
    ),
  }));

  return (
    <main className="max-w-4xl mx-auto p-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-nb-teal border-3 border-nb-black">
          <Settings className="w-6 h-6" />
        </div>
        <h1 className="font-heading text-3xl font-bold">Configuration</h1>
      </div>

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5" />
          <h2 className="font-heading text-xl font-bold">Store PIN Management</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <Select
            label="Store"
            placeholder="Select store"
            options={stores.map((s) => ({ value: s.id, label: s.name }))}
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          />

          <div>
            <label className="block font-heading font-bold text-lg mb-2">
              New PIN
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="6 digits"
                value={newPin}
                onChange={(e) =>
                  setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6))
                }
                className="text-center tracking-[0.5em]"
              />
              <Button variant="secondary" onClick={generatePin} className="px-3">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleSavePin}
            loading={savingPin}
            disabled={!selectedStore || newPin.length !== 6}
          >
            <Save className="w-5 h-5" />
            Save PIN
          </Button>
        </div>

        {pinSuccess && (
          <div className="mt-4 p-3 bg-nb-green border-3 border-nb-black">
            PIN updated successfully!
          </div>
        )}
      </Card>

      <Card className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5" />
          <h2 className="font-heading text-xl font-bold">Craft Document Mapping</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="nb-table w-full">
            <thead>
              <tr>
                <th>Store</th>
                <th>Weekly Doc ID</th>
                <th>Monthly Doc ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedConfigs.map(({ store, weekly, monthly }) => (
                <tr key={store.id}>
                  <td className="font-bold">{store.name}</td>
                  <td>
                    {editingConfig?.store_id === store.id &&
                    editingConfig.period_type === 'weekly' ? (
                      <Input
                        value={editingConfig.craft_doc_id}
                        onChange={(e) =>
                          setEditingConfig({
                            ...editingConfig,
                            craft_doc_id: e.target.value,
                          })
                        }
                        className="py-1"
                      />
                    ) : (
                      <span className="font-mono">{weekly?.craft_doc_id || '-'}</span>
                    )}
                  </td>
                  <td>
                    {editingConfig?.store_id === store.id &&
                    editingConfig.period_type === 'monthly' ? (
                      <Input
                        value={editingConfig.craft_doc_id}
                        onChange={(e) =>
                          setEditingConfig({
                            ...editingConfig,
                            craft_doc_id: e.target.value,
                          })
                        }
                        className="py-1"
                      />
                    ) : (
                      <span className="font-mono">{monthly?.craft_doc_id || '-'}</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {editingConfig?.store_id === store.id ? (
                        <>
                          <Button
                            variant="success"
                            onClick={handleSaveConfig}
                            loading={savingConfig}
                            className="px-2 py-1 text-sm"
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditingConfig(null)}
                            className="px-2 py-1 text-sm"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              setEditingConfig({
                                store_id: store.id,
                                period_type: 'weekly',
                                craft_doc_id: weekly?.craft_doc_id || '',
                              })
                            }
                            className="px-2 py-1 text-sm"
                          >
                            Edit Weekly
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              setEditingConfig({
                                store_id: store.id,
                                period_type: 'monthly',
                                craft_doc_id: monthly?.craft_doc_id || '',
                              })
                            }
                            className="px-2 py-1 text-sm"
                          >
                            Edit Monthly
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="font-heading text-xl font-bold mb-4">Controls Management</h2>

        <div className="space-y-3">
          {controls.map((control) => (
            <div
              key={control.id}
              className={`flex items-center justify-between p-4 border-3 border-nb-black ${
                control.is_active ? 'bg-white' : 'bg-nb-gray'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold">{control.id}</span>
                  <Badge variant={control.period_type === 'weekly' ? 'pending' : 'default'}>
                    {control.period_type}
                  </Badge>
                  {!control.is_active && (
                    <Badge variant="failed">Inactive</Badge>
                  )}
                </div>
                <p className="text-sm text-nb-gray-dark">{control.name}</p>
              </div>

              <Button
                variant={control.is_active ? 'danger' : 'success'}
                onClick={() => handleToggleControl(control)}
                loading={togglingControl === control.id}
                className="px-4"
              >
                {control.is_active ? (
                  <>
                    <ToggleRight className="w-5 h-5" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-5 h-5" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
