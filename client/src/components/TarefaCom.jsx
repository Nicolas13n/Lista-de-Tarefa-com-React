import { useRef, useState } from "react";
import "../Style/index.css";

export default function Tarefa({ tarefa, listaTarefas, setListaTarefas }) {
  const [isChecked, setChecked] = useState(tarefa.concluida || false);
  const [isOpen, setIsOpen] = useState(false);
  const [valorNovo, setValorNovo] = useState("");
  const [selectNovo, setSelectNovo] = useState("");

  const removerTarefa = () => {
    const { id } = tarefa;
    const novaLista = [...listaTarefas];
    const novaLsitaFiltrada = novaLista.filter(
      (tarefaAtual) => tarefaAtual.id !== id
    );
    setListaTarefas(novaLsitaFiltrada);
  };

  const tarefaConcluida = (event) => {
    const novoStatus = event.target.checked;
    setChecked(novoStatus);

    const listaAtualizada = listaTarefas.map((t) => {
      if (t.id === tarefa.id) {
        return { ...t, concluida: novoStatus };
      }
      return t;
    });
    setListaTarefas(listaAtualizada);
    console.log(listaAtualizada);
  };

  const editar = (e) => {
    const novaLista = listaTarefas;

    const mudarTarefa = novaLista.map((t) => {
      if (t.id === tarefa.id) {
        console.log(selectNovo);

        return {
          ...novaLista,
          nome: valorNovo,
          prioridade: selectNovo,
        };
      }
      return t;
    });
    setListaTarefas(mudarTarefa);
  };
  const abrirModal = () => {
    setValorNovo(tarefa.nome);
    setSelectNovo(tarefa.prioridade);
    setIsOpen(true);
  };

  const editarElemento = () => {
    const novalista = listaTarefas;
    const listaEditada = novalista.map((t) => {
      if (t.id === tarefa.id) {
        return {
          ...novalista,
          nome: valorNovo,
          prioridade: selectNovo,
        };
      }
      return t;
    });
    setListaTarefas(listaEditada);
    setIsOpen(false);
  };
  return (
    <>
      <div>
        <li
          className={`bg-blue-300 flex justify-between items-center p-[10px] min-h-[40px] rounded-[20px] w-full ${
            isChecked ? "bg-green-500" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={isChecked}
            onChange={tarefaConcluida}
          />
          <span
            className={`flex gap-5  ${
              isChecked ? "line-through text-gray-600 " : ""
            }`}
          >
            <p className="text-center font-bold">{tarefa.nome}</p>
            <p className="text-center font-bold">{tarefa.prioridade}</p>
          </span>
          <button
            className="bg-blue-900 text-white w-[100px] rounded-[10px] "
            onClick={() => {
              removerTarefa();
            }}
          >
            remover
          </button>
          <button onClick={() => abrirModal()}>Editar</button>
        </li>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 items-center justify-center bg-white flex flex-col gap-[30px] h-[350px] min-h-[350px] w-[350px] p-5 rounded-[10%] "
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2 className="text-4xl font-bold text-center text-zinc-800 font-titulo">
              Editar Tarefa
            </h2>
            <input
              value={valorNovo}
              onChange={(e) => setValorNovo(e.target.value)}
              className="bg-zinc-300 placeholder-black  w-full min-h-[40px] rounded-[20px] p-[8px]"
              type="text"
              placeholder="Digite sua tarefa"
            />
            <select
              value={selectNovo}
              onChange={(e) => setSelectNovo(e.target.value)}
              className="bg-zinc-300 w-full min-h-[40px] rounded-[20px] p-[8px]"
            >
              <option value="">Não selecionado</option>
              <option value="Baixa">Baixa</option>
              <option value="Médio">Médio</option>
              <option value="Alta">Alta</option>
            </select>
            <div className="flex w-full gap-[15px]">
              <button
                onClick={() => editarElemento()}
                className="bg-blue-900 min-h-[40px] rounded-[50px] text-white w-full "
              >
                Editar
              </button>
              <button
                className="w-full border-red-600 border rounded-[50px]"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
