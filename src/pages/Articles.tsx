
import { useState } from 'react';
import CMSLayout from '../components/CMSLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

const Articles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const [articles] = useState([
    { 
      id: 1, 
      title: 'Next.jsの最新機能について', 
      author: '田中太郎', 
      status: '公開', 
      category: 'プログラミング',
      views: 1250, 
      date: '2024-01-15',
      tags: ['Next.js', 'React', 'JavaScript']
    },
    { 
      id: 2, 
      title: 'TypeScriptベストプラクティス', 
      author: '佐藤花子', 
      status: '下書き', 
      category: 'プログラミング',
      views: 0, 
      date: '2024-01-14',
      tags: ['TypeScript', 'JavaScript']
    },
    { 
      id: 3, 
      title: 'レスポンシブデザインのコツ', 
      author: '山田次郎', 
      status: '公開', 
      category: 'デザイン',
      views: 890, 
      date: '2024-01-13',
      tags: ['CSS', 'デザイン', 'レスポンシブ']
    },
    { 
      id: 4, 
      title: 'パフォーマンス最適化手法', 
      author: '鈴木一郎', 
      status: 'レビュー中', 
      category: 'プログラミング',
      views: 0, 
      date: '2024-01-12',
      tags: ['パフォーマンス', '最適化']
    },
  ]);

  const articleColumns = [
    { 
      key: 'title', 
      label: 'タイトル',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.category}</div>
        </div>
      )
    },
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
    { 
      key: 'tags',
      label: 'タグ',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
              {tag}
            </span>
          ))}
          {value.length > 2 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{value.length - 2}
            </span>
          )}
        </div>
      )
    },
    { key: 'views', label: 'PV数' },
    { key: 'date', label: '更新日' },
  ];

  const handleDelete = (id: number) => {
    if (window.confirm('この記事を削除しますか？')) {
      console.log('Delete article:', id);
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit article:', id);
  };

  const actions = (row: any) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleEdit(row.id)}
        className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        title="編集"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={() => handleDelete(row.id)}
        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        title="削除"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  return (
    <CMSLayout title="記事管理">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cms-input pl-10 w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="cms-input pl-10 w-full sm:w-40"
              >
                <option value="all">すべて</option>
                <option value="published">公開</option>
                <option value="draft">下書き</option>
                <option value="review">レビュー中</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="cms-button-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            新規記事
          </button>
        </div>

        {/* Articles Table */}
        <DataTable 
          columns={articleColumns}
          data={articles}
          actions={actions}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            1-10 of 156 results
          </div>
          <div className="flex space-x-2">
            <button className="cms-button-secondary">前へ</button>
            <button className="cms-button-secondary">1</button>
            <button className="cms-button-primary">2</button>
            <button className="cms-button-secondary">3</button>
            <button className="cms-button-secondary">次へ</button>
          </div>
        </div>
      </div>

      {/* New Article Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="新規記事作成"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タイトル
            </label>
            <input
              type="text"
              className="cms-input"
              placeholder="記事のタイトルを入力..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              カテゴリ
            </label>
            <select className="cms-input">
              <option>プログラミング</option>
              <option>デザイン</option>
              <option>マーケティング</option>
              <option>その他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              タグ
            </label>
            <input
              type="text"
              className="cms-input"
              placeholder="タグをカンマ区切りで入力..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              本文
            </label>
            <textarea
              rows={8}
              className="cms-input resize-none"
              placeholder="記事の内容を入力..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="cms-button-secondary"
            >
              キャンセル
            </button>
            <button
              type="button"
              className="cms-button-secondary"
            >
              下書き保存
            </button>
            <button
              type="submit"
              className="cms-button-primary"
            >
              公開
            </button>
          </div>
        </form>
      </Modal>
    </CMSLayout>
  );
};

export default Articles;
