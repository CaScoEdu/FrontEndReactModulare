import React from 'react';
// Importiamo il file CSS specifico appena creato 
import styles from './PizzaTable.module.css';

export function PizzaTable({ pizze, onEdit, onDelete }) {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.pizzeTable}>
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
                            <td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8' }}>
                                Nessuna pizza disponibile nel menu.
                            </td>
                        </tr>
                    ) : (
                        pizze.map((pizza) => (
                            <tr key={pizza.id}>
                                <td><strong>{pizza.nome}</strong></td>
                                <td>{pizza.ingredienti}</td>
                                <td className={styles.prezzoTag}>
                                    € {pizza.prezzo.toFixed(2)}
                                </td>
                                <td>
                                    <div className={styles.actionsCell}>
                                        <button 
                                            className={styles.btnEdit}
                                            onClick={() => onEdit(pizza)}
                                        >
                                            Modifica
                                        </button>
                                        <button 
                                            className={styles.btnDelete}
                                            onClick={() => onDelete(pizza.id)}
                                        >
                                            Elimina
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
