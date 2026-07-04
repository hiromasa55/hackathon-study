import { useState } from 'react';

export default function Menu() {
    // 1. メニューの初期データ（isActive を追加）
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'カレーライス', price: 400, calories: 750, image: 'https://placehold.jp/150x100.png?text=Curry', isActive: true },
        { id: 2, name: 'ラーメン', price: 350, calories: 600, image: 'https://placehold.jp/150x100.png?text=Ramen', isActive: true },
        { id: 3, name: '日替わり定食', price: 500, calories: 850, image: 'https://placehold.jp/150x100.png?text=Teishoku', isActive: true }
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [sortType, setSortType] = useState('default');
    const [hoveredId, setHoveredId] = useState(null);

    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemCalories, setNewItemCalories] = useState('');
    const [newItemImage, setNewItemImage] = useState('');

    // --- ロジック部分 ---

    // メニューを追加する関数
    const handleAddItem = () => {
        if (!newItemName || !newItemPrice || !newItemCalories) return;

        const newItem = {
            id: Date.now(),
            name: newItemName,
            price: parseInt(newItemPrice, 10),
            calories: parseInt(newItemCalories, 10),
            image: newItemImage || 'https://placehold.jp/150x100.png?text=No+Image',
            isActive: true // 新しく追加したメニューも初期状態はON
        };

        setMenuItems([...menuItems, newItem]);
        setNewItemName('');
        setNewItemPrice('');
        setNewItemCalories('');
        setNewItemImage('');
    };

    // メニューを削除する関数
    const handleDeleteItem = (id) => {
        const updatedMenu = menuItems.filter(item => item.id !== id);
        setMenuItems(updatedMenu);
    };

    // ON/OFF（スライダー）を切り替える関数
    const handleToggleActive = (id) => {
        const updatedMenu = menuItems.map(item => {
            if (item.id === id) {
                return { ...item, isActive: !item.isActive }; // 対象のメニューだけ isActive を反転
            }
            return item;
        });
        setMenuItems(updatedMenu);
    };

    // 並び替え（ソート）の実行
    const sortedMenuItems = [...menuItems].sort((a, b) => {
        switch (sortType) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'calories-asc': return a.calories - b.calories;
            case 'calories-desc': return b.calories - a.calories;
            default: return 0;
        }
    });

    // --- 画面表示部分 ---
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>学食メニュー一覧</h1>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? '編集モードを終了' : 'メニューを編集する'}
                </button>

                <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ padding: '5px' }}>
                    <option value="default">標準</option>
                    <option value="price-asc">価格の安い順</option>
                    <option value="price-desc">価格の高い順</option>
                    <option value="calories-asc">カロリーの低い順</option>
                    <option value="calories-desc">カロリーの高い順</option>
                </select>
            </div>

            {/* メニューリストの表示 */}
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {sortedMenuItems.map((item) => (
                    <li 
                        key={item.id} 
                        style={{ 
                            border: '1px solid #ccc', 
                            borderRadius: '8px',
                            padding: '10px',
                            width: '200px',
                            textAlign: 'center',
                            position: 'relative',
                            // OFF の時はカード全体を少し半透明にする（見た目でわかりやすくするため）
                            opacity: item.isActive ? 1 : 0.6,
                            transition: 'opacity 0.3s ease',
                            backgroundColor: '#fff'
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {/* 画像の表示 */}
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                        
                        <h3 style={{ margin: '10px 0 5px' }}>{item.name}</h3>
                        <p style={{ margin: '0 0 10px', fontWeight: 'bold' }}>{item.price}円</p>

                        {/* カロリー表示（ホバーしている時だけ表示） */}
                        {hoveredId === item.id && (
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px'
                            }}>
                                {item.calories} kcal
                            </div>
                        )}

                        {/* AI提案対象のON/OFFトグルスライダー */}
                        <div style={{ margin: '15px 0 5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '12px', color: '#555' }}>
                                {item.isActive ? 'AI提案：ON' : 'AI提案：OFF'}
                            </span>
                            
                            {/* スライダー風のスイッチ */}
                            <div 
                                onClick={() => handleToggleActive(item.id)}
                                style={{
                                    width: '40px',
                                    height: '20px',
                                    backgroundColor: item.isActive ? '#4CAF50' : '#ccc',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: '#white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '2px',
                                    // ONの時は右側、OFFの時は左側に丸ノブを寄せる
                                    left: item.isActive ? '22px' : '2px',
                                    transition: 'left 0.3s',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                                }} />
                            </div>
                        </div>
                        
                        {/* 編集モードの時だけ「削除」ボタンを表示 */}
                        {isEditing && (
                            <button 
                                onClick={() => handleDeleteItem(item.id)} 
                                style={{ color: 'red', marginTop: '10px', width: '100%' }}
                            >
                                削除
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* 編集モードの時だけ「追加」フォームを表示 */}
            {isEditing && (
                <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h3>新しいメニューを追加</h3>
                    <input
                        type="text"
                        placeholder="メニュー名"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="価格 (円)"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="カロリー (kcal)"
                        value={newItemCalories}
                        onChange={(e) => setNewItemCalories(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="画像URL (例: https://...)"
                        value={newItemImage}
                        onChange={(e) => setNewItemImage(e.target.value)}
                    />
                    <button onClick={handleAddItem} style={{ padding: '8px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        メニューを追加
                    </button>
                </div>
            )}
        </div>
    );
}