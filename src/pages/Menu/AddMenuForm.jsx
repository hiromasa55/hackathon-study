import { useState } from 'react';

export default function AddMenuForm({ onAdd }) {
    // Menu.jsx からお引っ越ししてきた状態管理
    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemCalories, setNewItemCalories] = useState('');
    const [newItemImage, setNewItemImage] = useState('');

    const handleSubmit = () => {
        if (!newItemName || !newItemPrice) return; 

        const newItem = {
            id: Date.now(),
            name: newItemName,
            price: parseInt(newItemPrice, 10),
            calories: newItemCalories ? parseInt(newItemCalories, 10) : null,
            image: newItemImage || 'https://placehold.jp/150x100.png?text=No+Image',
            isActive: true 
        };

        // 親コンポーネント (Menu.jsx) に完成したデータを渡す
        onAdd(newItem);

        // 入力欄をリセットする
        setNewItemName('');
        setNewItemPrice('');
        setNewItemCalories('');
        setNewItemImage('');
    };

    return (
        <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f9f9f9' }}>
            <h3>新しいメニューを追加</h3>
            <input
                type="text"
                placeholder="メニュー名 (必須)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                style={{ padding: '8px' }}
            />
            <input
                type="number"
                placeholder="価格 (円・必須)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                style={{ padding: '8px' }}
            />
            <input
                type="number"
                placeholder="カロリー (kcal・任意)"
                value={newItemCalories}
                onChange={(e) => setNewItemCalories(e.target.value)}
                style={{ padding: '8px' }}
            />
            <input
                type="text"
                placeholder="画像URL (任意)"
                value={newItemImage}
                onChange={(e) => setNewItemImage(e.target.value)}
                style={{ padding: '8px' }}
            />
            <button onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                メニューを追加
            </button>
        </div>
    );
}