const API_URL = 'https://fastapi-pizza-backend.fastapicloud.dev/pizze';

export const pizzaService = {
    // READ
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Errore nel recupero delle pizze');
        return await response.json();
    },

    // CREATE
    create: async (pizzaData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pizzaData)
        });
        if (!response.ok) throw new Error('Errore durante la creazione');
        return await response.json();
    },

    // UPDATE
    update: async (id, pizzaData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pizzaData)
        });
        if (!response.ok) throw new Error('Errore durante l\'aggiornamento');
        return await response.json();
    },

    // DELETE
    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Errore durante la cancellazione');
        return true;
    }
};