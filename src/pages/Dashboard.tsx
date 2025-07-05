
import { useState } from 'react';
import CMSLayout from '../components/CMSLayout';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import { FileText, Users, Eye, MessageSquare, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [recentArticles] = useState([
    { id: 1, title: 'Next.jsの最新機能について', author: '田中太郎', status: '公開', views: 1250, date: '2024-01-15' },
    { id: 2, title: 'TypeScriptベストプラクティス', author: '佐藤花子', status: '下書き', views: 0, date: '2024-01-14' },
    { id: 3, title: 'レスポンシブデザインのコツ', author: '山田次郎', status: '公開', views: 890, date: '2024-01-13' },
    { id: 4, title: 'パフォーマンス最適化手法', author: '鈴木一郎', status: 'レビュー中', views: 0, date: '2024-01-12' },
  ]);

  const articleColumns = [
    { key: 'title', label: 'タイトル' },
    { key: 'author', label: '作成者' },
    { 
      key: 'status', 
      label: 'ステータス',
      render: (value: string) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${value === '公開' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
          ${value === '下書き' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : ''}
          ${value === 'レビュー中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : ''}
        `}>
          {value}
        </span>
      )
    },
    { key: 'views', label: 'PV数' },
    { key: 'date', label: '更新日' },
  ];

  return (
    <CMSLayout title="ダッシュボード">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="総記事数"
            value="156"
            icon={<FileText size={24} />}
            trend={{ value: 12, isPositive: true }}
            color="blue"
          />
          <StatsCard
            title="総ユーザー数"
            value="42"
            icon={<Users size={24} />}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatsCard
            title="月間PV"
            value="24,567"
            icon={<Eye size={24} />}
            trend={{ value: 15, isPositive: true }}
            color="yellow"
          />
          <StatsCard
            title="コメント数"
            value="1,234"
            icon={<MessageSquare size={24} />}
            trend={{ value: -3, isPositive: false }}
            color="red"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="cms-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp size={20} className="mr-2" />
              アクセス推移
            </h3>
            <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                チャートエリア（実装時にはグラフライブラリを使用）
              </p>
            </div>
          </div>

          <div className="cms-card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              人気カテゴリ
            </h3>
            <div className="space-y-3">
              {[
                { name: 'プログラミング', count: 45, percentage: 75 },
                { name: 'デザイン', count: 32, percentage: 55 },
                { name: 'マーケティング', count: 18, percentage: 30 },
                { name: 'その他', count: 12, percentage: 20 },
              ].map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              最近の記事
            </h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
              すべて表示
            </button>
          </div>
          <DataTable 
            columns={articleColumns}
            data={recentArticles}
          />
        </div>
      </div>
    </CMSLayout>
  );
};

export default Dashboard;
