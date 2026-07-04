import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import MenuCard from './MenuCard';
import AddMenuForm from './AddMenuForm';
import MenuControls from './MenuControls';
import { menuItems as initialMenuItems} from "../../../shared/menuData.js";

export default function Menu() {
    // 初期データ（省略せずに全て記載しています）
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    

    const [isEditing, setIsEditing] = useState(false);
    const [sortType, setSortType] = useState('default');
    const [showCheapItems, setShowCheapItems] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // --- ロジック部分 ---

    // ソートやフィルタが変更されたとき、もしくはアイテム数が変わったときにページを1に戻す
    useEffect(() => {
        setCurrentPage(1);
    }, [sortType, showCheapItems, menuItems.length]);

    useEffect(() => {
    fetch("http://localhost:3001/menu")
        .then(r => r.json())
        .then(setMenuItems);
    }, []);

    const handleAddItem = (newItem) => {
        setMenuItems([...menuItems, newItem]);
    };

        const handleDeleteItem = (id) => {
        const updatedMenu = menuItems.filter(item => item.id !== id);
        setMenuItems(updatedMenu);
    };

    const handleToggleActive = async (id) => {
        const target = menuItems.find(item => item.id === id);

        await fetch(`http://localhost:3001/menu/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isActive: !target.isActive,
            }),
        });

        const res = await fetch("http://localhost:3001/menu");
        const data = await res.json();

        setMenuItems(data);
    };

    // 170円以下の商品をフィルタリング
    const filteredMenuItems = menuItems.filter(item => {
        if (showCheapItems) return true; 
        return item.price > 170;         
    });

    // 並び替え（ソート）
    const sortedMenuItems = [...filteredMenuItems].sort((a, b) => {
        switch (sortType) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'calories-asc':
                if (a.calories === null && b.calories === null) return 0;
                if (a.calories === null) return 1;
                if (b.calories === null) return -1;
                return a.calories - b.calories;
            case 'calories-desc':
                if (a.calories === null && b.calories === null) return 0;
                if (a.calories === null) return 1;
                if (b.calories === null) return -1;
                return b.calories - a.calories;
            default: return 0;
        }
    });

    // ページ遷移の計算
    const totalPages = Math.max(1, Math.ceil(sortedMenuItems.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentDisplayItems = sortedMenuItems.slice(startIndex, startIndex + itemsPerPage);

    // --- 画面表示部分 ---
    // --- 画面表示部分 ---
    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1>学食メニュー一覧</h1>

            {/* コントロールパネル*/}
            <MenuControls 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                sortType={sortType}
                setSortType={setSortType}
                showCheapItems={showCheapItems}
                setShowCheapItems={setShowCheapItems}
            />

            {/* ページ遷移（上部） */}
            <Pagination 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalPages={totalPages} 
            />

            {/* メニューリスト */}
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {currentDisplayItems.map((item) => (
                    <MenuCard 
                        key={item.id} 
                        item={item} 
                        isEditing={isEditing} 
                        handleToggleActive={handleToggleActive} 
                        handleDeleteItem={handleDeleteItem} 
                    />
                ))}
            </ul>

            {/* ページ遷移（下部） */}
            <Pagination 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                totalPages={totalPages} 
            />

            {/* 新規追加フォーム */}
            {isEditing && (
                <AddMenuForm onAdd={handleAddItem} />
            )}
        </div>
    );
}