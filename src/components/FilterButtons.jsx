import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        📋 সব কাজ
      </button>
      <button
        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        ⏳ সক্রিয় কাজ
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        ✅ সম্পন্ন কাজ
      </button>
    </div>
  );
}

export default FilterButtons;