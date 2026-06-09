import React, { useState, useEffect } from 'react';
import PizzaForm from './components/PizzaForm';
import PizzaTable from './components/PizzaTable';
import { pizzaService } from './services/pizzaService';
import './App.css';

export default function App() {
    const [pizze, setPizze] = useState([]);
    const [formPizza, setFormPizza] = useState({ id: null, nome: '', ingredienti: '', prezzo: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadPizze();
    }, []);

    const loadPizze = async () => {
        try {
            const data = await pizzaService.getAll();
            setPizze(data);
        } catch (error) {
            alert("Errore nel caricamento del menu");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await pizzaService.update(formPizza.id, formPizza);
            } else {
                await pizzaService.create(formPizza);
            }
            resetForm();
            loadPizze(); // Ricarica i dati freschi dal server FastAPI
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Sei sicuro?")) {
            try {
                await pizzaService.delete(id);
                loadPizze();
                if (formPizza.id === id) resetForm();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const resetForm = () => {
        setFormPizza({ id: null, nome: '', ingredienti: '', prezzo: '' });
        setIsEditing(false);
    };

    return (
        <div className="container">
            <header>
                <h1>🍕 Gestione Pizzeria Professionale</h1>
                <p>Architettura modulare a componenti</p>
            </header>
            <div className="main-layout">
                <PizzaForm 
                    formPizza={formPizza} 
                    setFormPizza={setFormPizza}
                    isEditing={isEditing}
                    onSubmit={handleSubmit}
                    onCancel={resetForm}
                />
                <PizzaTable 
                    pizze={pizze} 
                    onEdit={(pizza) => { setFormPizza(pizza); setIsEditing(true); }}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}