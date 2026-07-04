import { useState } from 'react';

export default function MenuCard({ item, isEditing, handleToggleActive, handleDeleteItem }) {
    // 親の Menu.jsx にあったホバー状態をこちらで管理します
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li 
            style={{ 
                border: '1px solid #ccc', 
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                position: 'relative',
                opacity: item.isActive ? 1 : 0.6,
                transition: 'opacity 0.3s ease',
                backgroundColor: '#fff'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            
            <h3 style={{ margin: '10px 0 5px', fontSize: '16px' }}>{item.name}</h3>
            <p style={{ margin: '0 0 10px', fontWeight: 'bold' }}>{item.price}円</p>

            {isHovered && (
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
                    {item.calories !== null ? `${item.calories} kcal` : 'カロリー不明'}
                </div>
            )}

            <div style={{ margin: '15px 0 5px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#555' }}>
                    {item.isActive ? 'AI提案：ON' : 'AI提案：OFF'}
                </span>
                
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
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        left: item.isActive ? '22px' : '2px',
                        transition: 'left 0.3s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                    }} />
                </div>
            </div>
            
            {isEditing && (
                <button 
                    onClick={() => handleDeleteItem(item.id)} 
                    style={{ color: 'red', marginTop: '10px', width: '100%', padding: '5px', cursor: 'pointer' }}
                >
                    削除
                </button>
            )}
        </li>
    );
}