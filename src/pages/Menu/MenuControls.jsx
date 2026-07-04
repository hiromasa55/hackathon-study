export default function MenuControls({
    isEditing,
    setIsEditing,
    sortType,
    setSortType,
    showCheapItems,
    setShowCheapItems
}) {
    return (
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '8px 12px', cursor: 'pointer' }}>
                {isEditing ? '編集モードを終了' : 'メニューを編集する'}
            </button>

            <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ padding: '8px' }}>
                <option value="default">標準</option>
                <option value="price-asc">価格の安い順</option>
                <option value="price-desc">価格の高い順</option>
                <option value="calories-asc">カロリーの低い順</option>
                <option value="calories-desc">カロリーの高い順</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                    type="checkbox" 
                    checked={showCheapItems} 
                    onChange={(e) => setShowCheapItems(e.target.checked)} 
                />
                170円以下の商品を表示
            </label>
        </div>
    );
}