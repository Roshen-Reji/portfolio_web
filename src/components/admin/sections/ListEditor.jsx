import React from 'react';

const ListEditor = ({ title, items, fields, onUpdate, onAdd, onDelete }) => {
    return (
        <div className="view-section active">
            <div className="header">
                <h1 className="title">{title}</h1>
            </div>
            <div className="grid">
                {items.map((item, index) => (
                    <div key={index} className="item-card">
                        <div className="item-header">
                            <span className="item-tag">#{index + 1}</span>
                            <button className="btn-delete" onClick={() => onDelete(index)}>DELETE</button>
                        </div>
                        {fields.map(field => (
                            <div key={field.key} className="input-group">
                                <label>{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea 
                                        value={item[field.key] || ''}
                                        onChange={(e) => onUpdate(index, field.key, e.target.value)}
                                    />
                                ) : (
                                    <input 
                                        type={field.type || 'text'}
                                        value={item[field.key] || ''}
                                        onChange={(e) => onUpdate(index, field.key, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                
                <button className="btn-add" onClick={onAdd}>
                    <span>+</span> Add New
                </button>
            </div>
        </div>
    );
};

export default ListEditor;