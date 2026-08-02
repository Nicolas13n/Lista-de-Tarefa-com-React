import { useRef, useState } from "react";
import TarefaCom from "../components/TarefaCom";
import Tarefa from "../Class/Tarefa";
import "../Style/index.css";

export default function ListaTarefasApp() {
  const [listaTarefas, setListaTarefas] = useState([]);
  const [msg, setMsg] = useState(null);
  const inputAdd = useRef();
  const selectPrioridade = useRef();

  const addElementoLsita = () => {
    const novaLista = [...listaTarefas];
    const valorInput = inputAdd.current.value;
    const valorSelect = selectPrioridade.current.value;

    if (!valorInput || !valorSelect) {
      setMsg(false);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
      return;
    }
    const tarefaCriada = new Tarefa(
      novaLista.length + 1,
      valorInput,
      valorSelect,
      false
    );
    novaLista.push(tarefaCriada);
    inputAdd.current.value = "";
    selectPrioridade.current.value = "";
    setMsg(true);
    setTimeout(() => {
      setMsg(null);
    }, 3000);
    setListaTarefas(novaLista);
  };
  return (
    <>
      <div className="flex justify-center items-center h-dvh w-full flex-col md:flex-row gap-16 bg-blue-950">
        <div className="flex flex-col gap-[30px] bg-slate-400 h-[350px] min-h-[350px] w-[350px] p-5 rounded-[10%]">
          <h2 className="text-4xl font-bold text-center text-zinc-800 font-titulo">
            Lista de Tarefas
          </h2>
          <input
            className="bg-zinc-300 placeholder-black  w-full min-h-[40px] rounded-[20px] p-[8px]"
            ref={inputAdd}
            type="text"
            placeholder="Digite sua tarefa"
          />
          <select
            className="bg-zinc-300 w-full min-h-[40px] rounded-[20px] p-[8px]"
            ref={selectPrioridade}
          >
            <option value="">Não selecionado</option>
            <option value="Baixa">Baixa</option>
            <option value="Médio">Médio</option>
            <option value="Alta">Alta</option>
          </select>
          <button
            className="bg-blue-900 min-h-[40px] rounded-[50px] text-white"
            onClick={() => addElementoLsita()}
          >
            Adicionar
          </button>
          {msg !== null && (
            <p className="text-center" style={{ color: msg ? "green" : "red" }}>
              {msg
                ? "Cadastrou o tarefa com sucesso!!"
                : "Preencha todos os campos!!"}
            </p>
          )}
        </div>
        <div className="bg-white h-[350px] min-h-[350px] w-[500px] p-5 rounded-[10%]">
          {listaTarefas.length > 0 ? (
            <ul className="overflow-y-auto max-h-[290px] space-y-2 pr-1">
              {listaTarefas.map((tarefa, index) => {
                return (
                  <TarefaCom
                    key={index}
                    tarefa={tarefa}
                    listaTarefas={listaTarefas}
                    setListaTarefas={setListaTarefas}
                  />
                );
              })}
            </ul>
          ) : (
            <h2 className="text-center my-auto text-3xl">
              Você não tem nenhum tarefa na sua lista
            </h2>
          )}
        </div>
      </div>
    </>
  );
}
