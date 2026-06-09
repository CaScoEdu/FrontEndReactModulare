import React from 'react';
import PizzaRow from './PizzaRow';

export default function PizzaTable({ pizze, onEdit, onDelete }) {
    return (
        <main>
            <div className="card">
                <h2>Menu Pizze ({pizze.length})</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ingredienti</th>
                                <th>Prezzo</th>
                                <th>Azioni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizze.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={{textAlign: 'center'}}>Nessuna pizza presente.</td>
                                </tr>
                            ) : (
                                pizze.map(pizza => (
                                    <PizzaRow 
                                        key={pizza.id} 
                                        pizza={pizza} 
                                        onEdit={onEdit} 
                                        onDelete={onDelete} 
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}