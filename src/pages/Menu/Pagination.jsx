// Pagination.jsx

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {
    // 1ページしかない場合は何も表示しない
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                style={{
                    padding: '6px 12px',
                    cursor: 'pointer',
                    backgroundColor: currentPage === i ? '#007BFF' : '#fff',
                    color: currentPage === i ? '#fff' : '#333',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontWeight: currentPage === i ? 'bold' : 'normal',
                }}
            >
                {i}
            </button>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', margin: '20px 0' }}>
            {/* 最初のページへ */}
            <button 
                onClick={() => setCurrentPage(1)} 
                disabled={currentPage === 1}
                style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: currentPage === 1 ? '#aaa' : '#333' }}
            >
                &laquo;
            </button>
            {/* 前のページへ */}
            <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: currentPage === 1 ? '#aaa' : '#333' }}
            >
                &lt;
            </button>
            
            {/* ページ番号（1 2 3...） */}
            {pageNumbers}

            {/* 次のページへ */}
            <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: currentPage === totalPages ? '#aaa' : '#333' }}
            >
                &gt;
            </button>
            {/* 最後のページへ */}
            <button 
                onClick={() => setCurrentPage(totalPages)} 
                disabled={currentPage === totalPages}
                style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', color: currentPage === totalPages ? '#aaa' : '#333' }}
            >
                &raquo;
            </button>
        </div>
    );
}