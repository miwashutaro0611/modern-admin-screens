
import { useState } from 'react';
import CMSLayout from '../components/CMSLayout';
import { Save, Upload, Database, Mail, Shield, Palette } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'My CMS Site',
    siteDescription: 'A powerful content management system',
    siteUrl: 'https://example.com',
    adminEmail: 'admin@example.com',
    timezone: 'Asia/Tokyo',
    language: 'ja',
    theme: 'light',
    enableComments: true,
    enableNotifications: true,
    maxFileSize: '10',
    allowedFileTypes: 'jpg,png,gif,pdf,doc,docx',
  });

  const tabs = [
    { id: 'general', label: '一般設定', icon: Shield },
    { id: 'appearance', label: '外観', icon: Palette },
    { id: 'email', label: 'メール設定', icon: Mail },
    { id: 'media', label: 'メディア設定', icon: Upload },
    { id: 'database', label: 'データベース', icon: Database },
  ];

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // ここで設定を保存する処理を実装
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            サイト名
          </label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => handleInputChange('siteName', e.target.value)}
            className="cms-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            管理者メールアドレス
          </label>
          <input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
            className="cms-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          サイト説明
        </label>
        <textarea
          rows={3}
          value={settings.siteDescription}
          onChange={(e) => handleInputChange('siteDescription', e.target.value)}
          className="cms-input resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            サイトURL
          </label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(e) => handleInputChange('siteUrl', e.target.value)}
            className="cms-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            タイムゾーン
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleInputChange('timezone', e.target.value)}
            className="cms-input"
          >
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            言語
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="cms-input"
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableComments"
            checked={settings.enableComments}
            onChange={(e) => handleInputChange('enableComments', e.target.checked)}
            className="mr-3"
          />
          <label htmlFor="enableComments" className="text-sm text-gray-700 dark:text-gray-300">
            コメント機能を有効にする
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableNotifications"
            checked={settings.enableNotifications}
            onChange={(e) => handleInputChange('enableNotifications', e.target.checked)}
            className="mr-3"
          />
          <label htmlFor="enableNotifications" className="text-sm text-gray-700 dark:text-gray-300">
            通知機能を有効にする
          </label>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          テーマ
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['light', 'dark', 'auto'].map((theme) => (
            <div
              key={theme}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                settings.theme === theme 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => handleInputChange('theme', theme)}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-lg ${
                  theme === 'light' ? 'bg-white border' : 
                  theme === 'dark' ? 'bg-gray-800' : 
                  'bg-gradient-to-r from-white to-gray-800'
                }`} />
                <div className="text-sm font-medium capitalize">
                  {theme === 'light' ? 'ライト' : theme === 'dark' ? 'ダーク' : '自動'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          カスタムCSS
        </label>
        <textarea
          rows={8}
          className="cms-input resize-none font-mono text-sm"
          placeholder="/* カスタムCSSをここに記述 */"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          注意: カスタムCSSは慎重に使用してください。サイトの表示に影響を与える可能性があります。
        </p>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SMTPサーバー
          </label>
          <input
            type="text"
            className="cms-input"
            placeholder="smtp.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ポート
          </label>
          <input
            type="number"
            className="cms-input"
            placeholder="587"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ユーザー名
          </label>
          <input
            type="text"
            className="cms-input"
            placeholder="username@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            パスワード
          </label>
          <input
            type="password"
            className="cms-input"
            placeholder="パスワード"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          暗号化
        </label>
        <select className="cms-input">
          <option value="tls">TLS</option>
          <option value="ssl">SSL</option>
          <option value="none">なし</option>
        </select>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>注意:</strong> メール設定を変更した後は、テストメールを送信して正しく動作することを確認してください。
        </p>
      </div>

      <div>
        <button className="cms-button-secondary">
          テストメール送信
        </button>
      </div>
    </div>
  );

  const renderMediaSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          最大ファイルサイズ (MB)
        </label>
        <input
          type="number"
          value={settings.maxFileSize}
          onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
          className="cms-input"
          min="1"
          max="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          許可するファイル形式
        </label>
        <input
          type="text"
          value={settings.allowedFileTypes}
          onChange={(e) => handleInputChange('allowedFileTypes', e.target.value)}
          className="cms-input"
          placeholder="jpg,png,gif,pdf,doc,docx"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          カンマ区切りで拡張子を指定してください
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          画像の自動リサイズ
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              サムネイル (px)
            </label>
            <input
              type="number"
              className="cms-input"
              placeholder="150"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              中サイズ (px)
            </label>
            <input
              type="number"
              className="cms-input"
              placeholder="300"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              大サイズ (px)
            </label>
            <input
              type="number"
              className="cms-input"
              placeholder="800"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSettings = () => (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-sm text-red-800 dark:text-red-200">
          <strong>警告:</strong> データベース設定の変更は慎重に行ってください。間違った設定はサイトの動作に重大な影響を与える可能性があります。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cms-card">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">データベース情報</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">データベース名:</span>
              <span className="font-medium">cms_database</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">テーブル数:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">データベースサイズ:</span>
              <span className="font-medium">45.2 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">最終バックアップ:</span>
              <span className="font-medium">2024-01-15 02:00</span>
            </div>
          </div>
        </div>

        <div className="cms-card">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">メンテナンス</h4>
          <div className="space-y-3">
            <button className="w-full cms-button-secondary">
              データベース最適化
            </button>
            <button className="w-full cms-button-secondary">
              バックアップ作成
            </button>
            <button className="w-full cms-button-secondary text-red-600 hover:text-red-800">
              データベースリセット
            </button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-4">自動バックアップ設定</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="autoBackup" className="mr-3" />
            <label htmlFor="autoBackup" className="text-sm text-gray-700 dark:text-gray-300">
              自動バックアップを有効にする
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                バックアップ頻度
              </label>
              <select className="cms-input">
                <option value="daily">毎日</option>
                <option value="weekly">毎週</option>
                <option value="monthly">毎月</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                保持期間
              </label>
              <select className="cms-input">
                <option value="7">7日間</option>
                <option value="30">30日間</option>
                <option value="90">90日間</option>
                <option value="365">1年間</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'email':
        return renderEmailSettings();
      case 'media':
        return renderMediaSettings();
      case 'database':
        return renderDatabaseSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <CMSLayout title="設定">
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }
                `}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="cms-card">
          {renderContent()}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="cms-button-primary flex items-center"
          >
            <Save size={20} className="mr-2" />
            設定を保存
          </button>
        </div>
      </div>
    </CMSLayout>
  );
};

export default Settings;
