export default function PizzaRow({ pizza, onEdit, onDelete }) {
    return (
        <tr>
            <td><strong>{pizza.nome}</strong></td>
            <td>{pizza.ingredienti}</td>
            <td className="price-tag">€ {Number(pizza.prezzo).toFixed(2)}</td>
            <td className="actions">
                <button className="btn btn-sm btn-edit" onClick={() => onEdit(pizza)}>
                    Modifica
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => onDelete(pizza.id)}>
                    Elimina
                </button>
            </td>
        </tr>
    );
}