import React, { useState, useEffect } from 'react';
import { PizzaForm } from './components/PizzaForm';
import { PizzaTable } from './components/PizzaTable';

export default function App() {
    const [pizze, setPizze] = useState([]);
    const [pizzaInModifica, setPizzaInModifica] = useState(null);

    // URL base del tuo backend FastAPI
    const API_URL = "https://fastapi-pizza-backend.fastapicloud.dev/pizze";

    // --- 1. FUNZIONE READ (GET) ---
    // Carica l'elenco delle pizze dal backend
    const fetchPizze = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setPizze(data);
            } else {
                console.error("Errore nel recupero delle pizze");
            }
        } catch (error) {
            console.error("Errore di connessione al backend:", error);
        }
    };

    // Esegue il caricamento iniziale dei dati appena la pagina si apre
    useEffect(() => {
        fetchPizze();
    }, []);

    // --- 2. FUNZIONE DELETE (DELETE) ---
    // Cancella una pizza dal database tramite ID
    const handleDeletePizza = async (id) => {
        if (window.confirm("Sei sicuro di voler eliminare questa pizza dal menu?")) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchPizze(); // Ricarica la tabella aggiornata
                } else {
                    console.error("Impossibile eliminare la pizza");
                }
            } catch (error) {
                console.error("Errore durante l'eliminazione:", error);
            }
        }
    };

    // 3. Gestione del click sul pulsante "Modifica" nella tabella
    const handleEditClick = (pizza) => {
        setPizzaInModifica(pizza);
    };

    // 4. Annulla la modifica svuotando lo stato
    const handleCancelEdit = () => {
        setPizzaInModifica(null);
    };

    // --- 5. FUNZIONE SAVE (POST & PUT) ---
    const handleSavePizza = async (pizzaData) => {
        if (pizzaInModifica) {
            // --- LOGICA PUT (Aggiornamento pizza esistente) ---
            try {
                const response = await fetch(`${API_URL}/${pizzaInModifica.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pizzaData),
                });
                if (response.ok) {
                    fetchPizze();
                    setPizzaInModifica(null); // Esce dalla modalità modifica
                }
            } catch (error) {
                console.error("Errore durante l'aggiornamento:", error);
            }
        } else {
            // --- LOGICA POST (Aggiunta nuova pizza) ---
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pizzaData),
                });
                if (response.ok) {
                    fetchPizze(); // Ricarica la tabella includendo la nuova pizza
                }
            } catch (error) {
                console.error("Errore durante il salvataggio:", error);
            }
        }
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Pizzeria Bella Napoli 🍕</h1>
                <p>Pannello di controllo del menu in tempo reale</p>
            </header>

            <main className="dashboard-grid">
                {/* Il Form comparirà a sinistra sui monitor grandi */}
                <PizzaForm
                    pizzaInModifica={pizzaInModifica}
                    onSave={handleSavePizza}
                    onCancelEdit={handleCancelEdit}
                />

                {/* La Tabella comparirà a destra occupando lo spazio maggiore */}
                <PizzaTable
                    pizze={pizze}
                    onEdit={handleEditClick}
                    onDelete={handleDeletePizza}
                />
            </main>

            <footer className="app-footer">
                <p>© 2026 Dashboard Pizzeria - Powered by FastAPI & Supabase</p>
            </footer>
        </div>
    );
}
