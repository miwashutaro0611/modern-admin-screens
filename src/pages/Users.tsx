
import { useState } from 'react';
import CMSLayout from '../components/CMSLayout';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2, Search, UserCheck, UserX } from 'lucide-react';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users] = useState([
    { 
      id: 1, 
      name: '田中太郎', 
      email: 'tanaka@example.com',
      role: '管理者',
      status: 'アクティブ',
      articles: 12,
      lastLogin: '2024-01-15 14:30',
      joinDate: '2023-06-15'
    },
    { 
      id: 2, 
      name: '佐藤花子', 
      email: 'sato@example.com',
      role: '編集者',
      status: 'アクティブ',
      articles: 8,
      lastLogin: '2024-01-14 09:15',
      joinDate: '2023-08-22'
    },
    { 
      id: 3, 
      name: '山田次郎', 
      email: 'yamada@example.com',
      role: 'ライター',
      status: '停止中',
      articles: 5,
      lastLogin: '2024-01-10 16:45',
      joinDate: '2023-09-10'
    },
    { 
      id: 4, 
      name: '鈴木一郎', 
      email: 'suzuki@example.com',
      role: 'ライター',
      status: 'アクティブ',
      articles: 15,
      lastLogin: '2024-01-13 11:20',
      joinDate: '2023-05-03'
    },
  ]);

  const userColumns = [
    { 
      key: 'name', 
      label: 'ユーザー名',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{row.email}</div>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'ロール',
      render: (value: string) => (
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${value === '管理者' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' : ''}
          ${value === '編集者' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' : ''}
          ${value === 'ライター' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : ''}
        `}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'ステータス',
      render: (value: string) => (
        <div className="flex items-center">
          {value === 'アクティブ' ? (
            <UserCheck size={16} className="text-green-600 mr-2" />
          ) : (
            <UserX size={16} className="text-red-600 mr-2" />
          )}
          <span className={`
            text-sm font-medium
            ${value === 'アクティブ' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
          `}>
            {value}
          </span>
        </div>
      )
    },
    { key: 'articles', label: '記事数' },
    { key: 'lastLogin', label: '最終ログイン' },
    { key: 'joinDate', label: '登録日' },
  ];

  const handleDelete = (id: number) => {
    if (window.confirm('このユーザーを削除しますか？')) {
      console.log('Delete user:', id);
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'アクティブ' ? '停止中' : 'アクティブ';
    console.log(`Change user ${id} status to:`, newStatus);
  };

  const actions = (row: any) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleToggleStatus(row.id, row.status)}
        className={`p-1 ${
          row.status === 'アクティブ' 
            ? 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300' 
            : 'text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300'
        }`}
        title={row.status === 'アクティブ' ? '停止' : '有効化'}
      >
        {row.status === 'アクティブ' ? <UserX size={16} /> : <UserCheck size={16} />}
      </button>
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
    <CMSLayout title="ユーザー管理">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ユーザーを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-input pl-10 w-full sm:w-64"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="cms-button-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            新規ユーザー
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="cms-card text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">42</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">総ユーザー数</div>
          </div>
          <div className="cms-card text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">38</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">アクティブユーザー</div>
          </div>
          <div className="cms-card text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">停止中ユーザー</div>
          </div>
          <div className="cms-card text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">8</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今月の新規登録</div>
          </div>
        </div>

        {/* Users Table */}
        <DataTable 
          columns={userColumns}
          data={users}
          actions={actions}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            1-10 of 42 results
          </div>
          <div className="flex space-x-2">
            <button className="cms-button-secondary">前へ</button>
            <button className="cms-button-primary">1</button>
            <button className="cms-button-secondary">2</button>
            <button className="cms-button-secondary">次へ</button>
          </div>
        </div>
      </div>

      {/* New User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="新規ユーザー作成"
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ユーザー名
            </label>
            <input
              type="text"
              className="cms-input"
              placeholder="ユーザー名を入力..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              className="cms-input"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ロール
            </label>
            <select className="cms-input">
              <option>ライター</option>
              <option>編集者</option>
              <option>管理者</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              パスワード
            </label>
            <input
              type="password"
              className="cms-input"
              placeholder="パスワードを入力..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              パスワード確認
            </label>
            <input
              type="password"
              className="cms-input"
              placeholder="パスワードを再入力..."
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
              type="submit"
              className="cms-button-primary"
            >
              作成
            </button>
          </div>
        </form>
      </Modal>
    </CMSLayout>
  );
};

export default Users;
