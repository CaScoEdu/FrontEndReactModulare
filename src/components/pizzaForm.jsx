import React, { useState, useEffect } from 'react';
// Importiamo il CSS specifico per il Form 
import styles from './PizzaForm.module.css';

export function PizzaForm({ pizzaInModifica, onSave, onCancelEdit }) {
    const [nome, setNome] = useState('');
    const [ingredienti, setIngredienti] = useState('');
    const [prezzo, setPrezzo] = useState('');

    // Effetto per popolare il form quando viene cliccato "Modifica" dalla tabella
    useEffect(() => {
        if (pizzaInModifica) {
            setNome(pizzaInModifica.nome);
            setIngredienti(pizzaInModifica.ingredienti);
            setPrezzo(pizzaInModifica.prezzo);
        } else {
            // Se non c'è nessuna pizza in modifica, svuota i campi
            setNome('');
            setIngredienti('');
            setPrezzo('');
        }

    }, [pizzaInModifica]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !ingredienti || !prezzo) {
            alert('Per favore, compila tutti i campi!');
            return;
        }

        const pizzaData = {
            nome,
            ingredienti,
            prezzo: parseFloat(prezzo)
        };

        // 1. Invia i dati al backend tramite la funzione passata dal padre
        onSave(pizzaData);

        // 2. SE NON SIAMO IN MODALITÀ MODIFICA, RESETTA I CAMPI ORA!
        if (!pizzaInModifica) {
            setNome('');
            setIngredienti('');
            setPrezzo('');
        }
    };
    return (
        <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>
                {pizzaInModifica ? 'Modifica Pizza 🍕' : 'Aggiungi Nuova Pizza 🍕'}
            </h3>

            <form onSubmit={handleSubmit} className={styles.pizzaForm}>
                <div className={styles.formGroup}>
                    <label>Nome della Pizza</label>
                    <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Es. Margherita, Diavola..."
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Ingredienti</label>
                    <input
                        type="text"
                        className={styles.formInput}
                        placeholder="Es. Pomodoro, Mozzarella..."
                        value={ingredienti}
                        onChange={(e) => setIngredienti(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Prezzo (€)</label>
                    <input
                        type="number"
                        step="0.10"
                        min="0"
                        className={styles.formInput}
                        placeholder="Es. 6.50"
                        value={prezzo}
                        onChange={(e) => setPrezzo(e.target.value)}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    {/* Se siamo in modalità modifica, mostra il tasto Annulla */}
                    {pizzaInModifica && (
                        <button
                            type="button"
                            className={styles.btnCancel}
                            onClick={onCancelEdit}
                        >
                            Annulla
                        </button>
                    )}
                    <button type="submit" className={styles.btnSubmit}>
                        {pizzaInModifica ? 'Aggiorna Menu' : 'Aggiungi al Menu'}
                    </button>
                </div>
            </form>
        </div>
    );
}