import React from 'react';

export default function PizzaForm({ formPizza, setFormPizza, isEditing, onSubmit, onCancel }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormPizza({ ...formPizza, [name]: value });
    };

    return (
        <aside>
            <div className="card">
                <h2>{isEditing ? 'Modifica Pizza' : 'Aggiungi Nuova Pizza'}</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Nome della Pizza</label>
                        <input 
                            type="text" 
                            name="nome"
                            className="form-control" 
                            placeholder="es. Margherita" 
                            value={formPizza.nome}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Ingredienti</label>
                        <input 
                            type="text" 
                            name="ingredienti"
                            className="form-control" 
                            placeholder="es. Pomodoro, Mozzarella" 
                            value={formPizza.ingredienti}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Prezzo (€)</label>
                        <input 
                            type="number" 
                            name="prezzo"
                            className="form-control" 
                            step="0.50" 
                            min="0"
                            placeholder="es. 6.50" 
                            value={formPizza.prezzo}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                    <button type="submit" className={`btn ${isEditing ? 'btn-success' : 'btn-primary'}`}>
                        {isEditing ? 'Aggiorna Pizza' : 'Salva Pizza'}
                    </button>
                    {isEditing && (
                        <button type="button" onClick={onCancel} className="btn btn-secondary">
                            Annulla Modifica
                        </button>
                    )}
                </form>
            </div>
        </aside>
    );
}