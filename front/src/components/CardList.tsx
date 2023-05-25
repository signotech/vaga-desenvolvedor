import React from 'react';
import '../components/scss/card.scss';

export interface CardData {
  _id: any;
  titulo: string;
  descricao: string;
  tipoContrato: string;
  salario: number;
  linkAplicar: string;
  isApplied?: boolean;
}

interface CardListProps {
  data: CardData[];
  showApplyButton: boolean;
  onApply?: (cardId: any) => void;
}

const CardList: React.FC<CardListProps> = ({ data, showApplyButton, onApply }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="card-list">
      {data.map((item) => {
        const { _id, titulo, descricao, tipoContrato, salario, isApplied } = item;

        return (
          <div className="card" key={_id}>
            <h3>{titulo}</h3>
            <p>
              <span className="span-card-list">Descrição:</span> {descricao}
            </p>
            <p>
              <span className="span-card-list">Contrato:</span> {tipoContrato}
            </p>
            <p>
              <span className="span-card-list">Salário:</span> {formatCurrency(salario)}
            </p>
            {showApplyButton && !isApplied && (
              <button
                className="button-card"
                onClick={() => onApply !== undefined && onApply(_id.toString())}
              >
                Candidatar-se
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
