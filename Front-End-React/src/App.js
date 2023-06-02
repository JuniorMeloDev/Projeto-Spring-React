import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  //Objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true); //constante que cria edita os botoes e seta os botoes
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(()=> {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_covertido => setProdutos(retorno_covertido))
  },[])

  // Obtendo os dados do formulario
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //cadastrar produtos
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
      
      if(retorno_covertido.mensagem !== undefined) { // cadastra o item, mostra a mensagem e exibe ele na lista da pagina
        alert(retorno_covertido.mensagem);
      } else {
        setProdutos([...produtos, retorno_covertido])
        alert("Produto cadastrado com sucesso!")
        limparFormulario()
      }
    })
  }

  //Limpar formulario
  const limparFormulario = () => {
    setObjProduto(produto)
    setBtnCadastrar(true) //Cancelar selecao produtos
  }
  
  //Selecionar produtos
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice])
    setBtnCadastrar(false)
  }

   //remover produtos
   const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.codigo,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
    
      //mensagem
      alert(retorno_covertido.mensagem)

      //Copia do vetor de produtos
      let vetTemp = [...produtos]

      //indice
      let indice = vetTemp.findIndex((p) => { //varrer todos os produtos pelo codigo(id)
        return p.codigo === objProduto.codigo
      })

      //remover produto do vetTemp
      vetTemp.splice(indice, 1)

      //atualizar o vetor de produtos
      setProdutos(vetTemp);

      //limpar o formulario
      limparFormulario()
      
    })
  }

  //alterar produtos
  const alterar = () => {
    fetch('http://localhost:8080/alterar',{
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_covertido => {
      
      if(retorno_covertido.mensagem !== undefined) { // cadastra o item, mostra a mensagem e exibe ele na lista da pagina
        alert(retorno_covertido.mensagem);
      } else {
        alert("Produto alterado com sucesso!")

      //Copia do vetor de produtos
      let vetTemp = [...produtos]

      //indice
      let indice = vetTemp.findIndex((p) => { //varrer todos os produtos pelo codigo(id)
        return p.codigo === objProduto.codigo
      })

      //alterar produto do vetTemp
      vetTemp[indice] = objProduto

      //atualizar o vetor de produtos
      setProdutos(vetTemp);

      //limpar o formulario
      limparFormulario()

      }
    })
  }



  return (
    <div>
      
      <Formulario botao={btnCadastrar} eventTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
